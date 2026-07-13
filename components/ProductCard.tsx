import Image from "next/image";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const image = product.images?.[0];

  return (
    <Link
      href={`/item/${product.id}`}
      className="group block"
    >
      <article className="h-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="relative aspect-square overflow-hidden bg-zinc-100">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl">
              📦
            </div>
          )}
        </div>

        <div className="p-6">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-zinc-400">
            {product.category}
          </p>

          <h3 className="mt-2 text-xl font-semibold text-zinc-900">
            {product.name}
          </h3>

          <p className="mt-4 text-2xl font-bold text-zinc-900">
            {formatPrice(product.price)}
          </p>

          <div className="mt-5">
            <StatusBadge status={product.status} />
          </div>
        </div>
      </article>
    </Link>
  );
}