import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "Flossenliebe – Aquaristik- & Zierfischfachgeschäft in Dettingen an der Erms",
    template: "%s · Flossenliebe",
  },
  description:
    "Flossenliebe – modernes Fachgeschäft für Süß- und Meerwasseraquaristik in Dettingen an der Erms. Gesunde Tiere, ehrliche Beratung und individuell gestaltete Plexiglas-Rückwände.",
  icons: { icon: "/favicon.svg" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#05162d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-dvh overflow-x-hidden">
        <CartProvider>
          <a
            href="#inhalt"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
          >
            Zum Inhalt springen
          </a>
          <Header />
          <main id="inhalt">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
