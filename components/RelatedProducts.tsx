import ProductCard from "@/components/ProductCard";

import type { Locale } from "@/lib/i18n/config";
import type { Product } from "@/lib/types";

type RelatedProductsDictionary = {
  eyebrow: string;
  title: string;
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

type RelatedProductsProps = {
  products: Product[];
  locale: Locale;
  dictionary: RelatedProductsDictionary;
  categories: Record<string, string>;
};

export default function RelatedProducts({
  products,
  locale,
  dictionary,
  categories,
}: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 border-t border-zinc-200 pt-14">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-600">
        {dictionary.eyebrow}
      </p>

      <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        {dictionary.title}
      </h2>

      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            locale={locale}
            dictionary={{
              viewProduct: dictionary.viewProduct,
              soldOverlay: dictionary.soldOverlay,
              reservedOverlay: dictionary.reservedOverlay,
              soldMessage: dictionary.soldMessage,
              reservedMessage: dictionary.reservedMessage,
              priceOnRequest: dictionary.priceOnRequest,
              free: dictionary.free,
              status: dictionary.status,
            }}
            categories={categories}
          />
        ))}
      </div>
    </section>
  );
}
