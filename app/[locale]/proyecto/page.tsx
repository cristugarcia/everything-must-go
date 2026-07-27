import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import products from "@/data/catalog.json";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import {
  isLocale,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";

import type { Product } from "@/lib/types";

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
  const metadata = dictionary.projectPage.metadata;

  return {
    title: metadata.title,
    description: metadata.description,

    alternates: {
      canonical: `/${locale}/proyecto`,
      languages: {
        es: "/es/proyecto",
        en: "/en/proyecto",
      },
    },

    openGraph: {
      title: metadata.openGraphTitle,
      description: metadata.openGraphDescription,
      url: `/${locale}/proyecto`,
    },
  };
}

export default async function ProjectPage({
  params,
}: Props) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = await getDictionary(locale);
  const project = dictionary.projectPage;

  const productList = products as Product[];

  const publishedProducts = productList.filter(
    (product) => product.publish
  );

  const categories = new Set(
    publishedProducts
      .map((product) => product.category)
      .filter(Boolean)
  ).size;

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <SiteHeader
        locale={locale}
        dictionary={dictionary}
        currentPage="proyecto"
      />

      {/* Hero */}
      <section className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:py-32">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-400">
            {project.hero.eyebrow}
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {project.hero.title}
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-zinc-600">
            {project.hero.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {project.technologies.items
              .slice(0, 5)
              .map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700"
                >
                  {technology}
                </span>
              ))}
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-3xl font-bold">
                {publishedProducts.length}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {project.hero.stats.publishedProducts}
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-3xl font-bold">
                {categories}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {project.hero.stats.categories}
              </p>
            </div>

            <div className="col-span-2 rounded-2xl border border-zinc-200 bg-white p-5 sm:col-span-1">
              <p className="text-3xl font-bold">
                100%
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {project.hero.stats.responsive}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problema */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            {project.problem.eyebrow}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            {project.problem.title}
          </h2>
        </div>

        <div className="space-y-6 text-lg leading-8 text-zinc-600">
          {project.problem.paragraphs.map(
            (paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            )
          )}
        </div>
      </section>

      {/* Solución */}
      <section className="bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
              {project.solution.eyebrow}
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              {project.solution.title}
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-zinc-300">
            {project.solution.paragraphs.map(
              (paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              )
            )}
          </div>
        </div>
      </section>

      {/* Arquitectura */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
          {project.architecture.eyebrow}
        </p>

        <h2 className="mt-3 text-4xl font-bold tracking-tight">
          {project.architecture.title}
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {project.architecture.steps.map((step) => (
            <article
              key={step.number}
              className="rounded-3xl border border-zinc-200 p-7"
            >
              <p className="text-sm font-bold text-zinc-400">
                {step.number}
              </p>

              <h3 className="mt-6 text-xl font-bold">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-zinc-500">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-zinc-100 p-8 sm:p-10">
          <div className="flex flex-col items-center justify-center gap-4 text-center font-mono text-sm font-medium text-zinc-700 sm:flex-row sm:text-base">
            {project.architecture.flow.map(
              (item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="contents"
                >
                  <span>{item}</span>

                  {index <
                    project.architecture.flow.length -
                      1 && (
                    <span aria-hidden="true">
                      →
                    </span>
                  )}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            {project.features.eyebrow}
          </p>

          <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight">
            {project.features.title}
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {project.features.items.map(
              (feature) => (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-zinc-200 bg-white p-7"
                >
                  <h3 className="text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-zinc-500">
                    {feature.description}
                  </p>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* Aprendizajes */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-8 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            {project.learnings.eyebrow}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            {project.learnings.title}
          </h2>
        </div>

        <div className="space-y-4">
          {project.learnings.items.map(
            (learning) => (
              <div
                key={learning}
                className="flex gap-4 rounded-2xl border border-zinc-200 p-5"
              >
                <span className="font-bold text-zinc-400">
                  ✓
                </span>

                <p className="leading-7 text-zinc-600">
                  {learning}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Tecnologías */}
      <section className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            {project.technologies.eyebrow}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            {project.technologies.title}
          </h2>

          <div className="mt-10 flex flex-wrap gap-3">
            {project.technologies.items.map(
              (technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-zinc-700 px-5 py-3 font-medium text-zinc-200"
                >
                  {technology}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center sm:px-8">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {project.cta.title}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-500">
          {project.cta.description}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}#productos`}
            className="rounded-full bg-black px-8 py-4 font-medium text-white transition hover:bg-zinc-800"
          >
            {project.cta.catalogButton}
          </Link>

          <Link
            href={`/${locale}`}
            className="rounded-full border border-zinc-300 px-8 py-4 font-medium transition hover:border-black"
          >
            {project.cta.homeButton}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}