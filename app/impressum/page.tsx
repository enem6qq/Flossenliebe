import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum & Hinweise" };

export default function Impressum() {
  return (
    <>
      <section className="bg-abyss pb-14 pt-32 text-white md:pt-40">
        <div className="container-x">
          <p className="eyebrow text-lagoon">Rechtliches</p>
          <h1 className="display mt-4 text-[44px] md:text-[64px]">Impressum & Hinweise</h1>
        </div>
      </section>
      <section className="container-x max-w-[820px] space-y-10 py-16 leading-relaxed md:py-24">
        <div className="rounded-[20px] bg-sand/60 p-6 md:p-8">
          <p className="font-bold text-navy">Wichtiger Hinweis</p>
          <p className="mt-2 text-ink/80">
            Flossenliebe ist ein <strong>fiktives Unternehmen</strong>. Diese Webseite entstand als Teil eines
            Meisterprüfungsprojekts im Fahrzeuglackierer-Handwerk (HM Lackiererei – Meisterbetrieb, Dettingen an der Erms).
            Produkte, Preise, Öffnungszeiten, Telefonnummer und E-Mail-Adresse sind frei erfunden. Bestellungen und
            Nachrichten werden nicht verarbeitet.
          </p>
        </div>
        <div>
          <h2 className="display text-[28px] text-navy">Angaben (fiktiv)</h2>
          <p className="mt-3 text-ink/80">
            {site.name} – {site.claim}
            <br />
            Inhaber: {site.owner}
            <br />
            {site.street}, {site.zip} {site.city}
            <br />
            E-Mail: {site.email}
          </p>
        </div>
        <div>
          <h2 className="display text-[28px] text-navy">Datenschutz</h2>
          <p className="mt-3 text-ink/80">
            Diese Seite verwendet keine Cookies, kein Tracking und lädt keine externen Schriften. Der Warenkorb wird nur
            lokal in deinem Browser gespeichert (localStorage) und nie übertragen.
          </p>
        </div>
        <div>
          <h2 className="display text-[28px] text-navy">Bildnachweise</h2>
          <p className="mt-3 text-ink/80">
            Logo Flossenliebe: KI-gestützter Entwurf (ChatGPT, OpenAI), vektorisiert und bearbeitet von Hoshman Mohammad in
            CorelDRAW. Alle 3D-Szenen und Produktillustrationen wurden für diese Webseite programmiert bzw. gezeichnet.
          </p>
        </div>
      </section>
    </>
  );
}
