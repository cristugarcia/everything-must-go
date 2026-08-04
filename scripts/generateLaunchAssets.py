from pathlib import Path
import math
import subprocess
import wave

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "marketing" / "launch"
WIDTH, HEIGHT = 1080, 1920

CREAM = "#F5F1EA"
INK = "#18181B"
MUTED = "#5F5F68"
GOLD = "#CDB58F"
GREEN = "#25D366"
WHITE = "#FFFFFF"

FONT = "/System/Library/Fonts/SFNS.ttf"
FONT_FALLBACK = "/System/Library/Fonts/Supplemental/Arial.ttf"


def font(size: int):
    try:
        return ImageFont.truetype(FONT, size)
    except OSError:
        return ImageFont.truetype(FONT_FALLBACK, size)


def cover(path: Path, size: tuple[int, int]):
    image = Image.open(path).convert("RGB")
    return ImageOps.fit(image, size, method=Image.Resampling.LANCZOS)


def add_brand(canvas: Image.Image, inverse: bool = False):
    logo_name = "emg-logo-horizontal.png"
    logo = Image.open(ROOT / "public" / "brand" / logo_name).convert("RGBA")
    logo.thumbnail((650, 165), Image.Resampling.LANCZOS)
    if inverse:
        alpha = logo.getchannel("A")
        solid = Image.new("RGBA", logo.size, WHITE)
        solid.putalpha(alpha)
        logo = solid
    canvas.alpha_composite(logo, ((WIDTH - logo.width) // 2, 92))


def save_story_1():
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), CREAM)
    draw = ImageDraw.Draw(canvas)
    add_brand(canvas)

    draw.text((90, 430), "VENTA POR", fill=MUTED, font=font(48))
    draw.text((90, 500), "MUDANZA", fill=INK, font=font(112))
    draw.rounded_rectangle((90, 710, 990, 1325), radius=42, fill=WHITE)

    mobile = cover(
        ROOT / "public" / "images" / "project" / "catalog-mobile.png",
        (440, 560),
    )
    canvas.alpha_composite(mobile.convert("RGBA"), (540, 735))

    draw.text((135, 795), "Fotos reales", fill=INK, font=font(50))
    draw.text((135, 885), "Precios claros", fill=INK, font=font(50))
    draw.text((135, 975), "Disponibilidad", fill=INK, font=font(50))
    draw.text((135, 1040), "actualizada", fill=INK, font=font(50))

    draw.text(
        (90, 1460),
        "Muebles · Hogar · Exterior",
        fill=MUTED,
        font=font(42),
    )
    draw.text(
        (90, 1525),
        "Electrodomésticos y más",
        fill=MUTED,
        font=font(42),
    )
    draw.rounded_rectangle((90, 1665, 990, 1805), radius=70, fill=INK)
    label = "Mira el catálogo completo"
    box = draw.textbbox((0, 0), label, font=font(46))
    draw.text(((WIDTH - (box[2] - box[0])) / 2, 1705), label, fill=WHITE, font=font(46))
    canvas.convert("RGB").save(OUTPUT / "story-01-launch.png", quality=95)


def save_story_2():
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), WHITE)
    draw = ImageDraw.Draw(canvas)
    add_brand(canvas)
    draw.text((70, 335), "ALGUNOS DESTACADOS", fill=MUTED, font=font(42))

    products = [
        ("EMG-0001", "1.jpeg", "Esquinero Bilbao", "ARS 900.000"),
        ("EMG-0002", "1.jpg", "TV Noblex 54”", "ARS 675.000"),
        ("EMG-0008", "1.jpg", "Hero Hunk 150", "ARS 2.200.000"),
    ]
    y = 430
    for product_id, filename, name, price in products:
        draw.rounded_rectangle((60, y, 1020, y + 390), radius=36, fill=CREAM)
        photo = cover(ROOT / "public" / "products" / product_id / filename, (430, 330))
        mask = Image.new("L", photo.size, 0)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, 430, 330), radius=28, fill=255)
        canvas.paste(photo, (90, y + 30), mask)
        draw.text((560, y + 95), name, fill=INK, font=font(42))
        draw.text((560, y + 175), price, fill=INK, font=font(46))
        draw.rounded_rectangle((560, y + 255, 825, y + 325), radius=35, fill="#DDF9E8")
        draw.ellipse((585, y + 278, 607, y + 300), fill=GREEN)
        draw.text((625, y + 268), "Disponible", fill="#087A39", font=font(30))
        y += 420

    draw.text((90, 1740), "Consulta directa por WhatsApp", fill=MUTED, font=font(40))
    canvas.convert("RGB").save(OUTPUT / "story-02-products.png", quality=95)


