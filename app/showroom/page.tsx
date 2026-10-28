import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Showroom } from "@/components/Showroom";
import { BackdropPreview } from "@/components/BackdropPreview";

export const metadata: Metadata = {
  title: "Unser Verkaufsraum",
  description: "Werbeplatte und 3D-Raumobjekt im Verkaufsraum von Flossenliebe – gestaltet und lackiert von der HM Lackiererei.",
};

const folien = [
  { code: "IP 5700 5749", name: "Ultramarine Gloss", use: "Fisch, Logo-Oval, Steine und Konturen", color: "#0b2e5e" },
  { code: "IP 5700 5737", name: "Sky Gloss", use: "Bogenlinie", color: "#1e9bd7" },
  { code: "IP 5700 5736", name: "Light Blue Gloss", use: "Hauptschriftzug „Flossenliebe“", color: "#8ed4f2" },
  { code: "IP 5700", name: "Grün Gloss", use: "Wasserpflanzen und Zusatzschriftzug", color: "#4ca83d" },
];

export default function ShowroomPage() {
  return (
    <>
      <PageHero
        eyebrow="Unser Verkaufsraum"
        title={
          <>
            Ein Laden, der <em className="text-lagoon">Lust aufs Becken</em> macht.
          </>
        }
      >
        Zwei Blickfänge prägen unseren Verkaufsraum: die Werbeplatte mit unserem Logo und ein Raumobjekt aus Lowboard,
        handgestalteter Plexiglasplatte und LED-Licht. Beides wurde von der HM Lackiererei – Meisterbetrieb aus Dettingen
        entworfen, lackiert und beschriftet. Schau dich in 3D um.
      </PageHero>

      <section className="container-x -mt-10 md:-mt-14">
        <Reveal>
          <Showroom />
        </Reveal>
      </section>

      {/* Werbeplatte */}
      <section className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-sky">01 · Werbeplatte</p>
          <h2 className="display mt-4 text-[38px] text-navy md:text-[54px]">
            Unser Logo, <em>auf Alu verewigt.</em>
          </h2>
          <p className="mt-6 leading-relaxed text-ink/80">
            Die Werbeplatte ist der Blickfang im Verkaufsraum und stärkt den Wiedererkennungswert von Flossenliebe. Die weiße
            Grundfläche schafft einen klaren Kontrast zu den vierfarbigen Folienelementen: Die Blautöne greifen das Thema
            Wasser auf, Grün steht für Wasserpflanzen und natürliche Aquariengestaltung. Zierfisch, Pflanzen, Steine und
            Luftblasen stellen den direkten Bezug zu unserem Angebot her.
          </p>
          <p className="mt-4 leading-relaxed text-mist">
            Das Logo wurde in CorelDRAW vektorisiert und für die Folienbeschriftung optimiert – feine Details vereinfacht,
            Mindeststegbreiten beachtet, damit sich alles sauber plotten, entgittern und verkleben lässt.
          </p>
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-ink/10">
            {[
              ["Träger", "Alu-Verbundplatte"],
              ["Maße", "1300 × 700 × 4 mm"],
              ["Lackierung", "Zweischicht, Weiß Uni"],
              ["Beschriftung", "4 Folienschläge"],
            ].map(([k, v]) => (
              <div key={k} className="bg-white p-5">
                <dt className="text-[13px] text-mist">{k}</dt>
                <dd className="mt-1 font-bold text-navy">{v}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-6 space-y-3">
            {folien.map((f) => (
              <li key={f.code + f.name} className="flex items-center gap-4 rounded-[14px] bg-white p-4 ring-1 ring-ink/5">
                <span className="h-11 w-11 shrink-0 rounded-full ring-1 ring-ink/10" style={{ background: f.color }} />
                <span>
                  <span className="block text-[14px] font-bold">
                    {f.code} · {f.name}
                  </span>
                  <span className="text-[13.5px] text-mist">{f.use}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Raumobjekt */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow text-moss">02 · 3D-Raumobjekt</p>
            <h2 className="display mt-4 text-[38px] text-navy md:text-[54px]">
              Unterwasserwelt <em>zum Anfassen.</em>
            </h2>
            <p className="mt-6 leading-relaxed text-ink/80">
              Lowboard, gestaltete Plexiglasplatte und LED-Beleuchtung bilden zusammen ein dekoratives Raumobjekt. Es greift
              das Thema Unterwasserwelt auf und soll unsere Kunden zu eigenen Ideen für ihre Aquariengestaltung anregen.
            </p>
            <p className="mt-4 leading-relaxed text-mist">
              Die Farben Weiß, Grün und Blau verbinden das Raumobjekt mit der Werbeplatte und führen unser Erscheinungsbild im
              Verkaufsraum fort. Alle Materialien stammen von Zeihorn – speichel- und schweißecht und damit ideal für den
              Innenbereich.
            </p>
            <Link href="/rueckwand" className="btn btn-dark mt-8">
              Eigene Rückwand gestalten
            </Link>
          </Reveal>
          <div className="space-y-4 md:col-span-6 md:col-start-7">
            {[
              {
                t: "Lowboard · Laistechnik",
                d: "Weißer Grundton. Nur auf der Oberseite wird mit einem Tischläufer als Schablone eine grüne Lackgestaltung aufgebracht – Blüten, Blätter und geschwungene Ranken als Verbindung zu den Wasserpflanzen im Logo.",
                style: "lais" as const,
                colors: ["#f6f8f8", "#3f9a36"] as [string, string],
              },
              {
                t: "Plexiglas Rückseite · Grüntöne",
                d: "Hellgrün und Dunkelgrün werden zu einem lebendigen Hintergrund kombiniert – die untere Ebene für die Tiefenwirkung.",
                style: "pflanzen" as const,
                colors: ["#1d5a28", "#8fd16d"] as [string, string],
              },
              {
                t: "Plexiglas Vorderseite · Wassertropfentechnik",
                d: "Weiß und Dunkelblau ergeben Formen wie Wassertropfen und aufsteigende Luftblasen. Zwei Ebenen = räumliche Tiefe. Eine LED-Leiste darunter setzt alles in Szene.",
                style: "tropfen" as const,
                colors: ["#0b2e5e", "#ffffff"] as [string, string],
              },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 90} className="grid grid-cols-[120px_1fr] gap-5 rounded-[20px] bg-pearl p-4 md:grid-cols-[170px_1fr]">
                <BackdropPreview style={x.style} colors={x.colors} className="aspect-square rounded-[14px]" seed={9} />
                <div className="py-1">
                  <h3 className="font-bold text-navy">{x.t}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-mist">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-sand/60 p-8 md:flex-row md:items-center md:p-12">
          <div>
            <p className="eyebrow text-mist">Gestaltung & Lackierung</p>
            <p className="display mt-2 text-[28px] text-navy md:text-[36px]">HM Lackiererei – Meisterbetrieb</p>
            <p className="mt-1 text-mist">Mühlgässle 11 · 72581 Dettingen an der Erms</p>
          </div>
          <p className="max-w-[40ch] text-[14.5px] leading-relaxed text-mist">
            Werbeplatte und Raumobjekt sind Teil des Meisterprüfungsprojekts im Fahrzeuglackierer-Handwerk.
          </p>
        </Reveal>
      </section>
    </>
  );
}
