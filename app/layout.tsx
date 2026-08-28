import type { Metadata } from "next";
import { Alex_Brush, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const scriptFont = Alex_Brush({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maria Fernanda | XV Anos",
  description:
    "Com muita alegria convido você para celebrar comigo os meus 15 anos, dia 06.11.2026 em Chos Malal.",
  openGraph: {
    title: "Maria Fernanda | XV Anos",
    description:
      "Com muita alegria convido você para celebrar comigo os meus 15 anos, dia 06.11.2026 em Chos Malal.",
    images: ["/capa-v3.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${scriptFont.variable} ${serifFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-serif">
        {children}
      </body>
    </html>
  );
}
