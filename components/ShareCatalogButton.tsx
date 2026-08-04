"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import type { Locale } from "@/lib/i18n/config";
import { buildTrackedUrl } from "@/lib/utm";

type ShareCatalogButtonProps = {
  locale: Locale;
};

const COPY = {
  es: {
    title: "Everything Must Go",
    text: "¡Mira este catálogo de Everything Must Go! Productos disponibles por mudanza.",
    ariaLabel: "Compartir catálogo",
    menuTitle: "Compartir catálogo",
    shareImage: "Compartir imagen",
    shareImageDescription: "Instagram, WhatsApp y otras apps",
    whatsapp: "Compartir enlace por WhatsApp",
    copyLink: "Copiar enlace",
    copied: "Enlace copiado",
    copyPrompt:
      "Mantén presionado para copiar el enlace:",
  },

  en: {
    title: "Everything Must Go",
    text: "Take a look at the Everything Must Go catalog! Products available due to relocation.",
    ariaLabel: "Share catalog",
    menuTitle: "Share catalog",
    shareImage: "Share image",
    shareImageDescription:
      "Instagram, WhatsApp and other apps",
    whatsapp: "Share link on WhatsApp",
    copyLink: "Copy link",
    copied: "Link copied",
    copyPrompt:
      "Press and hold to copy the link:",
  },
} as const;

export default function ShareCatalogButton({
  locale,
}: ShareCatalogButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const copy = COPY[locale];

  useEffect(() => {
    function handlePointerDown(
      event: PointerEvent
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  function getCatalogUrl(
  channel:
    | "whatsapp"
    | "referral"
    | "instagram"
) {
  return buildTrackedUrl({
    url: `${window.location.origin}/${locale}`,
    channel,
    content: "catalog",
  });
}

  function getSocialImageUrl() {
    return `/brand/emg-share-${locale}.png`;
  }

  async function getSocialImageFile() {
    const imageUrl = getSocialImageUrl();

    const response = await fetch(imageUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        "Could not load the social sharing image."
      );
    }

    const blob = await response.blob();

    return new File(
      [blob],
      `everything-must-go-${locale}.png`,
      {
        type: blob.type || "image/png",
      }
    );
  }

  async function shareImage() {
    const imageUrl = getSocialImageUrl();

    try {
      const file =
        await getSocialImageFile();

      const shareData: ShareData = {
        files: [file],
      };

      const supportsFileSharing =
        typeof navigator.share ===
          "function" &&
        typeof navigator.canShare ===
          "function" &&
        navigator.canShare(shareData);

      if (!supportsFileSharing) {
        window.open(
          imageUrl,
          "_blank",
          "noopener,noreferrer"
        );

        setIsOpen(false);
        return;
      }

      /*
       * Compartimos solamente el archivo.
       *
       * No incluimos `url` para evitar que
       * Instagram lo interprete nuevamente
       * como un enlace en lugar de una imagen.
       */
      await navigator.share(shareData);

      setIsOpen(false);
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      /*
       * Fallback: abrir la imagen para que
       * pueda guardarse o compartirse
       * manualmente.
       */
      window.open(
        imageUrl,
        "_blank",
        "noopener,noreferrer"
      );

      setIsOpen(false);
    }
  }

  function shareOnWhatsApp() {
    const url = getCatalogUrl("whatsapp");

    const message = `${copy.text}\n\n${url}`;

    window.location.href =
      `https://wa.me/?text=${encodeURIComponent(
        message
      )}`;

    setIsOpen(false);
  }

  async function copyLink() {
    const url = getCatalogUrl("referral");

    try {
      await navigator.clipboard.writeText(
        url
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1400);
    } catch {
      window.prompt(
        copy.copyPrompt,
        url
      );
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative shrink-0"
    >
      <button
        type="button"
        onClick={() =>
          setIsOpen(
            (current) => !current
          )
        }
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={copy.ariaLabel}
        className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition active:scale-95 active:bg-zinc-100 sm:h-10 sm:w-auto sm:gap-2 sm:px-3 sm:hover:border-zinc-300 sm:hover:bg-zinc-100 sm:hover:text-black"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
        >
          <path
            d="M18 8a3 3 0 1 0-2.83-4A3 3 0 0 0 18 8ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 6a3 3 0 1 0-2.83-4A3 3 0 0 0 18 21ZM8.7 10.45l6.6-3.9M8.7 13.55l6.6 3.9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="hidden text-sm font-medium sm:inline">
          {locale === "es"
            ? "Compartir"
            : "Share"}
        </span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[100] mt-2 w-72 rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl"
        >
          <p className="px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-wider text-zinc-400">
            {copy.menuTitle}
          </p>

          {/* Imagen para Instagram/Stories */}
          <button
            type="button"
            role="menuitem"
            onClick={shareImage}
            className="flex min-h-14 w-full touch-manipulation items-center gap-3 rounded-xl px-3 py-3 text-left text-zinc-700 active:bg-zinc-100 sm:hover:bg-zinc-100 sm:hover:text-black"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-lg text-white">
              ↗
            </span>

            <span>
              <span className="block text-sm font-medium">
                {copy.shareImage}
              </span>

              <span className="mt-0.5 block text-xs font-normal text-zinc-400">
                {copy.shareImageDescription}
              </span>
            </span>
          </button>

          {/* Enlace directo a WhatsApp */}
          <button
            type="button"
            role="menuitem"
            onClick={shareOnWhatsApp}
            className="flex min-h-12 w-full touch-manipulation items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-zinc-700 active:bg-zinc-100 sm:hover:bg-zinc-100 sm:hover:text-black"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-semibold">
              W
            </span>

            {copy.whatsapp}
          </button>

          {/* Copiar URL */}
          <button
            type="button"
            role="menuitem"
            onClick={copyLink}
            className="flex min-h-12 w-full touch-manipulation items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-zinc-700 active:bg-zinc-100 sm:hover:bg-zinc-100 sm:hover:text-black"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-lg">
              ⧉
            </span>

            {copied
              ? copy.copied
              : copy.copyLink}
          </button>
        </div>
      )}
    </div>
  );
}