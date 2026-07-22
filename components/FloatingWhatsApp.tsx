import { SITE } from "@/lib/site";

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${
    SITE.whatsapp.number
  }?text=${encodeURIComponent(SITE.whatsapp.message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-green-500 px-4 py-4 font-medium text-white shadow-xl transition hover:-translate-y-1 hover:bg-green-600"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-7 w-7 fill-current"
      >
        <path d="M19.11 17.38c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.34-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.59-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />
        <path d="M16.03 3.2c-7.08 0-12.83 5.72-12.83 12.78 0 2.25.59 4.45 1.7 6.39L3.1 28.8l6.59-1.73a12.88 12.88 0 0 0 6.33 1.61h.01c7.07 0 12.82-5.72 12.82-12.78S23.1 3.2 16.03 3.2zm0 23.32h-.01a10.7 10.7 0 0 1-5.45-1.49l-.39-.23-3.91 1.03 1.04-3.8-.25-.39a10.6 10.6 0 0 1-1.64-5.66c0-5.87 4.79-10.64 10.67-10.64 2.85 0 5.53 1.11 7.54 3.12a10.53 10.53 0 0 1 3.12 7.52c0 5.87-4.79 10.64-10.67 10.64z" />
      </svg>

      <span className="hidden sm:inline">
        WhatsApp
      </span>
    </a>
  );
}