def save_story_3():
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), INK)
    draw = ImageDraw.Draw(canvas)
    add_brand(canvas, inverse=True)

    draw.text((90, 470), "TODO EN", fill=GOLD, font=font(52))
    draw.text((90, 550), "UN SOLO", fill=WHITE, font=font(112))
    draw.text((90, 675), "CATÁLOGO", fill=WHITE, font=font(112))

    draw.line((90, 880, 990, 880), fill=GOLD, width=4)
    draw.text((90, 985), "Abre el enlace", fill=WHITE, font=font(58))
    draw.text((90, 1070), "Elige un producto", fill=WHITE, font=font(58))
    draw.text((90, 1155), "Consulta por WhatsApp", fill=WHITE, font=font(58))

    draw.rounded_rectangle((90, 1425, 990, 1585), radius=80, fill=GREEN)
    cta = "Ver catálogo"
    box = draw.textbbox((0, 0), cta, font=font(56))
    draw.text(((WIDTH - (box[2] - box[0])) / 2, 1470), cta, fill=INK, font=font(56))
    draw.text((90, 1715), "Disponible hasta el 20 de agosto", fill=GOLD, font=font(42))
    canvas.convert("RGB").save(OUTPUT / "story-03-cta.png", quality=95)


def save_instagram_feed():
    feed_height = 1350

    cover_slide = Image.new("RGBA", (WIDTH, feed_height), CREAM)
    cover_draw = ImageDraw.Draw(cover_slide)
    add_brand(cover_slide)
    cover_draw.text((80, 350), "VENTA POR", fill=MUTED, font=font(48))
    cover_draw.text((80, 420), "MUDANZA", fill=INK, font=font(108))
    cover_draw.text(
        (80, 585),
        "Fotos reales · Precios claros",
        fill=MUTED,
        font=font(42),
    )
    cover_draw.text(
        (80, 650),
        "Disponibilidad actualizada",
        fill=MUTED,
        font=font(42),
    )
    mobile = cover(
        ROOT / "public" / "images" / "project" / "catalog-mobile.png",
        (400, 540),
    )
    cover_slide.alpha_composite(mobile.convert("RGBA"), (600, 750))
    cover_draw.rounded_rectangle((80, 825, 535, 965), radius=70, fill=INK)
    cover_draw.text((135, 867), "Ver catálogo", fill=WHITE, font=font(46))
    cover_draw.text((80, 1090), "Buenos Aires", fill=MUTED, font=font(38))
    cover_draw.text((80, 1150), "Hasta el 20 de agosto", fill=MUTED, font=font(38))
    cover_slide.convert("RGB").save(OUTPUT / "feed-01-launch.png", quality=95)

    products_slide = Image.new("RGBA", (WIDTH, feed_height), WHITE)
    products_draw = ImageDraw.Draw(products_slide)
    add_brand(products_slide)
    products_draw.text((70, 300), "ALGUNOS DESTACADOS", fill=MUTED, font=font(42))
    products = [
        ("EMG-0001", "1.jpeg", "Esquinero Bilbao", "ARS 900.000"),
        ("EMG-0002", "1.jpg", "TV Noblex 54”", "ARS 675.000"),
        ("EMG-0008", "1.jpg", "Hero Hunk 150", "ARS 2.200.000"),
    ]
    x_positions = [55, 370, 685]
    for x, (product_id, filename, name, price) in zip(x_positions, products):
        products_draw.rounded_rectangle((x, 400, x + 290, 1080), radius=32, fill=CREAM)
        photo = cover(ROOT / "public" / "products" / product_id / filename, (250, 360))
        mask = Image.new("L", photo.size, 0)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, 250, 360), radius=24, fill=255)
        products_slide.paste(photo, (x + 20, 425), mask)
        products_draw.text((x + 20, 825), name, fill=INK, font=font(30))
        products_draw.text((x + 20, 900), price, fill=INK, font=font(31))
        products_draw.ellipse((x + 22, 1003, x + 44, 1025), fill=GREEN)
        products_draw.text((x + 58, 990), "Disponible", fill="#087A39", font=font(27))
    products_draw.text((70, 1185), "Más productos en el catálogo", fill=MUTED, font=font(42))
    products_slide.convert("RGB").save(OUTPUT / "feed-02-products.png", quality=95)

    cta_slide = Image.new("RGBA", (WIDTH, feed_height), INK)
    cta_draw = ImageDraw.Draw(cta_slide)
    add_brand(cta_slide, inverse=True)
    cta_draw.text((80, 380), "TODO EN", fill=GOLD, font=font(48))
    cta_draw.text((80, 450), "UN SOLO", fill=WHITE, font=font(104))
    cta_draw.text((80, 565), "CATÁLOGO", fill=WHITE, font=font(104))
    cta_draw.line((80, 740, 1000, 740), fill=GOLD, width=4)
    cta_draw.text((80, 825), "Link en la bio", fill=WHITE, font=font(62))
    cta_draw.text((80, 925), "Consulta directa por WhatsApp", fill=WHITE, font=font(43))
    cta_draw.text((80, 1180), "Hasta el 20 de agosto", fill=GOLD, font=font(40))
    cta_slide.convert("RGB").save(OUTPUT / "feed-03-cta.png", quality=95)


