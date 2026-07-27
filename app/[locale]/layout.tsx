import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  isLocale,
  locales,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { SITE } from "@/lib/site";

type Props = {
  children: React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary =
    await getDictionary(locale);

  const canonicalPath = `/${locale}`;

  return {
    metadataBase: new URL(SITE.url),

    title: {
      default: `${SITE.name} | ${dictionary.metadata.title}`,
      template: `%s | ${SITE.name}`,
    },

    description:
      dictionary.metadata.description,

    applicationName: SITE.name,

    authors: [
      {
        name: SITE.author.name,
      },
    ],

    creator: SITE.author.name,

    alternates: {
      canonical: canonicalPath,

      languages: {
        es: "/es",
        en: "/en",
      },
    },

    openGraph: {
      type: "website",
      locale:
        locale === "es"
          ? "es_AR"
          : "en_US",
      url: canonicalPath,
      siteName: SITE.name,
      title: `${SITE.name} | ${dictionary.metadata.title}`,
      description:
        dictionary.metadata
          .openGraphDescription,
    },

    twitter: {
      card: "summary_large_image",
      title: `${SITE.name} | ${dictionary.metadata.title}`,
      description:
        dictionary.metadata
          .openGraphDescription,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return children;
}