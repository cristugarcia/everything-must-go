from pathlib import Path

import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "products" / "EMG-0001"
OUTPUT = ROOT / "public" / "marketing" / "bilbao"
W, H = 1080, 1920
CREAM, WHITE, INK, MUTED, GOLD, RED = (
    "#F5F1EA", "#FFFFFF", "#18181B", "#62626B", "#C9A66B", "#C93F35"
)
FONT = "/System/Library/Fonts/SFNS.ttf"
FALLBACK = "/System/Library/Fonts/Supplemental/Arial.ttf"


def font(size):
    try:
        return ImageFont.truetype(FONT, size)
    except OSError:
        return ImageFont.truetype(FALLBACK, size)


def centered(draw, text, y, fnt, fill):
    box = draw.textbbox((0, 0), text, font=fnt)
    draw.text(((W - (box[2] - box[0])) // 2, y), text, font=fnt, fill=fill)


def brand(canvas):
    logo = Image.open(ROOT / "public" / "brand" / "emg-logo-horizontal.png").convert("RGBA")
    logo.thumbnail((570, 130), Image.Resampling.LANCZOS)
    canvas.alpha_composite(logo, ((W - logo.width) // 2, 60))


def slide(filename, headline, subline, out_name, photo_y=245, photo_h=1110):
    canvas = Image.new("RGBA", (W, H), CREAM)
    draw = ImageDraw.Draw(canvas)
    brand(canvas)
    source = Image.open(SOURCE / filename).convert("RGB")
    fitted = ImageOps.fit(source, (960, photo_h), method=Image.Resampling.LANCZOS)
    mask = Image.new("L", fitted.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, fitted.width, fitted.height), 42, fill=255)
    canvas.paste(fitted, (60, photo_y), mask)
    centered(draw, headline, 1435, font(67), INK)
    centered(draw, subline, 1535, font(43), MUTED)
    canvas.convert("RGB").save(OUTPUT / out_name, quality=95)


def price_slide():
    canvas = Image.new("RGBA", (W, H), CREAM)
    draw = ImageDraw.Draw(canvas)
    brand(canvas)
    centered(draw, "MALOR DESIGN", 345, font(48), MUTED)
    centered(draw, "ESQUINERO BILBAO", 440, font(78), INK)
    draw.line((150, 600, 930, 600), fill=GOLD, width=7)
    centered(draw, "NUEVO HOY", 750, font(44), MUTED)
    centered(draw, "$1.900.000", 830, font(84), MUTED)
    centered(draw, "PRECIO EMG", 1080, font(44), INK)
    centered(draw, "$900.000", 1165, font(112), RED)
    draw.rounded_rectangle((100, 1515, 980, 1675), radius=80, fill=INK)
    centered(draw, "AHORRÁS $1.000.000", 1564, font(46), WHITE)
    centered(draw, "Excelente estado · Colegiales", 1780, font(39), MUTED)
    canvas.convert("RGB").save(OUTPUT / "05-precio.png", quality=95)


def make_video():
    specs = [
        ("01-sofa.png", 3),
        ("02-cama.png", 3),
        ("03-baulera.png", 3),
        ("04-usb.png", 3),
        ("05-precio.png", 4),
    ]
    fps = 15
    writer = imageio_ffmpeg.write_frames(
        str(OUTPUT / "video-esquinero-bilbao-sin-audio.mp4"),
        (W, H), fps=fps, codec="libx264", quality=7,
        macro_block_size=8, output_params=["-movflags", "+faststart"],
    )
    writer.send(None)
    for filename, seconds in specs:
        frame = np.asarray(Image.open(OUTPUT / filename).convert("RGB"))
        for _ in range(fps * seconds):
            writer.send(frame)
    writer.close()


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    slide("1.jpeg", "NO ES SOLO UN SOFÁ", "Esquinero Bilbao · Malor Design", "01-sofa.png")
    slide("4.jpeg", "TAMBIÉN ES CAMA", "203 × 136 cm desplegado", "02-cama.png")
    slide("4.jpeg", "BAULERA INTEGRADA", "Más espacio de guardado", "03-baulera.png")
    slide("3.png", "PUERTO USB", "Comodidad incorporada", "04-usb.png")
    price_slide()
    make_video()


if __name__ == "__main__":
    main()
