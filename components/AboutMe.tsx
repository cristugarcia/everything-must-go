import Link from "next/link";

const skills = [
  "Finanzas",
  "Operaciones",
  "Automatización",
  "Next.js",
  "TypeScript",
  "Power BI",
  "Python",
  "Alteryx",
];

export default function AboutMe() {
  return (
    <section
      id="sobre-mi"
      className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[0.85fr_1.5fr]">
          {/* Presentación visual */}
          <div className="flex flex-col justify-between bg-slate-900 p-8 text-white sm:p-10">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                Sobre mí
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Cristina García Mijares
              </h2>

              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                Finanzas, operaciones, automatización y desarrollo web.
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm leading-relaxed text-slate-300">
                Nací en Venezuela y Argentina se convirtió en mi segundo hogar,
                un país que me adoptó y que forma parte esencial de mi historia
                personal y profesional.
              </p>
            </div>
          </div>

          {/* Bio profesional */}
          <div className="p-8 sm:p-10">
            <div className="space-y-5 text-base leading-7 text-slate-600">
              <p>
                Soy profesional de finanzas y operaciones con experiencia en
                empresas internacionales como JPMorgan Chase y PwC.
              </p>

              <p>
                A lo largo de mi carrera he trabajado en análisis financiero,
                conciliaciones, reporting, auditoría, automatización de
                procesos y coordinación de equipos. Mi interés por la
                tecnología me llevó a formarme también en desarrollo web y a
                utilizar herramientas como Python, Power BI, Alteryx y UiPath
                para transformar procesos manuales en soluciones más rápidas y
                eficientes.
              </p>

              <p>
                <strong className="font-semibold text-slate-900">
                  Everything Must Go
                </strong>{" "}
                nació como una solución real para organizar y vender mis
                pertenencias antes de una mudanza internacional junto a Kala,
                mi compañera de cuatro patas. Diseñé y desarrollé esta
                plataforma desde cero, combinando Next.js, TypeScript, Google
                Sheets y Vercel para crear un catálogo dinámico, fácil de
                actualizar y adaptado a dispositivos móviles.
              </p>

              <p>
                Este proyecto refleja la combinación que más me representa:
                análisis, organización, tecnología y resolución práctica de
                problemas, sin perder el lado humano detrás de cada nuevo
                comienzo.
              </p>
            </div>

            {/* Habilidades */}
            <div className="mt-8 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Enlaces profesionales */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/proyecto"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Conoce cómo construí este proyecto
              </Link>

              <a
                href="https://www.linkedin.com/in/TU-USUARIO"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Ver LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}