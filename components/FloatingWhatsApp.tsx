const WHATSAPP_NUMBER = "5491123897526";

export default function FloatingWhatsApp() {
  const whatsappMessage =
    "Hola Cristina 👋 Vi tu catálogo de Everything Must Go y quería hacerte una consulta.";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-green-500 px-4 py-4 font-medium text-white shadow-xl transition hover:-translate-y-1 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-200 sm:bottom-7 sm:right-7 sm:px-5"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-7 w-7 fill-current"
      >
        <path d="M19.11 17.38c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.64 1.11 2.82c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.52-.08 1.59-.65 1.82-1.28.23-.63.23-1.16.16-1.28-.07-.11-.25-.18-.52-.32Z" />
        <path d="M16.03 3.2c-7.08 0-12.83 5.72-12.83 12.78 0 2.25.59 4.45 1.7 6.39L3.1 28.8l6.59-1.73a12.88 12.88 0 0 0 6.33 1.61h.01c7.07 0 12.82-5.72 12.82-12.78 0-3.42-1.34-6.64-3.76-9.06a12.76 12.76 0 0 0-9.06-3.64Zm0 23.32h-.01a10.68 10.68 0 0 1-5.45-1.49l-.39-.23-3.91 1.03 1.04-3.81-.25-.39a10.63 10.63 0 0 1-1.63-5.65c0-5.84 4.76-10.59 10.61-10.59 2.83 0 5.49 1.1 7.49 3.1a10.5 10.5 0 0 1 3.11 7.49c0 5.84-4.76 10.59-10.61 10.59Z" />
      </svg>

      <span className="hidden sm:inline">
        WhatsApp
      </span>
    </a>
  );
}