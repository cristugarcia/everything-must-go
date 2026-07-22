import Link from "next/link";
import { SITE } from "@/lib/site";

type SiteFooterProps = {
  variant?: "catalogo" | "portfolio";
};

export default function SiteFooter({
  variant = "portfolio",
}: SiteFooterProps) {
  const whatsappUrl = `https://wa.me/${
  SITE.whatsapp.number
}?text=${encodeURIComponent(SITE.whatsapp.message)}`;

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
                ? "Artículos en excelente estado buscando un nuevo hogar en Buenos Aires."
                : "Un proyecto real que combina tecnología, organización y resolución práctica de problemas."}
            </p>

            <p className="mt-5 text-sm text-zinc-500">
              © 2026 {SITE.author.name}
            </p>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <nav
              aria-label="Navegación del pie de página"
              className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-zinc-400"
            >
              <Link
                href="/"
                className="transition hover:text-white"
              >
                Catálogo
              </Link>

              <Link
                href="/proyecto"
                className="transition hover:text-white"
              >
                El proyecto
              </Link>

              <Link
                href="/sobre-mi"
                className="transition hover:text-white"
              >
                Sobre mí
              </Link>
            </nav>

            {variant === "catalogo" && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center justify-center rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
              >
                Escribir por WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}