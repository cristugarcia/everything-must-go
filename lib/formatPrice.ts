import type { Locale } from "@/lib/i18n/config";

export const ARS_PER_USD = 1400;

type PriceLabels = {
  free: string;
  priceOnRequest: string;
};

type ProductPriceDisplay = {
  primary: string;
  secondary: string | null;
};

export function formatArsPrice(
  price: number,
  locale: Locale
): string {
  const formattedPrice = new Intl.NumberFormat(
    locale === "es" ? "es-AR" : "en-US",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ).format(price);

  return `ARS $${formattedPrice}`;
}

export function formatUsdEstimate(
  priceInArs: number
): string {
  const priceInUsd = Math.round(
    priceInArs / ARS_PER_USD
  );

  const formattedPrice = new Intl.NumberFormat(
    "en-US",
    {
      maximumFractionDigits: 0,
    }
  ).format(priceInUsd);

  return `USD ${formattedPrice}`;
}

export function getProductPriceDisplay(
  price: number | null | undefined,
  locale: Locale,
  labels: PriceLabels
): ProductPriceDisplay {
  if (price === 0) {
    return {
      primary: labels.free,
      secondary: null,
    };
  }

  if (
    typeof price !== "number" ||
    Number.isNaN(price) ||
    price < 0
  ) {
    return {
      primary: labels.priceOnRequest,
      secondary: null,
    };
  }

  return {
    primary: formatArsPrice(price, locale),

    secondary:
    locale === "en"
        ? `Approx. ${formatUsdEstimate(price)}`
        : null,
  };
}