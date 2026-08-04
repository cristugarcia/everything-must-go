"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

type ShareProductStoryButtonProps = {
  productId: string;
  name: string;
  formattedPrice: string;
  status: string;
  productUrl: string;
  dictionary: {
    movingSale: string;
    loadingImage: string;
    openingShare: string;
    shareInstagram: string;

    prepareFailed: string;
    sharedSuccess: string;
    downloadedSuccess: string;
    downloadFallback: string;

    footerText: string;
  };
};

const STORY_WIDTH = 1080;
const STORY_HEIGHT = 1920;

function createRoundedRectangle(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const safeRadius = Math.min(
    radius,
    width / 2,
    height / 2
  );

  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(
    x + width - safeRadius,
    y
  );

  context.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + safeRadius
  );

  context.lineTo(
    x + width,
    y + height - safeRadius
  );

  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - safeRadius,
    y + height
  );

  context.lineTo(
    x + safeRadius,
    y + height
  );

  context.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - safeRadius
  );

  context.lineTo(x, y + safeRadius);

  context.quadraticCurveTo(
    x,
    y,
    x + safeRadius,
    y
  );

  context.closePath();
}

function drawCoverImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const imageRatio =
    image.naturalWidth / image.naturalHeight;

  const containerRatio = width / height;

  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > containerRatio) {
    sourceWidth =
      image.naturalHeight * containerRatio;

    sourceX =
      (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight =
      image.naturalWidth / containerRatio;

    sourceY =
      (image.naturalHeight - sourceHeight) /
      2;
  }

  context.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    x,
    y,
    width,
    height
  );
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
) {
  const words = text.split(/\s+/);
  const lines: string[] = [];

  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine
      ? `${currentLine} ${word}`
      : word;

    if (
      context.measureText(testLine).width >
        maxWidth &&
      currentLine
    ) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function loadImage(
  source: string
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);

    image.onerror = () =>
      reject(
        new Error(
          "No se pudo cargar la fotografía."
        )
      );

    image.src = source;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(
          new Error(
            "No se pudo crear la imagen."
          )
        );
      },
      "image/png",
      1
    );
  });
}

