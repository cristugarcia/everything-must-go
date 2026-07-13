import products from "@/data/catalog.json";
import ProductGallery from "@/components/ProductGallery";
import { Product } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = (products as Product[]).find(
    (item) => item.id === id
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-12">
        <Link
          href="/#productos"
          className="mb-8 inline-flex items-center text-zinc-600 transition hover:text-black"
        >
          ← Volver al catálogo
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          <ProductGallery
            images={product.images}
            name={product.name}
          />

          <section>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
              {product.category}
              {product.subcategory
                ? ` · ${product.subcategory}`
                : ""}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-6 text-4xl font-bold text-zinc-900">
              {product.price != null
                ? `$ ${product.price.toLocaleString("es-AR")}`
                : "Consultar"}
            </p>

            <span className="mt-6 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              {product.condition}
            </span>

            <div className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
              <dl className="space-y-4">
                {product.brand && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-zinc-500">Marca</dt>
                    <dd className="text-right font-medium text-zinc-900">
                      {product.brand}
                    </dd>
                  </div>
                )}

                {product.model && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-zinc-500">Modelo</dt>
                    <dd className="text-right font-medium text-zinc-900">
                      {product.model}
                    </dd>
                  </div>
                )}

                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">Condición</dt>
                  <dd className="text-right font-medium text-zinc-900">
                    {product.condition}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">Cantidad</dt>
                  <dd className="text-right font-medium text-zinc-900">
                    {product.quantity}
                  </dd>
                </div>

                {product.purchaseYear && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-zinc-500">
                      Año de compra
                    </dt>
                    <dd className="text-right font-medium text-zinc-900">
                      {product.purchaseYear}
                    </dd>
                  </div>
                )}

                {product.location && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-zinc-500">Ubicación</dt>
                    <dd className="text-right font-medium text-zinc-900">
                      {product.location}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {product.publicDescription && (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold text-zinc-900">
                  Descripción
                </h2>

                <p className="mt-4 whitespace-pre-line leading-8 text-zinc-600">
                  {product.publicDescription}
                </p>
              </div>
            )}

            <button
              type="button"
              className="mt-10 w-full rounded-full bg-black px-8 py-4 font-medium text-white transition hover:bg-zinc-800 sm:w-auto"
            >
              Reservar artículo
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}