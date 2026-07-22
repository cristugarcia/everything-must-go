import Link from "next/link";
import { notFound } from "next/navigation";

import products from "@/data/catalog.json";

import ProductGallery from "@/components/ProductGallery";
import RelatedProducts from "@/components/RelatedProducts";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StatusBadge from "@/components/StatusBadge";
import Button from "@/components/ui/Button";

import { SITE } from "@/lib/site";
import { Product } from "@/lib/types";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const statusPriority: Record<string, number> = {
  disponible: 0,
  reservado: 1,
  vendido: 2,
};

export default async function ProductPage({
  params,
}: Props) {
  const { id } = await params;

  const productList = products as Product[];

  const product = productList.find(
    (item) => item.id === id
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = productList
    .filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category &&
        item.publish
    )
    .sort((a, b) => {
      const aStatus = a.status
        .trim()
        .toLowerCase();

      const bStatus = b.status
        .trim()
        .toLowerCase();

      return (
        (statusPriority[aStatus] ?? 3) -
        (statusPriority[bStatus] ?? 3)
      );
    })
    .slice(0, 3);

  const normalizedStatus = product.status
    .trim()
    .toLowerCase();

  const isSold = normalizedStatus === "vendido";
  const isReserved = normalizedStatus === "reservado";

  const formattedPrice =
    product.price > 0
      ? `$ ${product.price.toLocaleString("es-AR")}`
      : "Precio a consultar";

  const productUrl = `${SITE.url}/item/${product.id}`;

  const whatsappMessage = isReserved
    ? `Hola Cristina 👋

Vi que el producto "${product.name}" está reservado.

¿Podrías avisarme si vuelve a estar disponible?

Precio publicado: ${formattedPrice}

${productUrl}`
    : `Hola Cristina 👋

Me interesa el producto "${product.name}" publicado en ${SITE.name}.

Precio: ${formattedPrice}

¿Sigue disponible?

${productUrl}`;

  const whatsappUrl = `https://wa.me/${
    SITE.whatsapp.number
  }?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-8 sm:py-12">
        <Link
          href="/#productos"
          className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-950"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          >
            ←
          </span>

          Volver al catálogo
        </Link>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* Galería */}
          <div className="lg:sticky lg:top-24">
            <ProductGallery
              images={product.images}
              name={product.name}
            />
          </div>

          {/* Información */}
          <section>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
                {product.category}
                {product.subcategory
                  ? ` · ${product.subcategory}`
                  : ""}
              </p>

              <StatusBadge status={product.status} />
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-[-0.035em] text-zinc-950 sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            <p className="mt-7 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
              {formattedPrice}
            </p>

            {isReserved && (
              <p className="mt-4 max-w-xl leading-7 text-amber-700">
                Este artículo está reservado actualmente, pero puedes
                consultarme por si vuelve a estar disponible.
              </p>
            )}

            {/* CTA */}
            <div className="mt-8">
              {isSold ? (
                <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-5 text-center font-medium text-red-700">
                  Este artículo ya fue vendido.
                </div>
              ) : (
                <Button
                  href={whatsappUrl}
                  external
                  variant="whatsapp"
                  size="lg"
                  fullWidth
                >
                  {isReserved
                    ? "Consultar por disponibilidad"
                    : "Consultar por WhatsApp"}
                </Button>
              )}
            </div>

            {!isSold && (
              <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-zinc-600 sm:grid-cols-3">
                <div className="rounded-2xl bg-zinc-50 px-4 py-4">
                  <p className="font-semibold text-zinc-900">
                    Consulta directa
                  </p>

                  <p className="mt-1 leading-5">
                    Escríbeme por WhatsApp.
                  </p>
                </div>

                <div className="rounded-2xl bg-zinc-50 px-4 py-4">
                  <p className="font-semibold text-zinc-900">
                    Estado actualizado
                  </p>

                  <p className="mt-1 leading-5">
                    La disponibilidad se mantiene al día.
                  </p>
                </div>

                <div className="rounded-2xl bg-zinc-50 px-4 py-4">
                  <p className="font-semibold text-zinc-900">
                    Buenos Aires
                  </p>

                  <p className="mt-1 leading-5">
                    Coordinamos retiro o entrega.
                  </p>
                </div>
              </div>
            )}

            {/* Detalles */}
            <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-white">
              <div className="border-b border-zinc-200 bg-zinc-50 px-6 py-4">
                <h2 className="font-semibold text-zinc-950">
                  Detalles del producto
                </h2>
              </div>

              <dl className="divide-y divide-zinc-100 px-6">
                {product.brand && (
                  <div className="flex justify-between gap-6 py-4">
                    <dt className="text-zinc-500">
                      Marca
                    </dt>

                    <dd className="text-right font-medium text-zinc-950">
                      {product.brand}
                    </dd>
                  </div>
                )}

                {product.model && (
                  <div className="flex justify-between gap-6 py-4">
                    <dt className="text-zinc-500">
                      Modelo
                    </dt>

                    <dd className="text-right font-medium text-zinc-950">
                      {product.model}
                    </dd>
                  </div>
                )}

                <div className="flex justify-between gap-6 py-4">
                  <dt className="text-zinc-500">
                    Condición
                  </dt>

                  <dd className="text-right font-medium text-zinc-950">
                    {product.condition}
                  </dd>
                </div>

                <div className="flex justify-between gap-6 py-4">
                  <dt className="text-zinc-500">
                    Cantidad
                  </dt>

                  <dd className="text-right font-medium text-zinc-950">
                    {product.quantity}
                  </dd>
                </div>

                {product.purchaseYear && (
                  <div className="flex justify-between gap-6 py-4">
                    <dt className="text-zinc-500">
                      Año de compra
                    </dt>

                    <dd className="text-right font-medium text-zinc-950">
                      {product.purchaseYear}
                    </dd>
                  </div>
                )}

                {product.location && (
                  <div className="flex justify-between gap-6 py-4">
                    <dt className="text-zinc-500">
                      Ubicación
                    </dt>

                    <dd className="text-right font-medium text-zinc-950">
                      {product.location}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Descripción */}
            {product.publicDescription && (
              <div className="mt-10 border-t border-zinc-200 pt-10">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
                  Descripción
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-950">
                  Sobre este producto
                </h2>

                <p className="mt-4 whitespace-pre-line text-lg leading-8 text-zinc-600">
                  {product.publicDescription}
                </p>
              </div>
            )}
          </section>
        </div>

        <div className="mt-24 border-t border-zinc-200 pt-16">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>

      <SiteFooter variant="catalogo" />
    </main>
  );
}