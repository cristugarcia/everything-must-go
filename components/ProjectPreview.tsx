import Link from "next/link";

const highlights = [
  "Next.js y TypeScript",
  "Inventario desde Google Sheets",
  "Filtros y búsqueda",
  "Integración con WhatsApp",
];

export default function ProjectPreview() {
  return (
    <section className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-24">
        <div className="grid items-center gap-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10 lg:grid-cols-[1.25fr_0.75fr] lg:p-14">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
              Detrás del proyecto
            </p>

            <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Esta tienda también es un proyecto de tecnología y resolución de
              problemas.
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-500">
              Everything Must Go nació como una solución real para organizar y
              vender mis pertenencias antes de una mudanza internacional. En el
              caso de estudio cuento cómo diseñé, desarrollé y publiqué la
              plataforma.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <Link
              href="/proyecto"
              className="inline-flex w-full items-center justify-center rounded-full bg-black px-7 py-4 font-medium text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 sm:w-auto"
            >
              Conocer el proyecto
            </Link>

            <Link
              href="/sobre-mi"
              className="inline-flex w-full items-center justify-center rounded-full border border-zinc-300 bg-white px-7 py-4 font-medium text-zinc-900 transition hover:-translate-y-0.5 hover:border-black sm:w-auto"
            >
              Sobre mí
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}