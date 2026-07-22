import products from "@/data/catalog.json";
import ProductCatalog from "@/components/ProductCatalog";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ProjectPreview from "@/components/ProjectPreview";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { SITE } from "@/lib/site";
import { Product } from "@/lib/types";

const whatsappUrl = `https://wa.me/${
  SITE.whatsapp.number
}?text=${encodeURIComponent(SITE.whatsapp.message)}`;

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

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader currentPage="catalogo" />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-zinc-100 bg-white">
        {/* Fondo decorativo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-zinc-100/80 blur-3xl" />

          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/70 to-white" />
        </div>

        {/* Contenido del hero */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-65px)] max-w-6xl flex-col items-center justify-center px-6 py-16 text-center sm:px-8 sm:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-400 sm:text-sm sm:tracking-[0.3em]">
            Venta por mudanza · {SITE.city}
          </p>

          <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-[-0.04em] text-zinc-950 sm:text-6xl lg:text-7xl">
            {SITE.name}
          </h1>

          <p className="mt-6 max-w-3xl text-2xl font-medium leading-tight tracking-tight text-zinc-700 sm:text-3xl sm:leading-tight">
            {SITE.slogan}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg sm:leading-8">
            Estoy vendiendo muebles, electrónica, vehículos y otros artículos
            en muy buen estado que todavía tienen mucho por ofrecer.
          </p>

          <div className="mt-9 flex w-full max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
            <Button
              href="/#productos"
              size="lg"
              fullWidth
              className="sm:w-fit"
            >
              Explorar catálogo
            </Button>

            <Button
              href={whatsappUrl}
              external
              variant="secondary"
              size="lg"
              fullWidth
              className="sm:w-fit"
            >
              Contactar por WhatsApp
            </Button>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm backdrop-blur">
            <span aria-hidden="true">⏳</span>

            <span>
              Disponible hasta el {SITE.deadline.text}
            </span>
          </div>

          <div className="mt-10 grid w-full max-w-3xl grid-cols-3 gap-2 sm:mt-12 sm:gap-4">
            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 px-2 py-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-6">
              <p className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                {publishedProducts.length}
              </p>

              <p className="mt-2 text-xs leading-4 text-zinc-500 sm:text-sm">
                Productos publicados
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 px-2 py-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-6">
              <p className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                {availableProducts}
              </p>

              <p className="mt-2 text-xs leading-4 text-zinc-500 sm:text-sm">
                Disponibles ahora
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 px-2 py-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-6">
              <p className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                {categories}
              </p>

              <p className="mt-2 text-xs leading-4 text-zinc-500 sm:text-sm">
                Categorías
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <Section
        id="productos"
        eyebrow="Catálogo"
        title="Productos en venta"
        description="Busca por nombre, marca o categoría y consulta directamente por WhatsApp."
        className="scroll-mt-8"
      >
        <ProductCatalog products={publishedProducts} />
      </Section>

      {/* Proyecto */}
      <ProjectPreview />

      {/* Footer */}
      <SiteFooter variant="catalogo" />

      <FloatingWhatsApp />
    </main>
  );
}