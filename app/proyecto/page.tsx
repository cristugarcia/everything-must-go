import Link from "next/link";
import products from "@/data/catalog.json";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Metadata } from "next";
import { Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "Caso de estudio",
  description:
    "Descubre cómo diseñé y desarrollé Everything Must Go con Next.js, TypeScript, Google Sheets y Vercel para resolver una necesidad real.",
  alternates: {
    canonical: "/proyecto",
  },
  openGraph: {
    title: "Caso de estudio | Everything Must Go",
    description:
      "Un proyecto real de desarrollo web, automatización y diseño creado para gestionar una venta por mudanza.",
    url: "/proyecto",
  },
};

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Google Sheets",
  "Node.js",
  "Vercel",
  "GitHub",
];

const features = [
  {
    title: "Catálogo dinámico",
    description:
      "Los productos se administran desde una fuente centralizada y no necesitan escribirse manualmente en el código.",
  },
  {
    title: "Búsqueda y filtros",
    description:
      "Los usuarios pueden buscar productos por nombre, marca o categoría y ordenar los resultados.",
  },
  {
    title: "Estados de inventario",
    description:
      "Cada artículo puede mostrarse como disponible, reservado o vendido.",
  },
  {
    title: "Páginas individuales",
    description:
      "Cada producto tiene una página propia con imágenes, descripción, precio y disponibilidad.",
  },
  {
    title: "Integración con WhatsApp",
    description:
      "Los interesados pueden consultar directamente por un producto mediante un mensaje personalizado.",
  },
  {
    title: "Diseño responsive",
    description:
      "La experiencia está adaptada para computadoras, tablets y dispositivos móviles.",
  },
];

export default function ProjectPage() {
  const productList = products as Product[];

  const publishedProducts = productList.filter(
    (product) => product.publish
  );

  const categories = new Set(
    publishedProducts
      .map((product) => product.category)
      .filter(Boolean)
  ).size;

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <SiteHeader currentPage="proyecto" />

      {/* Hero */}
      <section className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:py-32">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-400">
            Caso de estudio
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Un proyecto real construido para resolver un problema real.
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-zinc-600">
            Diseñé y desarrollé una plataforma para organizar, administrar y
            vender mis pertenencias antes de una mudanza internacional.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {technologies.slice(0, 5).map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700"
              >
                {technology}
              </span>
            ))}
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-3xl font-bold">
                {publishedProducts.length}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Productos publicados
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-3xl font-bold">{categories}</p>
              <p className="mt-1 text-sm text-zinc-500">
                Categorías
              </p>
            </div>

            <div className="col-span-2 rounded-2xl border border-zinc-200 bg-white p-5 sm:col-span-1">
              <p className="text-3xl font-bold">100%</p>
              <p className="mt-1 text-sm text-zinc-500">
                Responsive
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problema */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            01 · El problema
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Vender muchas cosas sin perder el control del inventario.
          </h2>
        </div>

        <div className="space-y-6 text-lg leading-8 text-zinc-600">
          <p>
            Antes de una mudanza internacional necesitaba vender muebles,
            electrónica, vehículos y otros artículos acumulados durante años.
          </p>

          <p>
            Publicar cada producto de manera independiente dificultaba mantener
            actualizados los precios, las descripciones y la disponibilidad.
            Además, los posibles compradores no tenían un único lugar donde
            consultar todo el inventario.
          </p>

          <p>
            Necesitaba una solución centralizada, fácil de administrar y
            suficientemente clara para personas que visitaran la página desde
            sus teléfonos.
          </p>
        </div>
      </section>

      {/* Solución */}
      <section className="bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
              02 · La solución
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Una plataforma conectada a una única fuente de información.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-zinc-300">
            <p>
              Construí una aplicación web con Next.js y TypeScript que utiliza
              Google Sheets como fuente central para administrar el inventario.
            </p>

            <p>
              Los datos se procesan y se transforman en un catálogo estructurado
              que la aplicación utiliza para generar la página principal, los
              filtros y las páginas individuales de cada producto.
            </p>

            <p>
              Esto permite actualizar la información sin editar manualmente los
              componentes de la página.
            </p>
          </div>
        </div>
      </section>

      {/* Arquitectura */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
          03 · Arquitectura
        </p>

        <h2 className="mt-3 text-4xl font-bold tracking-tight">
          De Google Sheets al catálogo publicado.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {[
            {
              number: "01",
              title: "Google Sheets",
              description: "Administración centralizada del inventario.",
            },
            {
              number: "02",
              title: "Import Script",
              description: "Validación y transformación de la información.",
            },
            {
              number: "03",
              title: "Next.js",
              description: "Generación del catálogo y páginas de producto.",
            },
            {
              number: "04",
              title: "Vercel",
              description: "Construcción y publicación de la aplicación.",
            },
          ].map((step) => (
            <article
              key={step.number}
              className="rounded-3xl border border-zinc-200 p-7"
            >
              <p className="text-sm font-bold text-zinc-400">
                {step.number}
              </p>

              <h3 className="mt-6 text-xl font-bold">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-zinc-500">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-zinc-100 p-8 sm:p-10">
          <div className="flex flex-col items-center justify-center gap-4 text-center font-mono text-sm font-medium text-zinc-700 sm:flex-row sm:text-base">
            <span>Google Sheets</span>
            <span aria-hidden="true">→</span>
            <span>importInventory.ts</span>
            <span aria-hidden="true">→</span>
            <span>catalog.json</span>
            <span aria-hidden="true">→</span>
            <span>Next.js</span>
            <span aria-hidden="true">→</span>
            <span>Vercel</span>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            04 · Funcionalidades
          </p>

          <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight">
            Una experiencia sencilla para compradores y administradores.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-zinc-200 bg-white p-7"
              >
                <h3 className="text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-500">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Aprendizajes */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            05 · Aprendizajes
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Mucho más que construir una interfaz.
          </h2>
        </div>

        <div className="space-y-4">
          {[
            "Transformar una necesidad personal en una solución tecnológica funcional.",
            "Modelar y validar información proveniente de una fuente externa.",
            "Crear componentes reutilizables y páginas dinámicas.",
            "Diseñar primero para la experiencia móvil.",
            "Gestionar el proyecto mediante entregas y sprints incrementales.",
            "Combinar criterios técnicos, comerciales y de experiencia de usuario.",
          ].map((learning) => (
            <div
              key={learning}
              className="flex gap-4 rounded-2xl border border-zinc-200 p-5"
            >
              <span className="font-bold text-zinc-400">✓</span>
              <p className="leading-7 text-zinc-600">
                {learning}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tecnologías */}
      <section className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            06 · Tecnologías
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Herramientas utilizadas.
          </h2>

          <div className="mt-10 flex flex-wrap gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-zinc-700 px-5 py-3 font-medium text-zinc-200"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center sm:px-8">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Explora el resultado.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-500">
          El proyecto continúa funcionando como un catálogo real mientras
          evoluciona como parte de mi portfolio profesional.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/#productos"
            className="rounded-full bg-black px-8 py-4 font-medium text-white transition hover:bg-zinc-800"
          >
            Ver catálogo
          </Link>

          <Link
            href="/"
            className="rounded-full border border-zinc-300 px-8 py-4 font-medium transition hover:border-black"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}