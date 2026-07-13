export function formatPrice(price: number) {
  if (!price || price <= 0) {
    return "Consultar";
  }

  return `$ ${price.toLocaleString("es-AR")}`;
}

export function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function createWhatsAppUrl(
  number: string,
  message: string
) {
  return `https://wa.me/${number}?text=${encodeURIComponent(
    message
  )}`;
}