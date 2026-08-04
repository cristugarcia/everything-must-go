import products from "../data/catalog.json";
import { SITE } from "../lib/site";
import {
  buildTrackedUrl,
  type MarketingChannel,
} from "../lib/utm";

const CHANNELS: MarketingChannel[] = [
  "whatsapp",
  "whatsapp_status",
  "instagram",
  "tiktok",
  "facebook_marketplace",
  "linkedin",
  "referral",
];

const args = process.argv.slice(2);

function readArgument(name: string) {
  const index = args.indexOf(`--${name}`);

  return index >= 0 ? args[index + 1] : undefined;
}

const localeArgument = readArgument("locale") ?? "es";
const productArgument = readArgument("product");

if (localeArgument !== "es" && localeArgument !== "en") {
  throw new Error('El idioma debe ser "es" o "en".');
}

const locale = localeArgument;
const normalizedProductId = productArgument?.toUpperCase();
const product = normalizedProductId
  ? products.find(
      (item) =>
        item.id.toUpperCase() === normalizedProductId &&
        item.publish
    )
  : undefined;

if (normalizedProductId && !product) {
  throw new Error(
    `No existe un producto publicado con ID ${normalizedProductId}.`
  );
}

const destinationUrl = product
  ? `${SITE.url}/${locale}/item/${product.id}`
  : `${SITE.url}/${locale}`;

const content = product
  ? `product_${product.id}`
  : "catalog";

console.log(
  product
    ? `Enlaces para ${product.name} (${product.id}) — ${locale.toUpperCase()}`
    : `Enlaces del catálogo — ${locale.toUpperCase()}`
);

for (const channel of CHANNELS) {
  console.log(`\n${channel}`);
  console.log(
    buildTrackedUrl({
      url: destinationUrl,
      channel,
      content,
    })
  );
}
