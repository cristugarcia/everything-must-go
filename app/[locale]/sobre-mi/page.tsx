import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import {
  isLocale,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const locale: Locale = localeParam;
  const dictionary = await getDictionary(locale);
  const metadata = dictionary.aboutPage.metadata;

  const socialImage =
    locale === "es"
      ? "/brand/emg-share-es.png"
      : "/brand/emg-share-en.png";

  const socialImageAlt =
    locale === "es"
      ? "Everything Must Go — catálogo, producto digital y portfolio"
      : "Everything Must Go — catalog, digital product and portfolio";

  return {
    title: metadata.title,
    description: metadata.description,

    alternates: {
      canonical: `/${locale}/sobre-mi`,
      languages: {
        es: "/es/sobre-mi",
        en: "/en/sobre-mi",
      },
    },

    openGraph: {
      type: "website",
      siteName: "Everything Must Go",
      locale: locale === "es" ? "es_AR" : "en_US",
      title: metadata.openGraphTitle,
      description: metadata.openGraphDescription,
      url: `/${locale}/sobre-mi`,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: metadata.openGraphTitle,
      description: metadata.openGraphDescription,
      images: [socialImage],
    },
  };
}

export default async function AboutPage({
  params,
}: Props) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = await getDictionary(locale);
  const about = dictionary.aboutPage;

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <SiteHeader
        locale={locale}
        dictionary={dictionary}
        currentPage="sobre-mi"
      />

      {/* Hero */}
<section className="overflow-hidden border-b border-zinc-100 bg-zinc-50">
  <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-28">
    {/* Texto */}
    <div>
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-400">
        {about.hero.eyebrow}
      </p>

      <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
        {about.hero.title}
      </h1>

      <p className="mt-8 max-w-3xl text-xl leading-9 text-zinc-600">
        {about.hero.description}
      </p>
    </div>

    {/* Foto Cristina + Kala */}
    <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[2.25rem] border border-[#b5a082]/30"
      />

      <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-zinc-200 bg-zinc-200 shadow-[0_24px_70px_-35px_rgba(0,0,0,0.35)]">
        <Image
          src="/images/about/cristina-kala-original.jpg"
          alt={about.hero.imageAlt}
          fill
          priority
          quality={90}
          sizes="(max-width: 1024px) 100vw, 420px"
          className="object-cover object-center"
        />
      </div>
    </div>
  </div>
</section>

      {/* Historia */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            {about.story.eyebrow}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            {about.story.title}
          </h2>
        </div>

        <div className="space-y-6 text-lg leading-8 text-zinc-600">
          {about.story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Áreas profesionales */}
      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            {about.professionalProfile.eyebrow}
          </p>

          <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight">
            {about.professionalProfile.title}
          </h2>

          <div className="mt-10 flex flex-wrap gap-3">
            {about.professionalProfile.areas.map(
              (area) => (
                <span
                  key={area}
                  className="rounded-full border border-zinc-200 bg-white px-5 py-3 font-medium text-zinc-700"
                >
                  {area}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Experiencia */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
          {about.experience.eyebrow}
        </p>

        <h2 className="mt-3 text-4xl font-bold tracking-tight">
          {about.experience.title}
        </h2>

        <div className="mt-12 grid gap-5">
          {about.experience.items.map((item) => (
            <article
              key={`${item.company}-${item.role}`}
              className="grid gap-5 rounded-3xl border border-zinc-200 p-7 sm:p-9 lg:grid-cols-[0.7fr_1.3fr]"
            >
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.15em] text-zinc-400">
                  {item.company}
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {item.role}
                </h3>
              </div>

              <p className="text-lg leading-8 text-zinc-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Herramientas */}
      <section className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            {about.tools.eyebrow}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            {about.tools.title}
          </h2>

          <div className="mt-10 flex flex-wrap gap-3">
            {about.tools.items.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-zinc-700 px-5 py-3 font-medium text-zinc-200"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
          {about.contact.eyebrow}
        </p>

        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          {about.contact.title}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-500">
          {about.contact.description}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/proyecto`}
            className="rounded-full bg-black px-8 py-4 font-medium text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
          >
            {about.contact.projectButton}
          </Link>

          <a
            href="https://www.linkedin.com/in/cristina-garcia-mijares/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-zinc-300 px-8 py-4 font-medium text-zinc-900 transition hover:-translate-y-0.5 hover:border-black"
          >
            {about.contact.linkedinButton}
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}