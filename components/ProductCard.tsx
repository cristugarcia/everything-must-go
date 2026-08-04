import Image from "next/image";
import Link from "next/link";

import StatusBadge from "@/components/StatusBadge";

import { getProductPriceDisplay } from "@/lib/formatPrice";
import type { Locale } from "@/lib/i18n/config";
import type { Product } from "@/lib/types";

type ProductCardDictionary = {
  viewProduct: string;
  soldOverlay: string;
  reservedOverlay: string;
  soldMessage: string;
  reservedMessage: string;
  priceOnRequest: string;
  free: string;
  status: {
    available: string;
    reserved: string;
    sold: string;
  };
};

type ProductCardProps = {
  product: Product;
  locale: Locale;
  dictionary: ProductCardDictionary;
  categories: Record<string, string>;
};

export default function ProductCard({
  product,
  locale,
  dictionary,
  categories,
}: ProductCardProps) {
  const image = product.images?.[0];

  const normalizedStatus = product.status
    .trim()
    .toLowerCase();

  const isSold =
    normalizedStatus === "vendido";

  const isReserved =
    normalizedStatus === "reservado";

  const priceDisplay =
    getProductPriceDisplay(
      product.price,
      locale,
      {
        free: dictionary.free,
        priceOnRequest:
          dictionary.priceOnRequest,
      }
    );

  const translatedCategory =
    categories[product.category] ??
    product.category;

  return (
    <Link
      href={`/${locale}/item/${product.id}`}
      className="group block h-full"
    >
      <article
        className={[
          "h-full overflow-hidden rounded-3xl border bg-white shadow-sm transition duration-300",
          isSold
            ? "border-zinc-200"
            : "border-zinc-200 group-hover:-translate-y-1 group-hover:shadow-xl",
          isReserved
            ? "ring-2 ring-amber-200"
            : "",
        ].join(" ")}
      >
        <div className="relative aspect-square overflow-hidden bg-zinc-100">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={[
                "object-cover transition duration-500",
                isSold
                  ? "grayscale"
                  : "group-hover:scale-105",
              ].join(" ")}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl">
              📦
            </div>
          )}

          {(isSold || isReserved) && (
            <div
              className={[
                "absolute inset-0",
                isSold
                  ? "bg-black/25"
                  : "bg-amber-950/10",
              ].join(" ")}
            />
          )}

          <div className="absolute left-4 top-4">
            <StatusBadge
              status={product.status}
              labels={dictionary.status}
            />
          </div>

          {isSold && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full bg-black/80 px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] text-white">
                {dictionary.soldOverlay}
              </span>
            </div>
          )}

          {isReserved && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="rounded-2xl bg-white/95 px-4 py-3 text-center text-sm font-medium text-amber-800 shadow-sm backdrop-blur">
                {dictionary.reservedOverlay}
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-zinc-600">
            {translatedCategory}
          </p>

          <h3 className="mt-2 text-xl font-semibold text-zinc-900">
            {product.name}
          </h3>

          <p
            className={[
              "mt-4 text-2xl font-bold",
              isSold
                ? "text-zinc-500 line-through"
                : "text-zinc-900",
            ].join(" ")}
          >
            {priceDisplay.primary}
          </p>

          {priceDisplay.secondary && (
            <p
              className={[
                "mt-1 text-sm font-medium",
                isSold
                  ? "text-zinc-600 line-through"
                  : "text-zinc-500",
              ].join(" ")}
            >
              {priceDisplay.secondary}
            </p>
          )}

          {!isSold && !isReserved && (
            <div className="mt-5">
              <StatusBadge
                status={product.status}
                labels={dictionary.status}
              />
            </div>
          )}

          {isSold && (
            <p className="mt-5 text-sm font-medium text-zinc-500">
              {dictionary.soldMessage}
            </p>
          )}

          {isReserved && (
            <p className="mt-5 text-sm font-medium text-amber-700">
              {dictionary.reservedMessage}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
