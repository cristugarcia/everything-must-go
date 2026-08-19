from pathlib import Path

import imageio_ffmpeg
import numpy as np
import qrcode
from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "marketing" / "descuentos-2026-08-18"
WIDTH, HEIGHT = 1080, 1920

CREAM = "#F5F1EA"
WHITE = "#FFFFFF"
INK = "#18181B"
MUTED = "#62626B"
GOLD = "#C9A66B"
RED = "#C93F35"
GREEN = "#25D366"
FONT = "/System/Library/Fonts/SFNS.ttf"
FALLBACK = "/System/Library/Fonts/Supplemental/Arial.ttf"
CATALOG_URL = "https://everything-must-go-cyan.vercel.app/es?utm_source=social&utm_medium=organic&utm_campaign=emg_descuentos_agosto"


def font(size):
    try:
        return ImageFont.truetype(FONT, size)
    except OSError:
        return ImageFont.truetype(FALLBACK, size)


def centered(draw, text, y, text_font, fill):
    box = draw.textbbox((0, 0), text, font=text_font)
    draw.text(((WIDTH - box[2] + box[0]) // 2, y), text, font=text_font, fill=fill)


def logo(canvas, inverse=False):
    mark = Image.open(ROOT / "public" / "brand" / "emg-logo-horizontal.png").convert("RGBA")
    mark.thumbnail((650, 150), Image.Resampling.LANCZOS)
    if inverse:
        alpha = mark.getchannel("A")
        white = Image.new("RGBA", mark.size, WHITE)
        white.putalpha(alpha)
        mark = white
    canvas.alpha_composite(mark, ((WIDTH - mark.width) // 2, 70))


def photo(canvas, product_id, filename, box):
    x1, y1, x2, y2 = box
    size = (x2 - x1, y2 - y1)
    source = Image.open(ROOT / "public" / "products" / product_id / filename).convert("RGB")
    fitted = ImageOps.fit(source, size, method=Image.Resampling.LANCZOS)
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=42, fill=255)
    canvas.paste(fitted, (x1, y1), mask)


def cover():
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), CREAM)
    draw = ImageDraw.Draw(canvas)
    logo(canvas)
    centered(draw, "BAJAMOS", 430, font(125), INK)
    centered(draw, "PRECIOS", 575, font(125), RED)
    draw.line((130, 790, 950, 790), fill=GOLD, width=7)
    centered(draw, "3 OPORTUNIDADES", 950, font(67), MUTED)
    centered(draw, "HASTA 55% OFF", 1070, font(96), INK)
    draw.rounded_rectangle((120, 1410, 960, 1580), radius=85, fill=INK)
    centered(draw, "DISPONIBLES AHORA", 1460, font(48), WHITE)
    centered(draw, "Venta por mudanza · Colegiales", 1740, font(40), MUTED)
    canvas.convert("RGB").save(OUTPUT / "01-portada-descuentos.png", quality=95)


def product_slide(product_id, filename, name, old_price, new_price, discount, number):
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), CREAM)
    draw = ImageDraw.Draw(canvas)
    logo(canvas)
    photo(canvas, product_id, filename, (65, 255, 1015, 1120))
    draw.rounded_rectangle((725, 295, 965, 425), radius=65, fill=RED)
    centered_badge = f"{discount}% OFF"
    box = draw.textbbox((0, 0), centered_badge, font=font(42))
    draw.text((845 - (box[2] - box[0]) / 2, 335), centered_badge, font=font(42), fill=WHITE)
    centered(draw, name.upper(), 1210, font(55), INK)
    old_font = font(48)
    old_text = f"Antes  {old_price}"
    old_box = draw.textbbox((0, 0), old_text, font=old_font)
    old_x = (WIDTH - (old_box[2] - old_box[0])) // 2
    draw.text((old_x, 1320), old_text, font=old_font, fill=MUTED)
    draw.line((old_x, 1350, old_x + old_box[2] - old_box[0], 1350), fill=RED, width=5)
    centered(draw, f"AHORA  {new_price}", 1425, font(72), RED)
    draw.rounded_rectangle((120, 1635, 960, 1780), radius=72, fill=INK)
    centered(draw, "VER EN EL CATÁLOGO", 1677, font(43), WHITE)
    centered(draw, "Fotos reales · Consultas por WhatsApp", 1830, font(31), MUTED)
    canvas.convert("RGB").save(OUTPUT / f"0{number}-{product_id.lower()}.png", quality=95)


def cta():
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), INK)
    draw = ImageDraw.Draw(canvas)
    logo(canvas, inverse=True)
    centered(draw, "¿CUÁL TE LLEVÁS?", 350, font(79), WHITE)
    centered(draw, "MIRÁ FOTOS Y DETALLES", 470, font(46), GOLD)
    qr = qrcode.make(CATALOG_URL).convert("RGB").resize((520, 520))
    frame = Image.new("RGB", (580, 580), WHITE)
    frame.paste(qr, (30, 30))
    canvas.paste(frame, (250, 700))
    centered(draw, "ESCANEÁ EL QR", 1390, font(60), GOLD)
    centered(draw, "o entrá al link del perfil", 1485, font(43), WHITE)
    draw.rounded_rectangle((100, 1690, 980, 1830), radius=70, fill=GREEN)
    centered(draw, "CONSULTÁ POR WHATSAPP", 1732, font(41), INK)
    canvas.convert("RGB").save(OUTPUT / "05-cta-catalogo.png", quality=95)


def video():
    slides = [
        ("01-portada-descuentos.png", 3),
        ("02-emg-0006.png", 4),
        ("03-emg-0027.png", 4),
        ("04-emg-0029.png", 4),
        ("05-cta-catalogo.png", 4),
    ]
    fps = 15
    writer = imageio_ffmpeg.write_frames(
        str(OUTPUT / "video-descuentos-sin-audio.mp4"),
        (WIDTH, HEIGHT), fps=fps, codec="libx264", quality=7,
        macro_block_size=8, output_params=["-movflags", "+faststart"],
    )
    writer.send(None)
    for filename, seconds in slides:
        frame = np.asarray(Image.open(OUTPUT / filename).convert("RGB"))
        for _ in range(fps * seconds):
            writer.send(frame)
    writer.close()


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    cover()
    product_slide("EMG-0006", "1.jpeg", "Parrilla tipo Weber", "$200.000", "$90.000", 55, 2)
    product_slide("EMG-0027", "1.jpeg", "Drone Holy Stone", "$250.000", "$200.000", 20, 3)
    product_slide("EMG-0029", "1.jpeg", "Tender reforzado", "$83.250", "$50.000", 40, 4)
    cta()
    video()


if __name__ == "__main__":
    main()
