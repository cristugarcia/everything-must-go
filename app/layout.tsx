import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  "https://everything-must-go-cyan.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Everything Must Go | Venta por mudanza",
    template: "%s | Everything Must Go",
  },

  description:
    "Muebles, electrodomésticos, electrónica, vehículos y artículos para el hogar en venta por mudanza en Buenos Aires.",

  applicationName: "Everything Must Go",

  keywords: [
    "venta por mudanza",
    "muebles usados",
    "electrodomésticos",
    "artículos para el hogar",
    "Buenos Aires",
    "productos usados",
  ],

  authors: [
    {
      name: "Cristina García",
    },
  ],

  creator: "Cristina García",

  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Everything Must Go",
    title: "Everything Must Go | Venta por mudanza",
    description:
      "Todo debe encontrar un nuevo hogar antes de mi mudanza. Explora muebles, electrodomésticos, electrónica y más.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Everything Must Go - Venta por mudanza",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Everything Must Go | Venta por mudanza",
    description:
      "Muebles, electrodomésticos, electrónica y otros artículos en venta en Buenos Aires.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}