export default function ShareProductStoryButton({
  productId,
  name,
  formattedPrice,
  status,
  productUrl,
  dictionary,
}: ShareProductStoryButtonProps) {
  const [storyFile, setStoryFile] =
    useState<File | null>(null);

  const [isPreparing, setIsPreparing] =
    useState(true);

  const [isSharing, setIsSharing] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const createStoryFile =
    useCallback(async () => {
      setIsPreparing(true);
      setMessage("");

      try {
        const image = await loadImage(
          `/api/product-image/${encodeURIComponent(
            productId
          )}`
        );

        const canvas =
          document.createElement("canvas");

        canvas.width = STORY_WIDTH;
        canvas.height = STORY_HEIGHT;

        const context =
          canvas.getContext("2d");

        if (!context) {
          throw new Error(
            "Tu navegador no permite crear la imagen."
          );
        }

        // Fondo
        context.fillStyle = "#F5F1EA";
        context.fillRect(
          0,
          0,
          STORY_WIDTH,
          STORY_HEIGHT
        );

        // Marca
        context.fillStyle = "#18181B";
        context.font =
          "700 48px Arial, sans-serif";

        context.fillText(
          "EVERYTHING MUST GO",
          72,
          105
        );

        context.fillStyle = "#71717A";
        context.font =
          "400 30px Arial, sans-serif";

        context.fillText(
        dictionary.movingSale,
        72,
        150
        );
        // Contenedor de la foto
        const imageX = 72;
        const imageY = 220;
        const imageWidth = 936;
        const imageHeight = 1050;
        const imageRadius = 48;

        context.save();

        createRoundedRectangle(
          context,
          imageX,
          imageY,
          imageWidth,
          imageHeight,
          imageRadius
        );

        context.clip();

        drawCoverImage(
          context,
          image,
          imageX,
          imageY,
          imageWidth,
          imageHeight
        );

        context.restore();

        // Estado
        const normalizedStatus = status
          .trim()
          .toLowerCase();

        let statusBackground = "#18181B";
        let statusTextColor = "#FFFFFF";

        if (
          normalizedStatus === "reservado"
        ) {
          statusBackground = "#FEF3C7";
          statusTextColor = "#92400E";
        }

        if (normalizedStatus === "vendido") {
          statusBackground = "#FEE2E2";
          statusTextColor = "#991B1B";
        }

        context.font =
          "700 27px Arial, sans-serif";

        const statusLabel =
          status.toUpperCase();

        const statusWidth =
          context.measureText(statusLabel)
            .width + 56;

        createRoundedRectangle(
          context,
          72,
          1325,
          statusWidth,
          62,
          31
        );

        context.fillStyle =
          statusBackground;

        context.fill();

        context.fillStyle =
          statusTextColor;

        context.fillText(
          statusLabel,
          100,
          1367
        );

        // Nombre
        context.fillStyle = "#18181B";
        context.font =
          "700 64px Arial, sans-serif";

        const nameLines = wrapText(
          context,
          name,
          936
        ).slice(0, 3);

        const nameStartY = 1485;
        const nameLineHeight = 76;

        nameLines.forEach(
          (line, index) => {
            context.fillText(
              line,
              72,
              nameStartY +
                index * nameLineHeight
            );
          }
        );

        const priceY =
          nameStartY +
          nameLines.length *
            nameLineHeight +
          28;

        // Precio
        context.fillStyle = "#18181B";
        context.font =
          "700 68px Arial, sans-serif";

        context.fillText(
          formattedPrice,
          72,
          priceY
        );

        // Pie
        context.fillStyle = "#71717A";
        context.font =
          "400 28px Arial, sans-serif";

        context.fillText(
        dictionary.footerText,
        72,
        1830
        );

        context.fillStyle = "#18181B";
        context.font =
          "600 27px Arial, sans-serif";

        context.fillText(
          "everything-must-go",
          72,
          1876
        );

        const blob =
          await canvasToBlob(canvas);

        const safeProductName = name
          .toLowerCase()
          .normalize("NFD")
          .replace(
            /[\u0300-\u036f]/g,
            ""
          )
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
          .slice(0, 50);

        const file = new File(
          [blob],
          `everything-must-go-${safeProductName}.png`,
          {
            type: "image/png",
          }
        );

        setStoryFile(file);
      } catch (error) {
        console.error(
          "Error creating Story:",
          error
        );

        setMessage(dictionary.prepareFailed);
      } finally {
        setIsPreparing(false);
      }
    }, [
      dictionary.footerText,
      dictionary.movingSale,
      dictionary.prepareFailed,
      formattedPrice,
      name,
      productId,
      status,
    ]);

  useEffect(() => {
  const timeoutId = window.setTimeout(() => {
    void createStoryFile();
  }, 0);

  return () => {
    window.clearTimeout(timeoutId);
  };
}, [createStoryFile]);

  function downloadStory(file: File) {
    const fileUrl =
      URL.createObjectURL(file);

    const anchor =
      document.createElement("a");

    anchor.href = fileUrl;
    anchor.download = file.name;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(fileUrl);
  }

  async function shareStory() {
    if (!storyFile) {
      await createStoryFile();
      return;
    }

    setIsSharing(true);
    setMessage("");

    try {
      // Intentamos dejar el enlace listo para
      // pegarlo en el sticker de Instagram.
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        void navigator.clipboard.writeText(
          productUrl
        );
      }

      const canShareFiles =
        typeof navigator.share ===
          "function" &&
        (!navigator.canShare ||
          navigator.canShare({
            files: [storyFile],
          }));

      if (canShareFiles) {
        await navigator.share({
          title: name,
          text: `${name} — ${formattedPrice}`,
          files: [storyFile],
        });

        setMessage(dictionary.sharedSuccess);

        return;
      }

      downloadStory(storyFile);

      setMessage(dictionary.downloadedSuccess);
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      console.error(
        "Error sharing Story:",
        error
      );

      downloadStory(storyFile);

      setMessage(dictionary.downloadFallback);
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={shareStory}
        disabled={
          isPreparing || isSharing
        }
        className="flex min-h-14 w-full touch-manipulation items-center justify-center gap-3 rounded-full border border-zinc-300 bg-white px-6 py-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-950 hover:bg-zinc-50 active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
        >
          <rect
            x="4"
            y="3"
            width="16"
            height="18"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.8"
          />

          <circle
            cx="12"
            cy="12"
            r="3.4"
            stroke="currentColor"
            strokeWidth="1.8"
          />

          <circle
            cx="17"
            cy="7"
            r="1"
            fill="currentColor"
          />
        </svg>

        {isPreparing
        ? dictionary.loadingImage
        : isSharing
            ? dictionary.openingShare
            : dictionary.shareInstagram}
      </button>

      {message && (
        <p
          aria-live="polite"
          className="mt-3 text-center text-sm leading-5 text-zinc-500"
        >
          {message}
        </p>
      )}
    </div>
  );
}
