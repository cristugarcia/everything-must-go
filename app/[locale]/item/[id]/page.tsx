import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import products from "@/data/catalog.json";
import ShareProductStoryButton from "@/components/ShareProductStoryButton";
import ProductGallery from "@/components/ProductGallery";
import RelatedProducts from "@/components/RelatedProducts";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StatusBadge from "@/components/StatusBadge";
import Button from "@/components/ui/Button";
import { buildTrackedUrl } from "@/lib/utm";

import {
  isLocale,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getProductPriceDisplay } from "@/lib/formatPrice";
import { SITE } from "@/lib/site";
import { getSellerWhatsApp } from "@/lib/sellers";
import { serializeStructuredData } from "@/lib/structuredData";
import { Product } from "@/lib/types";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale: localeParam, id } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const productList = products as Product[];
  const product = productList.find(
    (item) => item.id === id && item.publish
  );

  if (!product) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/${localeParam}/item/${product.id}`;
  const description =
    localeParam === "es" && product.publicDescription
      ? product.publicDescription
      : localeParam === "es"
        ? `${product.name} en ${product.condition.toLowerCase()} estado. Consulta disponibilidad en ${SITE.name}, ${SITE.city}.`
        : `${product.name} for sale in ${SITE.city}. Check price, condition, and availability on ${SITE.name}.`;
  const image = product.images?.[0];

  return {
    title: product.name,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        es: `/es/item/${product.id}`,
        en: `/en/item/${product.id}`,
        "x-default": `/es/item/${product.id}`,
      },
    },
    openGraph: {
      type: "website",
      locale:
        localeParam === "es" ? "es_AR" : "en_US",
      siteName: SITE.name,
      title: product.name,
      description,
      url: canonicalPath,
      images: image
        ? [
            {
              url: image,
              alt: product.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: Props) {
  const {
  locale: localeParam,
  id,
} = await params;

if (!isLocale(localeParam)) {
  notFound();
}

const locale: Locale = localeParam;

const dictionary =
  await getDictionary(locale);

  const productList = products as Product[];

  const product = productList.find(
    (item) => item.id === id && item.publish
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = productList
    .filter(
      (item) =>
        item.id !== product.id &&
        item.publish &&
        item.status.trim().toLowerCase() === "disponible"
    )
    .sort((a, b) => {
      const aCategoryPriority =
        a.category === product.category ? 0 : 1;
      const bCategoryPriority =
        b.category === product.category ? 0 : 1;

      return aCategoryPriority - bCategoryPriority;
    })
    .slice(0, 3);

  const normalizedStatus = product.status
    .trim()
    .toLowerCase();

  const isSold = normalizedStatus === "vendido";
  const isReserved = normalizedStatus === "reservado";

  const priceDisplay = getProductPriceDisplay(
  product.price,
  locale,
  {
    free: dictionary.product.free,
    priceOnRequest:
      dictionary.product.priceOnRequest,
  }
);

  const formattedPrice = priceDisplay.primary;

  const seller = product.seller ?? {
    id: "cristina",
    name: SITE.author.name,
  };

  const sellerWhatsapp = product.seller
    ? getSellerWhatsApp(product.seller.id)
    : SITE.whatsapp.number;

  const sellerFirstName =
    seller.name.split(/\s+/)[0] || seller.name;

  const sellerStructuredDataId = product.seller
    ? `${SITE.url}/#seller-${encodeURIComponent(
        seller.id
      )}`
    : `${SITE.url}/#person`;

  const productUrl =
  `${SITE.url}/${locale}/item/${product.id}`;

