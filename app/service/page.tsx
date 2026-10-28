import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Service" };

const services = [
  {
    t: "Persönliche Beratung",
    p: "kostenlos",
    d: "Du planst dein erstes Aquarium oder willst umsteigen? Wir besprechen Standort, Größe, Technik und Besatz – ohne Termin oder mit reservierter Stunde.",
  },
  {
    t: "Wasserwerte-Check",
    p: "kostenlos",
    d: "Bring eine Wasserprobe (ca. 100 ml) mit. Wir messen pH, KH, GH, Nitrit, Nitrat und Phosphat mit Tropftests und erklären dir die Ergebnisse.",
  },
  {
    t: "Planung & Einrichtung",
    p: "ab 89 €",
    d: "Wir richten dein Becken bei dir zu Hause ein: Bodengrund, Steine, Wurzeln, Pflanzen, Technik – auf Wunsch mit passender Plexiglas-Rückwand.",
  },
  {
    t: "Pflege-Abo",
    p: "ab 39 € / Besuch",
    d: "Alle zwei oder vier Wochen: Wasserwechsel, Scheiben- und Filterreinigung, Pflanzenschnitt, Gesundheitscheck. Ideal für Büros und Praxen.",
  },
  {
    t: "Urlaubsbetreuung",
    p: "ab 15 € / Besuch",
    d: "Während du verreist bist, füttern und kontrollieren wir deine Tiere – im Umkreis von 20 km um Dettingen.",
  },
  {
    t: "Lieferung & Aufbau",
    p: "ab 29 €",
    d: "Große Becken und Unterschränke bringen wir mit unserem Firmenwagen zu dir und bauen sie fachgerecht auf.",
  },
];

const workshops = [
  ["Einsteiger-Abend", "Das erste Aquarium – Stickstoffkreislauf, Einfahren, Besatz", "1. Freitag im Monat · 18:30 Uhr · 15 €"],
  ["Aquascaping-Workshop", "Ein Nano-Becken im Iwagumi-Stil selbst gestalten – inkl. Material zum Mitnehmen", "Samstags nach Termin · 119 €"],
  ["Meerwasser-Stammtisch", "Erfahrungsaustausch, Ableger-Tausch und Wasserwerte-Runde", "Letzter Donnerstag im Monat · frei"],
];

export default function ServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Service & Leistungen"
        title={
          <>
            Mehr als ein Laden – <em className="text-lagoon">dein Aquarien-Partner.</em>
          </>
        }
      >
        Von der ersten Idee bis zur regelmäßigen Pflege: Wir begleiten dich und deine Tiere. Alle Preise sind Beispiele
        (fiktives Unternehmen).
      </PageHero>

      <section className="container-x py-24 md:py-32">
        <div className="grid gap-px overflow-hidden rounded-[24px] bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 80} className="flex flex-col bg-white p-8 md:p-10">
              <span className="display text-[20px] text-sky">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="display mt-6 text-[28px] text-navy">{s.t}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-mist">{s.d}</p>
              <p className={`chip mt-6 self-start ${s.p === "kostenlos" ? "bg-moss/15 text-kelp" : "bg-navy/5 text-navy"}`}>{s.p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-abyss py-24 text-white md:py-32">
        <div className="container-x relative grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow text-lagoon">Workshops & Treffen</p>
            <h2 className="display mt-4 text-[38px] md:text-[54px]">
              Gemeinsam <em className="text-lagoon">lernen.</em>
            </h2>
            <p className="mt-5 leading-relaxed text-white/70">Plätze sind begrenzt – melde dich im Laden oder über das Kontaktformular an.</p>
            <Link href="/kontakt" className="btn btn-light mt-8">
              Platz anfragen
            </Link>
          </Reveal>
          <ul className="md:col-span-7 md:col-start-6">
            {workshops.map(([t, d, w], i) => (
              <Reveal as="li" key={t} delay={i * 90} className="border-t border-white/15 py-7">
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
                  <h3 className="display text-[26px]">{t}</h3>
                  <p className="text-[14px] text-lagoon">{w}</p>
                </div>
                <p className="mt-2 text-white/70">{d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
