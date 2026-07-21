import Link from "next/link";

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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-zinc-900"
        >
          Everything Must Go
        </Link>

        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-2 sm:gap-5"
        >
          {navigation.map((item) => {
            const isActive = currentPage === item.page;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-medium transition sm:px-4 ${
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