"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

function isEditableElement(
  target: EventTarget | null
) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

export default function ProductGallery({
  images,
  name,
}: ProductGalleryProps) {
  const validImages = images?.filter(Boolean) ?? [];

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const selectedImage =
    validImages[selectedIndex] ?? "";

  const showPrevious = useCallback(() => {
    setSelectedIndex((currentIndex) =>
      currentIndex === 0
        ? validImages.length - 1
        : currentIndex - 1
    );
  }, [validImages.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((currentIndex) =>
      currentIndex === validImages.length - 1
        ? 0
        : currentIndex + 1
    );
  }, [validImages.length]);

  useEffect(() => {
    if (validImages.length <= 1) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (isEditableElement(event.target)) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    showNext,
    showPrevious,
    validImages.length,
  ]);

  if (validImages.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-zinc-100 text-8xl">
        📦
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-zinc-100">
        <Image
          src={selectedImage}
          alt={`${name} - imagen ${
            selectedIndex + 1
          } de ${validImages.length}`}
          fill
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />

        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label={`Ver imagen anterior de ${name}`}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-zinc-900 shadow-lg backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              ←
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label={`Ver imagen siguiente de ${name}`}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-zinc-900 shadow-lg backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              →
            </button>

            <div
              aria-live="polite"
              className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white"
            >
              {selectedIndex + 1} /{" "}
              {validImages.length}
            </div>
          </>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {validImages.map((image, index) => {
            const isSelected =
              index === selectedIndex;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() =>
                  setSelectedIndex(index)
                }
                aria-label={`Ver imagen ${
                  index + 1
                } de ${name}`}
                aria-current={
                  isSelected ? "true" : undefined
                }
                className={`relative aspect-square overflow-hidden rounded-2xl border-2 bg-zinc-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                  isSelected
                    ? "border-black"
                    : "border-transparent hover:border-zinc-300"
                }`}
              >
                <Image
                  src={image}
                  alt={`${name} - imagen ${
                    index + 1
                  }`}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
