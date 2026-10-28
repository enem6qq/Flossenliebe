import type { Metadata } from "next";
import { QrCode } from "@/components/QrCode";

export const metadata: Metadata = { title: "QR-Code" };

export default function QrPage() {
  return (
    <>
      <section className="bg-abyss pb-14 pt-32 text-white md:pt-40">
        <div className="container-x">
          <p className="eyebrow text-lagoon">Für Mappe, Flyer & Werbeplatte</p>
          <h1 className="display mt-4 text-[44px] md:text-[64px]">
            QR-Code <em className="text-lagoon">zur Webseite</em>
          </h1>
        </div>
      </section>
      <section className="container-x py-16 md:py-24">
        <QrCode />
      </section>
    </>
  );
}