const productWhatsappUrl =
  buildTrackedUrl({
    url: productUrl,
    channel: "whatsapp",
    content: `product_${product.id}`,
  });

  const productDescription =
    locale === "es" && product.publicDescription
      ? product.publicDescription
      : locale === "es"
        ? `${product.name} en ${product.condition.toLowerCase()} estado. Consulta disponibilidad en ${SITE.city}.`
        : `${product.name} for sale in ${SITE.city}. Check condition and availability.`;

  const availability = isSold
    ? "https://schema.org/SoldOut"
    : isReserved
      ? "https://schema.org/LimitedAvailability"
      : "https://schema.org/InStock";

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    description: productDescription,
    image: product.images.map((image) =>
      new URL(image, SITE.url).toString()
    ),
    sku: product.sku || product.id,
    category: product.category,
    brand: product.brand
      ? {
          "@type": "Brand",
          name: product.brand,
        }
      : undefined,
    model: product.model || undefined,
    itemCondition: "https://schema.org/UsedCondition",
    offers:
      typeof product.price === "number" && product.price >= 0
        ? {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: "ARS",
            price: product.price,
            availability,
            seller: {
              "@type": "Person",
              "@id": sellerStructuredDataId,
              name: seller.name,
            },
          }
        : undefined,
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "es" ? "Catálogo" : "Catalog",
        item: `${SITE.url}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  const whatsappMessage =
    locale === "es"
      ? isReserved
        ? `Hola ${sellerFirstName} 👋

Vi que el producto "${product.name}" está reservado.

¿Podrías avisarme si vuelve a estar disponible?

Precio publicado: ${formattedPrice}

${productWhatsappUrl}`
        : `Hola ${sellerFirstName} 👋

Me interesa el producto "${product.name}" publicado en ${SITE.name}.

Precio: ${formattedPrice}

¿Sigue disponible? ¿Cómo coordinamos el retiro?

${productWhatsappUrl}`
      : isReserved
        ? `Hi ${sellerFirstName} 👋

I saw that "${product.name}" is currently reserved.

Could you let me know if it becomes available again?

Listed price: ${formattedPrice}

${productWhatsappUrl}`
        : `Hi ${sellerFirstName} 👋

I'm interested in "${product.name}" listed on ${SITE.name}.

Price: ${formattedPrice}

Is it still available? How can we arrange pickup?

${productWhatsappUrl}`;

  const whatsappUrl = `https://wa.me/${
    sellerWhatsapp
  }?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(productStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(breadcrumbStructuredData),
        }}
      />
      <SiteHeader
        locale={locale}
        dictionary={dictionary}
        currentPage="catalogo"
      />

      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-8 sm:py-12">
        <Link
  href={`/${locale}#productos`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-950"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          >
            ←
          </span>

          {dictionary.actions.backToCatalog}
        </Link>

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* Galería */}
          <div className="lg:sticky lg:top-24">
            <ProductGallery
              images={product.images}
              name={product.name}
            />
          </div>

          {/* Información */}
          <section>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
                {dictionary.productCatalog.categories[
  product.category as keyof typeof dictionary.productCatalog.categories
] ?? product.category}
                {product.subcategory
                  ? ` · ${product.subcategory}`
                  : ""}
              </p>

              <StatusBadge
  status={product.status}
  labels={dictionary.status}
/>
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-[-0.035em] text-zinc-950 sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            <div className="mt-7">
              <p className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
                {priceDisplay.primary}
              </p>

              {priceDisplay.secondary && (
                <p className="mt-2 text-base font-medium text-zinc-500 sm:text-lg">
                  {priceDisplay.secondary}
                </p>
              )}
            </div>

            {isReserved && (
              <p className="mt-4 max-w-xl leading-7 text-amber-700">
                {dictionary.product.messages.reserved}
              </p>
            )}

            {/* CTA */}
            <div className="mt-8">
            {isSold ? (
                <div className="space-y-4 rounded-3xl border border-red-200 bg-red-50 px-6 py-5 text-center">
                  <p className="font-medium text-red-700">
                    {dictionary.product.messages.sold}
                  </p>
                  <Button
                    href="#alternativas"
                    variant="secondary"
                    size="md"
                  >
                    {dictionary.actions.viewAlternatives}
                  </Button>
                </div>
              ) : (
                <Button
                  href={whatsappUrl}
                  external
                  variant="whatsapp"
                  size="lg"
                  fullWidth
                >
                  {isReserved
                    ? dictionary.actions.reserved
                    : dictionary.actions.whatsapp}
                </Button>
              )}

              {!isSold && (
                <p className="mt-3 text-center text-sm text-zinc-500">
                  {dictionary.product.sellerContact.replace(
                    "{seller}",
                    seller.name
                  )}
                </p>
              )}

  <ShareProductStoryButton
  productId={product.id}
  name={product.name}
  formattedPrice={formattedPrice}
  status={product.status}
  productUrl={productUrl}
  dictionary={dictionary.shareStory}
