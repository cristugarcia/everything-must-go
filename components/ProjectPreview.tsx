import Link from "next/link";
import Button from "@/components/ui/Button";

const technologies = [
  "Next.js",
  "TypeScript",
  "Google Sheets",
  "Vercel",
];

type Props = {
  locale: string;
  dictionary: {
    eyebrow: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    projectButton: string;
    aboutButton: string;
  };
};

export default function ProjectPreview({
  locale,
  dictionary,
}: Props) {
  return (
    <section className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-600">
                {dictionary.eyebrow}
              </p>

              <h2 className="mt-3 max-w-xl text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
                {dictionary.title}
              </h2>
            </div>

            <div>
              <div className="space-y-5 text-lg leading-8 text-zinc-600">
                <p>
                  {dictionary.paragraph1}
                </p>

                <p>
                  {dictionary.paragraph2}
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
                <Button href={`/${locale}/proyecto`} size="lg">
                  {dictionary.projectButton}
                </Button>

                <Link
                  href={`/${locale}/sobre-mi`}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition hover:text-zinc-950"
                >
                  {dictionary.aboutButton}

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
      </div>
    </section>
  );
}
