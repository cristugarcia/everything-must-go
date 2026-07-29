import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import { SITE } from "@/lib/site";

import ShareCatalogButton from "@/components/ShareCatalogButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type SiteHeaderProps = {
  locale: Locale;

  dictionary: {
    navigation: {
      catalog: string;
      project: string;
      about: string;
      homeAria: string;
    };
  };

  currentPage?:
    | "catalogo"
    | "proyecto"
    | "sobre-mi";
};

export default function SiteHeader({
  locale,
  dictionary,
  currentPage,
}: SiteHeaderProps) {
  const navigation = [
    {
      label: dictionary.navigation.catalog,
      mobileLabel:
        dictionary.navigation.catalog,
      href: `/${locale}`,
      page: "catalogo",
    },
    {
      label: dictionary.navigation.project,
      mobileLabel:
        dictionary.navigation.project,
      href: `/${locale}/proyecto`,
      page: "proyecto",
    },
    {
      label: dictionary.navigation.about,
      mobileLabel:
        dictionary.navigation.about,
      href: `/${locale}/sobre-mi`,
      page: "sobre-mi",
    },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:px-8 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            aria-label={dictionary.navigation.homeAria}
            className="shrink-0 font-bold tracking-tight text-zinc-900 transition-opacity hover:opacity-70"
          >
            <span className="text-lg">
              {SITE.name}
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:hidden">
            <LanguageSwitcher locale={locale} />
            <ShareCatalogButton
              locale={locale}
            />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 sm:mt-0">
          <nav
            aria-label={
              locale === "es"
                ? "Navegación principal"
                : "Main navigation"
            }
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

          <div className="hidden items-center gap-2 sm:flex">
            <LanguageSwitcher locale={locale} />
            <ShareCatalogButton
              locale={locale}
            />
          </div>
        </div>
      </div>
    </header>
  );
}