import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ProductArt } from "@/components/ProductArt";
import { getProduct } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Über uns" };

const timeline = [
  ["Seit über 20 Jahren", "Allan Kader hält und züchtet Fische – vom ersten Guppy-Becken im Kinderzimmer bis zum Meerwasserriff."],
  ["Ausbildung", "Gelernter Zierfischzüchter: Wasserchemie, Tiergesundheit, Zucht und Aufzucht von der Pike auf."],
  ["2026", "Gründung von Flossenliebe in der Neutstraße 25 in Dettingen an der Erms."],
  ["Heute", "Fachgeschäft für Süß- und Meerwasser mit eigener Nachzucht, Beratung und handgestalteten Rückwänden."],
];

export default function UeberUns() {
  const frontosa = getProduct("frontosa")!;
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title={
          <>
            Aquaristik als <em className="text-lagoon">gelebte Leidenschaft.</em>
          </>
        }
      >
        Flossenliebe ist ein modernes Fachgeschäft für Aquaristik in Dettingen an der Erms – gegründet {site.founded} von{" "}
        {site.owner}.
      </PageHero>

      <section className="container-x grid gap-14 py-24 md:grid-cols-12 md:py-32">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-navy">
            <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_30%_20%,#1e9bd7_0%,#0b2e5e_55%,#05162d_100%)]" />
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2">
              <ProductArt art={frontosa.art} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="display text-[28px]">{site.owner}</p>
              <p className="text-[14px] text-white/70">Inhaber & Geschäftsführer · Zierfischzüchter</p>
            </div>
          </div>
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          <p className="eyebrow text-sky">Der Gründer</p>
          <h2 className="display mt-4 text-[38px] text-navy md:text-[54px]">
            Vom Hobby <em>zum Beruf.</em>
          </h2>
          <p className="mt-6 text-[18px] leading-relaxed text-ink/80">
            {site.owner} ist gelernter Zierfischzüchter und beschäftigt sich seit über 20 Jahren mit der Süß- und
            Meerwasseraquaristik. Mit Flossenliebe hat er sich {site.founded} einen Traum erfüllt: einen Laden, in dem
            Aquaristik nicht als Ware verstanden wird, sondern als Leidenschaft.
          </p>
          <p className="mt-4 leading-relaxed text-mist">
            Das Sortiment reicht von Süß- und Meerwasserfischen über Aquarien in verschiedenen Größen bis zum kompletten
            Zubehör – Technik, Dekoration und Wasserpflanzen. Eine Besonderheit sind individuell gefertigte
            Aquarien-Rückwände aus Plexiglas, die auf Kundenwunsch gestaltet und passgenau produziert werden.
          </p>
          <ol className="mt-10 space-y-0">
            {timeline.map(([t, d]) => (
              <li key={t} className="grid grid-cols-[130px_1fr] gap-4 border-t border-navy/10 py-5 md:grid-cols-[170px_1fr]">
                <span className="font-bold text-navy">{t}</span>
                <span className="leading-relaxed text-mist">{d}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow text-sky">Unser Logo</p>
            <h2 className="display mt-4 text-[38px] text-navy md:text-[54px]">
              Warum ein <em>Frontosa?</em>
            </h2>
            <p className="mt-6 leading-relaxed text-ink/80">
              Der blau-weiß gestreifte Fisch in unserem Logo ist ein Frontosa – ein Buntbarsch aus dem Tanganjikasee. Er
              ist ruhig, langlebig und wächst langsam. Genau so sehen wir Aquaristik: mit Geduld, Respekt und Freude über
              jedes Jahr, das ein Tier gesund bei dir lebt.
            </p>
            <p className="mt-4 leading-relaxed text-mist">
              Blau steht für das Wasser, Grün für die Pflanzen, Grau für die Steine – diese Farben ziehen sich durch den
              ganzen Laden, von der Werbeplatte bis zum Lowboard.
            </p>
            <Link href="/showroom" className="btn btn-dark mt-8">
              Verkaufsraum in 3D ansehen
            </Link>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
            <div className="rounded-[24px] bg-pearl p-6 md:p-12">
              <Image src="/brand/flossenliebe-logo.svg" alt="Logo Flossenliebe" width={1930} height={774} className="h-auto w-full" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[
                ["#0b2e5e", "Ultramarine"],
                ["#1e9bd7", "Sky"],
                ["#8ed4f2", "Light Blue"],
                ["#4ca83d", "Grün"],
              ].map(([c, n]) => (
                <div key={n}>
                  <div className="h-14 rounded-[12px]" style={{ background: c }} />
                  <p className="mt-2 text-[12px] font-semibold text-mist">{n}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <Reveal>
          <p className="eyebrow text-moss">Werte</p>
          <h2 className="display mt-4 max-w-[18ch] text-[38px] text-navy md:text-[54px]">
            Drei Dinge, die bei uns <em>nicht verhandelbar</em> sind.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-12">
          {[
            ["Das Tier zuerst", "Wir verkaufen keinen Fisch in ein Becken, das nicht passt – auch wenn es den Umsatz kostet.", "md:col-span-5"],
            ["Ehrliche Beratung", "Für Einsteiger wie für erfahrene Aquarianer: verständlich, ohne Fachchinesisch, ohne Verkaufsdruck.", "md:col-span-7"],
            ["Kreativität im Becken", "Aquarien sind kleine Kunstwerke. Wir geben Anregungen – von der Pflanzenauswahl bis zur eigenen Rückwand.", "md:col-span-12"],
          ].map(([t, d, span], i) => (
            <Reveal key={t} delay={i * 90} className={`${span} rounded-[24px] ${i === 2 ? "bg-navy text-white" : "bg-white"} p-8 md:p-10`}>
              <p className={`display text-[30px] ${i === 2 ? "text-lagoon" : "text-navy"}`}>{t}</p>
              <p className={`mt-3 max-w-[60ch] leading-relaxed ${i === 2 ? "text-white/75" : "text-mist"}`}>{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
