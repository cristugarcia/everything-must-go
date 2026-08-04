import type { Metadata } from "next";
import { notFound } from "next/navigation";

import products from "@/data/catalog.json";

import ProductCatalog from "@/components/ProductCatalog";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ProjectPreview from "@/components/ProjectPreview";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";

import {
  isLocale,
  type Locale,
} from "@/lib/i18n/config";

import { getDictionary } from "@/lib/i18n/getDictionary";
import { SITE } from "@/lib/site";
import { Product } from "@/lib/types";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale: localeParam } =
    await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const locale: Locale = localeParam;

  const dictionary =
    await getDictionary(locale);

  const title =
    locale === "es"
      ? "Venta por mudanza | Everything Must Go"
      : "Moving Sale | Everything Must Go";

  const description =
    dictionary.home.introduction;

  const socialImage =
    locale === "es"
      ? `${SITE.url}/brand/emg-share-es.png`
      : `${SITE.url}/brand/emg-share-en.png`;

  const pageUrl =
    `${SITE.url}/${locale}`;

  return {
    title,
    description,

    alternates: {
      canonical: pageUrl,

      languages: {
        es: `${SITE.url}/es`,
        en: `${SITE.url}/en`,
        "x-default": `${SITE.url}/es`,
      },
    },

    openGraph: {
      type: "website",
      siteName: SITE.name,

      locale:
        locale === "es"
          ? "es_AR"
          : "en_US",

      title,
      description,
      url: pageUrl,

      images: [
        {
          url: socialImage,
          width: 1280,
          height: 1520,

          alt:
            locale === "es"
              ? "Everything Must Go — catálogo de productos disponibles por mudanza"
              : "Everything Must Go — catalog of products available due to relocation",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default async function Home({
  params,
}: Props) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  const dictionary =
    await getDictionary(locale);

  const productList = products as Product[];

  const publishedProducts = productList.filter(
    (product) => product.publish
  );

  const availableProducts =
    publishedProducts.filter(
      (product) =>
        product.status
          .trim()
          .toLowerCase() === "disponible"
    ).length;

  const categories = new Set(
    publishedProducts
      .map((product) => product.category)
      .filter(Boolean)
  ).size;

  const whatsappUrl = `https://wa.me/${
    SITE.whatsapp.number
  }?text=${encodeURIComponent(
    dictionary.home.whatsappMessage
  )}`;

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader
  locale={locale}
  dictionary={dictionary}
  currentPage="catalogo"
/>

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-zinc-100 bg-white">
        {/* Fondo decorativo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-zinc-100/80 blur-3xl" />

          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/70 to-white" />
        </div>

        {/* Contenido del hero */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-65px)] max-w-6xl flex-col items-center justify-center px-6 py-16 text-center sm:px-8 sm:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-600 sm:text-sm sm:tracking-[0.3em]">
            {dictionary.home.eyebrow} ·{" "}
            {dictionary.site.city}
          </p>

          <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-[-0.04em] text-zinc-950 sm:text-6xl lg:text-7xl">
            {SITE.name}
          </h1>

          <p className="mt-6 max-w-3xl text-2xl font-medium leading-tight tracking-tight text-zinc-700 sm:text-3xl sm:leading-tight">
            {dictionary.site.slogan}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg sm:leading-8">
            {dictionary.home.introduction}
          </p>

          <div className="mt-9 flex w-full max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
            <Button
              href={`/${locale}#productos`}
              size="lg"
              fullWidth
              className="sm:w-fit"
            >
              {dictionary.home.exploreCatalog}
            </Button>

            <Button
              href={whatsappUrl}
              external
              variant="secondary"
              size="lg"
              fullWidth
              className="sm:w-fit"
            >
              {dictionary.home.contactWhatsapp}
            </Button>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm backdrop-blur">
            <span aria-hidden="true">⏳</span>

            <span>
              {dictionary.site.deadlineLabel}{" "}
              {dictionary.site.deadline}
            </span>
          </div>

          <div className="mt-10 grid w-full max-w-3xl grid-cols-3 gap-2 sm:mt-12 sm:gap-4">
            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 px-2 py-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-6">
              <p className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                {publishedProducts.length}
              </p>

              <p className="mt-2 text-xs leading-4 text-zinc-500 sm:text-sm">
                {dictionary.home.stats.published}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 px-2 py-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-6">
              <p className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                {availableProducts}
              </p>

              <p className="mt-2 text-xs leading-4 text-zinc-500 sm:text-sm">
                {dictionary.home.stats.available}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-white/80 px-2 py-5 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-6">
              <p className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                {categories}
              </p>

              <p className="mt-2 text-xs leading-4 text-zinc-500 sm:text-sm">
                {dictionary.home.stats.categories}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <Section
        id="productos"
        eyebrow={
          dictionary.home.catalog.eyebrow
        }
        title={dictionary.home.catalog.title}
        description={
          dictionary.home.catalog.description
        }
        className="scroll-mt-8"
      >
        <ProductCatalog
        products={publishedProducts}
        locale={locale}
        dictionary={dictionary}
        />
      </Section>

      {/* Proyecto */}
      <ProjectPreview
        locale={locale}
        dictionary={dictionary.projectPreview}
        />

      {/* Footer */}
      <SiteFooter locale={locale} variant="catalogo" />

      <FloatingWhatsApp />
    </main>
  );
}
