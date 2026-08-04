import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import { SITE } from "@/lib/site";

type SiteFooterProps = {
  locale: Locale;
  variant?: "catalogo" | "portfolio";
};

export default function SiteFooter({
  locale,
  variant = "portfolio",
}: SiteFooterProps) {
  const whatsappMessage =
    locale === "es"
      ? "Hola Cristina 👋 Vi tu catálogo de Everything Must Go y quería hacerte una consulta."
      : "Hi Cristina 👋 I saw your Everything Must Go catalog and would like to ask you a question.";

  const whatsappUrl = `https://wa.me/${
    SITE.whatsapp.number
  }?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <footer className="bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-2xl font-bold tracking-tight">
              {SITE.name}
            </p>

            <p className="mt-3 max-w-md leading-7 text-zinc-400">
              {variant === "catalogo"
                ? locale === "es"
                  ? "Artículos en excelente estado buscando un nuevo hogar en Buenos Aires."
                  : "Items in excellent condition looking for a new home in Buenos Aires."
                : locale === "es"
                  ? "Un proyecto real que combina tecnología, organización y resolución práctica de problemas."
                  : "A real project combining technology, organization, and practical problem-solving."}
            </p>

            <p className="mt-5 text-sm text-zinc-500">
              © 2026 {SITE.author.name}
            </p>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <nav
              aria-label={
                locale === "es"
                  ? "Navegación del pie de página"
                  : "Footer navigation"
              }
              className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-zinc-400"
            >
              <Link
                href={`/${locale}`}
                className="transition hover:text-white"
              >
                {locale === "es" ? "Catálogo" : "Catalog"}
              </Link>

              <Link
                href={`/${locale}/proyecto`}
                className="transition hover:text-white"
              >
                {locale === "es" ? "El proyecto" : "The project"}
              </Link>

              <Link
                href={`/${locale}/sobre-mi`}
                className="transition hover:text-white"
              >
                {locale === "es" ? "Sobre mí" : "About me"}
              </Link>
            </nav>

            {variant === "catalogo" && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center justify-center rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
              >
                {locale === "es"
                  ? "Escribir por WhatsApp"
                  : "Message on WhatsApp"}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
