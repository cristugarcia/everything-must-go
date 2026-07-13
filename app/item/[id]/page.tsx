import products from "@/data/catalog.json";
import ProductGallery from "@/components/ProductGallery";
import RelatedProducts from "@/components/RelatedProducts";
import StatusBadge from "@/components/StatusBadge";
import { Product } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";

const WHATSAPP_NUMBER = "5491123897526";
const SITE_URL =
  "https://everything-must-go-cyan.vercel.app";

type Props = {
  params: Promise<{
    id: string;
  }>;
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
    const statusPriority: Record<string, number> = {
      disponible: 0,
      reservado: 1,
      vendido: 2,
    };

    const aStatus = a.status.trim().toLowerCase();
    const bStatus = b.status.trim().toLowerCase();

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

const productUrl = `${SITE_URL}/item/${product.id}`;

const whatsappMessage = isReserved
  ? `Hola Cristina 👋

Vi que el producto "${product.name}" está reservado.

¿Podrías avisarme si vuelve a estar disponible?

Precio publicado: ${formattedPrice}

${productUrl}`
  : `Hola Cristina 👋

Me interesa el producto "${product.name}" publicado en Everything Must Go.

Precio: ${formattedPrice}

¿Sigue disponible?

${productUrl}`;

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  whatsappMessage
)}`;

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
              {product.price > 0
                ? `$ ${product.price.toLocaleString("es-AR")}`
                : "Consultar"}
            </p>

            <div className="mt-6">
              <StatusBadge status={product.status} />
            </div>

            <div className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
              <dl className="space-y-4">
                {product.brand && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-zinc-500">
                      Marca
                    </dt>

                    <dd className="text-right font-medium text-zinc-900">
                      {product.brand}
                    </dd>
                  </div>
                )}

                {product.model && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-zinc-500">
                      Modelo
                    </dt>

                    <dd className="text-right font-medium text-zinc-900">
                      {product.model}
                    </dd>
                  </div>
                )}

                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">
                    Condición
                  </dt>

                  <dd className="text-right font-medium text-zinc-900">
                    {product.condition}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">
                    Cantidad
                  </dt>

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
                    <dt className="text-zinc-500">
                      Ubicación
                    </dt>

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

            {isSold ? (
  <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 px-6 py-5 text-red-700">
    Este artículo ya fue vendido.
  </div>
) : (
  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-4 font-medium text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 sm:w-auto"
  >
    {isReserved
      ? "Avisarme si vuelve a estar disponible"
      : "Consultar por WhatsApp"}
  </a>
)}
          </section>
        </div>

        <RelatedProducts products={relatedProducts} />
      </div>
    </main>
  );
}