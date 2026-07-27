import "server-only";

import type { Locale } from "./config";

const dictionaries = {
  es: () =>
    import("./dictionaries/es").then(
      (module) => module.default
    ),

  en: () =>
    import("./dictionaries/en").then(
      (module) => module.default
    ),
};

export async function getDictionary(
  locale: Locale
) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<
  ReturnType<typeof getDictionary>
>;