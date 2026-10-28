import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { ShopBrowser } from "@/components/ShopBrowser";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Shop · Click & Collect"
        title={
          <>
            Alles fürs Becken, <em className="text-lagoon">mit Herz</em> ausgewählt.
          </>
        }
      >
        Zubehör, Technik und Pflanzen bestellst du bequem online. Lebende Tiere reservierst du hier – abgeholt werden sie
        nach einem kurzen Beratungsgespräch im Laden. So stellen wir sicher, dass jedes Tier ein passendes Zuhause bekommt.
      </PageHero>
      <Suspense fallback={<div className="container-x py-24 text-mist">Sortiment wird geladen …</div>}>
        <ShopBrowser />
      </Suspense>
      <section className="container-x pb-24">
        <div className="grid gap-4 rounded-[20px] bg-white p-6 ring-1 ring-ink/5 md:grid-cols-3 md:p-10">
          {[
            ["Abholung kostenlos", "Bestellung im Laden abholen – meist schon am nächsten Öffnungstag."],
            ["Lieferung & Aufbau", "Große Aquarien liefern und bauen wir im Umkreis von 30 km auf."],
            ["Tiere nur mit Beratung", "Kein Tierversand. Reservieren online, Abholung nach kurzem Gespräch."],
          ].map(([t, d]) => (
            <div key={t}>
              <p className="font-bold text-navy">{t}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-mist">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
