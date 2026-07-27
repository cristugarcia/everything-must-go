import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Conoce a Cristina García Mijares, profesional de finanzas, operaciones, automatización y desarrollo de soluciones digitales.",
  alternates: {
    canonical: "/sobre-mi",
  },
  openGraph: {
    title: "Cristina García Mijares | Sobre mí",
    description:
      "Finanzas, operaciones y tecnología aplicadas a la resolución de problemas reales.",
    url: "/sobre-mi",
  },
};

const professionalAreas = [
  "Finanzas",
  "Operaciones",
  "Reporting",
  "Auditoría",
  "Automatización",
  "Desarrollo web",
];

const tools = [
  "Excel",
  "Power BI",
  "Tableau",
  "Alteryx",
  "Python",
  "UiPath",
  "QuickBooks",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Google Sheets",
  "Vercel",
];

const experience = [
  {
    company: "JPMorgan Chase & Co.",
    role: "Trade Lifecycle Analyst",
    description:
      "Análisis y conciliación de operaciones financieras, investigación de diferencias, seguimiento de indicadores y optimización de procesos operativos.",
  },
  {
    company: "PwC Argentina",
    role: "Senior Associate / Supervisora",
    description:
      "Auditoría para clientes internacionales, coordinación de equipos, planificación de entregas y automatización de procedimientos mediante herramientas digitales.",
  },
  {
    company: "My Books and Taxes",
    role: "Accounting & Tax Professional",
    description:
      "Bookkeeping, cuentas por pagar y cobrar, limpieza contable, preparación de impuestos de Estados Unidos y gestión de procesos para pequeñas empresas.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Navegación */}
      <SiteHeader currentPage="sobre-mi" />

      {/* Hero */}
      <section className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:py-32">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-400">
            Sobre mí
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Finanzas, operaciones y tecnología para resolver problemas reales.
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-zinc-600">
            Soy Cristina García Mijares, profesional de finanzas y operaciones
            con experiencia en empresas internacionales y un interés constante
            por la automatización y el desarrollo de soluciones digitales.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            Mi historia
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Una carrera construida entre países, industrias y nuevas formas de
            trabajar.
          </h2>
        </div>

        <div className="space-y-6 text-lg leading-8 text-zinc-600">
          <p>
            Nací en Venezuela y Argentina se convirtió en mi segundo hogar, un
            país que me adoptó y que forma parte esencial de mi historia
            personal y profesional.
          </p>

          <p>
            A lo largo de mi carrera he trabajado en análisis financiero,
            conciliaciones, reporting, auditoría, automatización de procesos y
            coordinación de equipos para compañías internacionales como
            JPMorgan Chase y PwC.
          </p>

          <p>
            Mi interés por la tecnología me llevó a formarme también en
            desarrollo web y a utilizar herramientas como Python, Power BI,
            Alteryx y UiPath para transformar tareas manuales en soluciones más
            rápidas, claras y eficientes.
          </p>

          <p>
            Everything Must Go nació como una solución real para organizar y
            vender mis pertenencias antes de una mudanza internacional junto a
            Kala, mi compañera de cuatro patas.
          </p>

          <p>
            Diseñé y desarrollé esta plataforma desde cero utilizando Next.js,
            TypeScript, Google Sheets y Vercel. El proyecto refleja la
            combinación que más me representa: análisis, organización,
            tecnología y resolución práctica de problemas, sin perder el lado
            humano detrás de cada nuevo comienzo.
          </p>
        </div>
      </section>

      {/* Áreas profesionales */}
      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            Perfil profesional
          </p>

          <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight">
            Un perfil que conecta negocio, procesos y tecnología.
          </h2>

          <div className="mt-10 flex flex-wrap gap-3">
            {professionalAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-zinc-200 bg-white px-5 py-3 font-medium text-zinc-700"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Experiencia */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
          Experiencia
        </p>

        <h2 className="mt-3 text-4xl font-bold tracking-tight">
          Experiencia en compañías internacionales.
        </h2>

        <div className="mt-12 grid gap-5">
          {experience.map((item) => (
            <article
              key={`${item.company}-${item.role}`}
              className="grid gap-5 rounded-3xl border border-zinc-200 p-7 sm:p-9 lg:grid-cols-[0.7fr_1.3fr]"
            >
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.15em] text-zinc-400">
                  {item.company}
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {item.role}
                </h3>
              </div>

              <p className="text-lg leading-8 text-zinc-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Herramientas */}
      <section className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Herramientas
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Tecnología aplicada a problemas de negocio.
          </h2>

          <div className="mt-10 flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-zinc-700 px-5 py-3 font-medium text-zinc-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
          Contacto
        </p>

        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Siempre estoy interesada en nuevos desafíos y oportunidades.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-500">
          Puedes conocer el caso de estudio de Everything Must Go o visitar mi
          perfil profesional.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/proyecto"
            className="rounded-full bg-black px-8 py-4 font-medium text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
          >
            Ver el proyecto
          </Link>

          <a
            href="https://www.linkedin.com/in/cristina-garcia-mijares/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-zinc-300 px-8 py-4 font-medium text-zinc-900 transition hover:-translate-y-0.5 hover:border-black"
          >
            Ver LinkedIn
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}