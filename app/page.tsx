import products from "@/data/catalog.json";
import ProductCatalog from "@/components/ProductCatalog";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ProjectPreview from "@/components/ProjectPreview";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Product } from "@/lib/types";

const WHATSAPP_NUMBER = "5491123897526";

export default function Home() {
  const productList = products as Product[];

  const publishedProducts = productList.filter(
    (product) => product.publish
  );

  const availableProducts = publishedProducts.filter(
    (product) =>
      product.status.trim().toLowerCase() === "disponible"
  ).length;

  const categories = new Set(
    publishedProducts
      .map((product) => product.category)
      .filter(Boolean)
  ).size;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola Cristina 👋 Vi tu catálogo de Everything Must Go y quería hacerte una consulta."
  )}`;

  return (
  <main className="min-h-screen bg-white">
    <SiteHeader currentPage="catalogo" />

    {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-100">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-50 to-white" />

        <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-24 text-center sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-400">
            Venta por mudanza · Buenos Aires
          </p>

          <h1 className="mt-6 max-w-5xl text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
            Everything Must Go
          </h1>

          <p className="mt-6 max-w-3xl text-2xl font-medium leading-relaxed text-zinc-700 sm:text-3xl">
            Todo debe encontrar un nuevo hogar antes de mi mudanza.
          </p>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-500">
            Estoy vendiendo muebles, electrónica, vehículos y otros artículos
            en muy buen estado que todavía tienen mucho por ofrecer.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#productos"
              className="rounded-full bg-black px-8 py-4 font-medium text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              Explorar catálogo
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-zinc-300 bg-white px-8 py-4 font-medium text-zinc-900 transition hover:-translate-y-0.5 hover:border-black"
            >
              Contactar por WhatsApp
            </a>
          </div>

          <div className="mt-16 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-zinc-900">
                {publishedProducts.length}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Productos publicados
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-zinc-900">
                {availableProducts}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Disponibles ahora
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-3xl font-bold text-zinc-900">
                {categories}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Categorías
              </p>
            </div>
          </div>

          <p className="mt-14 text-sm uppercase tracking-[0.25em] text-zinc-400">
            Disponible hasta el 20 de agosto de 2026
          </p>
        </div>
      </section>

      {/* Catálogo */}
      <section
        id="productos"
        className="mx-auto max-w-6xl scroll-mt-8 px-6 py-24 sm:px-8"
      >
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            Catálogo
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Productos en venta
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-500">
            Busca por nombre, marca o categoría y consulta directamente por
            WhatsApp.
          </p>
        </div>

        <ProductCatalog products={publishedProducts} />
      </section>

      {/* Proyecto */}
      <ProjectPreview />
      
      <SiteFooter variant="catalogo" />

      <FloatingWhatsApp />
    </main>
  );
}