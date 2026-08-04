export function getSellerWhatsAppEnvKey(
  sellerId: string
) {
  const normalizedId = sellerId
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return `SELLER_WHATSAPP_${normalizedId}`;
}

export function getSellerWhatsApp(
  sellerId: string
) {
  const envKey = getSellerWhatsAppEnvKey(
    sellerId
  );
  const whatsapp = process.env[envKey]?.replace(
    /\D/g,
    ""
  );

  if (
    !whatsapp ||
    whatsapp.length < 8 ||
    whatsapp.length > 15
  ) {
    throw new Error(
      `Falta una variable privada válida para el vendedor ${sellerId}: ${envKey}`
    );
  }

  return whatsapp;
}
