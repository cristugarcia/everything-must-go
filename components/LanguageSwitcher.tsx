"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
};

const languages = [
  {
    locale: "es",
    label: "ES",
    flag: "🇪🇸",
    ariaLabel: "Cambiar idioma a español",
  },
  {
    locale: "en",
    label: "EN",
    flag: "🇺🇸",
    ariaLabel: "Switch language to English",
  },
] as const;

export default function LanguageSwitcher({
  locale,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  function getLocalizedPath(nextLocale: Locale) {
    const segments = pathname.split("/");

    if (
      segments[1] === "es" ||
      segments[1] === "en"
    ) {
      segments[1] = nextLocale;
      return segments.join("/") || `/${nextLocale}`;
    }

    return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
  }

  function rememberLanguage(nextLocale: Locale) {
    document.cookie = `preferred-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <div
      className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-zinc-50 p-1"
      aria-label={
        locale === "es"
          ? "Selector de idioma"
          : "Language selector"
      }
    >
      {languages.map((language) => {
        const isActive =
          language.locale === locale;

        return (
          <Link
            key={language.locale}
            href={getLocalizedPath(language.locale)}
            hrefLang={language.locale}
            aria-label={language.ariaLabel}
            aria-current={
              isActive ? "true" : undefined
            }
            onClick={() =>
              rememberLanguage(language.locale)
            }
            className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 ${
              isActive
                ? "bg-zinc-900 text-white shadow-sm"
                : "text-zinc-500 hover:bg-white hover:text-zinc-900"
            }`}
          >
            <span aria-hidden="true">
              {language.flag}
            </span>

            <span>{language.label}</span>
          </Link>
        );
      })}
    </div>
  );
}