/>
</div>

{!isSold && (
  <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-zinc-600 sm:grid-cols-3">
    <div className="rounded-2xl bg-zinc-50 px-4 py-4">
      <p className="font-semibold text-zinc-900">
        {dictionary.product.infoCards.contactTitle}
      </p>

      <p className="mt-1 leading-5">
        {dictionary.product.infoCards.contactDescription}
      </p>
    </div>

    <div className="rounded-2xl bg-zinc-50 px-4 py-4">
      <p className="font-semibold text-zinc-900">
        {dictionary.product.infoCards.availabilityTitle}
      </p>

      <p className="mt-1 leading-5">
        {dictionary.product.infoCards.availabilityDescription}
      </p>
    </div>

    <div className="rounded-2xl bg-zinc-50 px-4 py-4">
      <p className="font-semibold text-zinc-900">
        {dictionary.product.infoCards.locationTitle}
      </p>

      <p className="mt-1 leading-5">
        {dictionary.product.infoCards.locationDescription}
      </p>
    </div>
  </div>
)}
            {/* Detalles */}
            <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-white">
              <div className="border-b border-zinc-200 bg-zinc-50 px-6 py-4">
                <h2 className="font-semibold text-zinc-950">
                  {dictionary.product.details}
                </h2>
              </div>

              <dl className="divide-y divide-zinc-100 px-6">
                {product.brand && (
                  <div className="flex justify-between gap-6 py-4">
                    <dt className="text-zinc-500">
                      {dictionary.product.brand}
                    </dt>

                    <dd className="text-right font-medium text-zinc-950">
                      {product.brand}
                    </dd>
                  </div>
                )}

                {product.model && (
                  <div className="flex justify-between gap-6 py-4">
                    <dt className="text-zinc-500">
                      {dictionary.product.model}
                    </dt>

                    <dd className="text-right font-medium text-zinc-950">
                      {product.model}
                    </dd>
                  </div>
                )}

                <div className="flex justify-between gap-6 py-4">
                  <dt className="text-zinc-500">
                    {dictionary.product.condition}
                  </dt>

                  <dd className="text-right font-medium text-zinc-950">
                    {product.condition}
                  </dd>
                </div>

                <div className="flex justify-between gap-6 py-4">
                  <dt className="text-zinc-500">
                    {dictionary.product.quantity}
                  </dt>

                  <dd className="text-right font-medium text-zinc-950">
                    {product.quantity}
                  </dd>
                </div>

                {product.purchaseYear && (
                  <div className="flex justify-between gap-6 py-4">
                    <dt className="text-zinc-500">
                      {dictionary.product.purchaseYear}
                    </dt>

                    <dd className="text-right font-medium text-zinc-950">
                      {product.purchaseYear}
                    </dd>
                  </div>
                )}

                {product.location && (
                  <div className="flex justify-between gap-6 py-4">
                    <dt className="text-zinc-500">
                      {dictionary.product.location}
                    </dt>

                    <dd className="text-right font-medium text-zinc-950">
                      {product.location}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Descripción */}
            {product.publicDescription && (
              <div className="mt-10 border-t border-zinc-200 pt-10">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
                  {dictionary.product.description}
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-950">
                  {dictionary.product.aboutProduct}
                </h2>

                <p className="mt-4 whitespace-pre-line text-lg leading-8 text-zinc-600">
                  {product.publicDescription}
                </p>
              </div>
            )}
          </section>
        </div>

        <div
          id="alternativas"
          className="scroll-mt-24"
        >
          <RelatedProducts
          products={relatedProducts}
          locale={locale}
          dictionary={{
            eyebrow: dictionary.relatedProducts.eyebrow,
            title: dictionary.relatedProducts.title,
            ...dictionary.productCard,
            priceOnRequest: dictionary.product.priceOnRequest,
            free: dictionary.product.free,
            status: dictionary.status,
          }}
          categories={dictionary.productCatalog.categories}
        />
        </div>
      </div>

      <SiteFooter locale={locale} variant="catalogo" />
    </main>
  );
}
