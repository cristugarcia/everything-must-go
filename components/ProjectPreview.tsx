import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";

const technologies = [
  "Next.js",
  "TypeScript",
  "Google Sheets",
  "Vercel",
];

export default function ProjectPreview() {
  return (
    <section className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:py-28">
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
                Detrás del proyecto
              </p>

              <h2 className="mt-3 max-w-xl text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
                Más que una venta por mudanza.
              </h2>
            </div>

            <div>
              <div className="space-y-5 text-lg leading-8 text-zinc-600">
                <p>
                  Everything Must Go nació como una forma de organizar la venta
                  de todas mis pertenencias antes de una mudanza internacional.
                </p>

                <p>
                  Lo que comenzó como una necesidad personal terminó
                  convirtiéndose en un proyecto donde combiné desarrollo web,
                  automatización y diseño para construir un catálogo dinámico,
                  fácil de administrar y pensado para resolver un problema real.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-zinc-500">
                {technologies.map((technology, index) => (
                  <span key={technology} className="inline-flex items-center">
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="mr-4 text-zinc-300"
                      >
                        •
                      </span>
                    )}

                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Button href="/proyecto" size="lg">
                  Conocer el caso de estudio
                </Button>

                <Link
                  href="/sobre-mi"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition hover:text-zinc-950"
                >
                  Conoce un poco más sobre mí

                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}