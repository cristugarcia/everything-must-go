import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";

type RelatedProductsProps = {
  products: Product[];
};

export default function RelatedProducts({
  products,
}: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 border-t border-zinc-200 pt-14">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
        También te puede interesar
      </p>

      <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        Productos relacionados
      </h2>

      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}