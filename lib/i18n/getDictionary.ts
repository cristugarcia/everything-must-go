import "server-only";

import type { Locale } from "./config";
import es from "./dictionaries/es";
import en from "./dictionaries/en";

const dictionaries = {
  es,
  en,
};

export type Dictionary =
  (typeof dictionaries)[Locale];

export async function getDictionary(
  locale: Locale
): Promise<Dictionary> {
  return dictionaries[locale];
}