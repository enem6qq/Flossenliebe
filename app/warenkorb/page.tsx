import type { Metadata } from "next";
import { Checkout } from "@/components/Checkout";

export const metadata: Metadata = { title: "Warenkorb" };

export default function WarenkorbPage() {
  return (
    <>
      <section className="bg-abyss pb-14 pt-32 text-white md:pt-40">
        <div className="container-x">
          <p className="eyebrow text-lagoon">Kasse · Click & Collect</p>
          <h1 className="display mt-4 text-[44px] md:text-[64px]">Warenkorb</h1>
        </div>
      </section>
      <section className="container-x py-14 md:py-20">
        <Checkout />
      </section>
    </>
  );
}
