import Link from "next/link";
import { SITE } from "@/lib/site";
import ShareCatalogButton from "@/components/ShareCatalogButton";

type SiteHeaderProps = {
  currentPage?:
    | "catalogo"
    | "proyecto"
    | "sobre-mi";
};

const navigation = [
  {
    label: "Catálogo",
    mobileLabel: "Catálogo",
    href: "/",
    page: "catalogo",
  },
  {
    label: "El proyecto",
    mobileLabel: "Proyecto",
    href: "/proyecto",
    page: "proyecto",
  },
  {
    label: "Sobre mí",
    mobileLabel: "Sobre mí",
    href: "/sobre-mi",
    page: "sobre-mi",
  },
] as const;

export default function SiteHeader({
  currentPage,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:px-8 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label={`${SITE.name}, ir al catálogo`}
            className="shrink-0 font-bold tracking-tight text-zinc-900"
          >
            <span className="text-lg sm:hidden">
              Everithing must Go
            </span>

            <span className="hidden text-lg sm:inline">
              {SITE.name}
            </span>
          </Link>

          <div className="sm:hidden">
            <ShareCatalogButton />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 sm:mt-0">
          <nav
            aria-label="Navegación principal"
            className="grid min-w-0 flex-1 grid-cols-3 gap-1 sm:flex sm:items-center sm:justify-end sm:gap-2"
          >
            {navigation.map((item) => {
              const isActive =
                currentPage === item.page;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                  className={`whitespace-nowrap rounded-full px-2 py-2.5 text-center text-xs font-medium transition sm:px-4 sm:py-2 sm:text-sm ${
                    isActive
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-black"
                  }`}
                >
                  <span className="sm:hidden">
                    {item.mobileLabel}
                  </span>

                  <span className="hidden sm:inline">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden sm:block">
            <ShareCatalogButton />
          </div>
        </div>
      </div>
    </header>
  );
}