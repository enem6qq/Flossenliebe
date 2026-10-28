import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { FishFinder } from "@/components/FishFinder";

export const metadata: Metadata = { title: "Ratgeber" };

const steps = [
  {
    t: "Standort wählen",
    d: "Fester, ebener Untergrund, keine direkte Sonne, nicht neben der Heizung. Denk an eine Steckdose – und daran, dass 100 Liter Wasser über 100 kg wiegen.",
  },
  {
    t: "Becken einrichten",
    d: "Bodengrund, Steine und Wurzeln, dann Pflanzen. Technik anschließen, Wasser mit Aufbereiter einfüllen. Eine Rückwand gibt Tiefe und versteckt Kabel.",
  },
  {
    t: "Geduld: Einfahren",
    d: "Das Becken braucht 3–4 Wochen, bis sich Bakterien angesiedelt haben, die giftiges Ammonium und Nitrit abbauen. In dieser Zeit noch keine Fische!",
  },
  {
    t: "Wasser testen",
    d: "Erst wenn Nitrit nicht mehr nachweisbar ist, ziehen die ersten Bewohner ein. Bring uns einfach eine Probe – wir testen kostenlos.",
  },
  {
    t: "Langsam besetzen",
    d: "Lieber in zwei, drei Etappen einsetzen als alle Tiere auf einmal. Schwarmfische immer in der Gruppe, nie einzeln.",
  },
  {
    t: "Pflegen",
    d: "Wöchentlich 20–30 % Wasser wechseln, sparsam füttern (nur so viel, wie in 2 Minuten gefressen wird), Filter nur vorsichtig reinigen.",
  },
];

const faq = [
  ["Wie viele Fische passen in mein Becken?", "Die alte Faustregel „1 cm Fisch pro Liter“ ist zu grob. Entscheidend sind Endgröße, Schwimmverhalten und Revieransprüche. Wir rechnen das gern gemeinsam mit dir durch."],
  ["Warum verschickt ihr keine Fische?", "Versand bedeutet Stress für die Tiere. Und wir möchten sicher sein, dass Becken und Besatz zusammenpassen – deshalb gibt es lebende Tiere nur nach einem kurzen Gespräch im Laden."],
  ["Süß- oder Meerwasser für den Anfang?", "Für den Einstieg empfehlen wir Süßwasser. Meerwasser ist kein Hexenwerk, braucht aber mehr Technik, Budget und Geduld. Wir begleiten dich bei beidem."],
  ["Was bringt eine Rückwand?", "Sie gibt den Fischen Sicherheit, lässt Farben stärker leuchten und das Becken tiefer wirken – und versteckt Kabel und Tapete."],
];

export default function RatgeberPage() {
  return (
    <>
      <PageHero
        eyebrow="Ratgeber"
        title={
          <>
            Dein erstes Aquarium – <em className="text-lagoon">Schritt für Schritt.</em>
          </>
        }
      >
        Aus über 20 Jahren Erfahrung: Was du wirklich wissen musst, damit sich deine Fische vom ersten Tag an wohlfühlen.
      </PageHero>

      <section className="container-x py-24 md:py-32">
        <ol className="grid gap-x-10 md:grid-cols-2">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.t} delay={(i % 2) * 90} className="grid grid-cols-[64px_1fr] gap-4 border-t border-navy/10 py-8">
              <span className="display text-[40px] leading-none text-sky">{i + 1}</span>
              <div>
                <h2 className="text-[21px] font-bold text-navy">{s.t}</h2>
                <p className="mt-2 leading-relaxed text-mist">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="bg-sand/50 py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-sky">Fisch-Finder</p>
            <h2 className="display mt-4 max-w-[18ch] text-[38px] text-navy md:text-[54px]">
              Wer passt in <em>dein Becken?</em>
            </h2>
          </Reveal>
          <Reveal className="mt-10" delay={100}>
            <FishFinder />
          </Reveal>
        </div>
      </section>

      <section className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <Reveal className="md:col-span-4">
          <p className="eyebrow text-sky">Häufige Fragen</p>
          <h2 className="display mt-4 text-[38px] text-navy md:text-[54px]">
            Gut zu <em>wissen.</em>
          </h2>
        </Reveal>
        <div className="md:col-span-7 md:col-start-6">
          {faq.map(([q, a]) => (
            <details key={q} className="group border-t border-navy/10 py-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[19px] font-bold text-navy">
                {q}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy/5 transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-[60ch] leading-relaxed text-mist">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
