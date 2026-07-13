"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export default function ProductGallery({
  images,
  name,
}: ProductGalleryProps) {
  const validImages = images?.filter(Boolean) ?? [];
  const [selectedImage, setSelectedImage] = useState(
    validImages[0] ?? ""
  );

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
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {validImages.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {validImages.map((image, index) => {
            const isSelected = image === selectedImage;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                aria-label={`Ver imagen ${index + 1} de ${name}`}
                className={`relative aspect-square overflow-hidden rounded-2xl border-2 bg-zinc-100 transition ${
                  isSelected
                    ? "border-black"
                    : "border-transparent hover:border-zinc-300"
                }`}
              >
                <Image
                  src={image}
                  alt={`${name} - imagen ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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