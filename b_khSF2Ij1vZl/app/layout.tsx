import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Woop | Sua Consultoria Apple no Brasil",
  description:
    "Compre Apple com clareza, preço justo e suporte humano. A Woop é sua consultoria especializada em produtos Apple importados dos EUA.",
  keywords: [
    "Apple",
    "iPhone",
    "MacBook",
    "iPad",
    "Apple Watch",
    "AirPods",
    "importação",
    "Brasil",
    "consultoria Apple",
  ],
  authors: [{ name: "Woop" }],
  creator: "Woop",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://woop.com.br",
    siteName: "Woop",
    title: "Woop | Sua Consultoria Apple no Brasil",
    description:
      "Compre Apple com clareza, preço justo e suporte humano. Produtos importados dos EUA com atendimento personalizado.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Woop | Sua Consultoria Apple no Brasil",
    description:
      "Compre Apple com clareza, preço justo e suporte humano.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
