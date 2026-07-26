"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const SHARE_TITLE = "Everything Must Go";

const SHARE_TEXT =
  "¡Mira este catálogo de Everything Must Go! Productos disponibles por mudanza.";

export default function ShareCatalogButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

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

  function getCatalogUrl() {
    return window.location.origin;
  }

  function shareOnWhatsApp() {
    const url = getCatalogUrl();
    const message = `${SHARE_TEXT}\n\n${url}`;

    window.location.href = `https://wa.me/?text=${encodeURIComponent(
      message
    )}`;

    setIsOpen(false);
  }

  async function shareNatively() {
    const url = getCatalogUrl();

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url,
        });

        setIsOpen(false);
        return;
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }
      }
    }

    await copyLink();
  }

  async function copyLink() {
    const url = getCatalogUrl();

    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1400);
    } catch {
      window.prompt(
        "Mantén presionado para copiar el enlace:",
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
          setIsOpen((current) => !current)
        }
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Compartir catálogo"
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
          Compartir
        </span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[100] mt-2 w-64 rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl"
        >
          <p className="px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-wider text-zinc-400">
            Compartir catálogo
          </p>

          <button
            type="button"
            role="menuitem"
            onClick={shareOnWhatsApp}
            className="flex min-h-12 w-full touch-manipulation items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-zinc-700 active:bg-zinc-100 sm:hover:bg-zinc-100 sm:hover:text-black"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 font-semibold">
              W
            </span>

            Compartir por WhatsApp
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={shareNatively}
            className="flex min-h-12 w-full touch-manipulation items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-zinc-700 active:bg-zinc-100 sm:hover:bg-zinc-100 sm:hover:text-black"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-lg">
              ↗
            </span>

            Compartir en otra app
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={copyLink}
            className="flex min-h-12 w-full touch-manipulation items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-zinc-700 active:bg-zinc-100 sm:hover:bg-zinc-100 sm:hover:text-black"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-lg">
              ⧉
            </span>

            {copied
              ? "Enlace copiado"
              : "Copiar enlace"}
          </button>
        </div>
      )}
    </div>
  );
}