def save_tiktok_video():
    try:
        import imageio_ffmpeg
    except ImportError as error:
        raise SystemExit(
            "Install imageio-ffmpeg in a temporary directory before generating video."
        ) from error

    slides = [
        Image.open(OUTPUT / "story-01-launch.png").convert("RGB"),
        Image.open(OUTPUT / "story-02-products.png").convert("RGB"),
        Image.open(OUTPUT / "story-03-cta.png").convert("RGB"),
    ]

    silent_video_path = OUTPUT / "tiktok-launch-silent.mp4"
    video_path = OUTPUT / "tiktok-launch.mp4"
    fps = 15
    seconds_per_slide = 3
    writer = imageio_ffmpeg.write_frames(
        str(silent_video_path),
        (WIDTH, HEIGHT),
        fps=fps,
        codec="libx264",
        quality=7,
        macro_block_size=8,
        output_params=["-movflags", "+faststart"],
    )
    writer.send(None)

    for slide in slides:
        frame = np.asarray(slide)
        for _ in range(fps * seconds_per_slide):
            writer.send(frame)

    writer.close()

    audio_path = OUTPUT / "launch-audio.wav"
    sample_rate = 44_100
    duration = len(slides) * seconds_per_slide
    chord_frequencies = [
        (261.63, 329.63, 392.00, 493.88),
        (220.00, 261.63, 329.63, 440.00),
        (174.61, 261.63, 349.23, 440.00),
    ]

    with wave.open(str(audio_path), "wb") as audio:
        audio.setnchannels(1)
        audio.setsampwidth(2)
        audio.setframerate(sample_rate)

        frames = bytearray()
        for index in range(sample_rate * duration):
            time = index / sample_rate
            chord = chord_frequencies[min(int(time // 3), 2)]
            local_time = time % 3
            envelope = min(local_time / 0.8, 1, (3 - local_time) / 0.8)
            fade = min(time / 1.2, 1, (duration - time) / 1.2)
            value = sum(
                math.sin(2 * math.pi * frequency * time) / (position + 1)
                for position, frequency in enumerate(chord)
            )
            sample = int(5_500 * value * max(envelope, 0) * max(fade, 0))
            frames.extend(sample.to_bytes(2, byteorder="little", signed=True))

        audio.writeframes(frames)

    subprocess.run(
        [
            imageio_ffmpeg.get_ffmpeg_exe(),
            "-y",
            "-i",
            str(silent_video_path),
            "-i",
            str(audio_path),
            "-c:v",
            "copy",
            "-c:a",
            "aac",
            "-b:a",
            "160k",
            "-shortest",
            "-movflags",
            "+faststart",
            str(video_path),
        ],
        check=True,
        capture_output=True,
    )

    silent_video_path.unlink()
    audio_path.unlink()


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    save_story_1()
    save_story_2()
    save_story_3()
    save_instagram_feed()
    save_tiktok_video()
    print(f"Launch assets generated in {OUTPUT}")


if __name__ == "__main__":
    main()
