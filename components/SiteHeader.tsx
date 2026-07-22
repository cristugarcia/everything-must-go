import Link from "next/link";
import { SITE } from "@/lib/site";

type SiteHeaderProps = {
  currentPage?: "catalogo" | "proyecto" | "sobre-mi";
};

const navigation = [
  {
    label: "Catálogo",
    href: "/",
    page: "catalogo",
  },
  {
    label: "El proyecto",
    href: "/proyecto",
    page: "proyecto",
  },
  {
    label: "Sobre mí",
    href: "/sobre-mi",
    page: "sobre-mi",
  },
] as const;

export default function SiteHeader({
  currentPage,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">
        <Link
          href="/"
          className="min-w-0 whitespace-nowrap text-sm font-bold tracking-tight text-zinc-900 sm:text-lg"
        >
          {SITE.name}
        </Link>

        <nav
          aria-label="Navegación principal"
          className="flex min-w-0 items-center justify-end gap-1 sm:gap-5"
        >
          {navigation.map((item) => {
            const isActive = currentPage === item.page;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-2.5 py-2 text-xs font-medium transition sm:px-4 sm:text-sm ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}