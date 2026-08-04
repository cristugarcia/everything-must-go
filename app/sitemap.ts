import type { MetadataRoute } from "next";

import products from "@/data/catalog.json";
import { locales } from "@/lib/i18n/config";
import { SITE } from "@/lib/site";
import type { Product } from "@/lib/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/proyecto", "/sobre-mi"];

  const staticRoutes = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE.url}/${locale}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: {
          es: `${SITE.url}/es${path}`,
          en: `${SITE.url}/en${path}`,
          "x-default": `${SITE.url}/es${path}`,
        },
      },
    }))
  );

  const publishedProducts = (products as Product[]).filter(
    (product) => product.publish
  );

  const productRoutes = publishedProducts.flatMap((product) =>
    locales.map((locale) => ({
      url: `${SITE.url}/${locale}/item/${product.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          es: `${SITE.url}/es/item/${product.id}`,
          en: `${SITE.url}/en/item/${product.id}`,
          "x-default": `${SITE.url}/es/item/${product.id}`,
        },
      },
    }))
  );

  return [...staticRoutes, ...productRoutes];
}
