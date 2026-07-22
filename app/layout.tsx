import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/site";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),

  title: {
    default: `${SITE.name} | Venta por mudanza`,
    template: `%s | ${SITE.name}`,
  },

  description:
    "Catálogo de muebles, electrónica, vehículos y otros artículos en venta por mudanza en Buenos Aires.",

  applicationName: "Everything Must Go",

  authors: [
    {
      name: "Cristina García Mijares",
    },
  ],

  creator: "Cristina García Mijares",

  keywords: [
    "venta por mudanza",
    "artículos usados",
    "muebles usados",
    "electrónica usada",
    "Buenos Aires",
    "Everything Must Go",
    "catálogo online",
  ],

  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "Everything Must Go",
    title: "Everything Must Go | Venta por mudanza",
    description:
      "Todo debe encontrar un nuevo hogar antes de mi mudanza. Explora el catálogo completo de productos disponibles.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Everything Must Go | Venta por mudanza",
    description:
      "Todo debe encontrar un nuevo hogar antes de mi mudanza.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white font-sans text-zinc-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}