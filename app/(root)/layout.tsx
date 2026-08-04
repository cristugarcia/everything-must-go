import type { Metadata } from "next";

import { SITE } from "@/lib/site";

import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
};

export default function RedirectRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
