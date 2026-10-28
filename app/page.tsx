import Link from "next/link";
import { AquariumScene } from "@/components/three/Lazy";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { ProductArt, artBackground } from "@/components/ProductArt";
import { BackdropPreview } from "@/components/BackdropPreview";
import { categories, products } from "@/lib/products";
import { site } from "@/lib/site";

const facts = [
  "Über 20 Jahre Aquaristik-Erfahrung",
  "Gelernter Zierfischzüchter",
  "Süß- & Meerwasser",
  "Nachzuchten bevorzugt",
  "Wasser-Check kostenlos",
  "Handgestaltete Plexiglas-Rückwände",
];

const principles = [
  {
    t: "Erst beraten, dann verkaufen",
    d: "Kein Fisch verlässt den Laden, ohne dass wir wissen, wohin er zieht. Beckengröße, Wasserwerte, Mitbewohner – wir fragen nach.",
  },
  {
    t: "Nachzucht vor Wildfang",
    d: "Wo immer möglich, kommen unsere Tiere aus verantwortungsvoller Nachzucht. Das schont Riffe und Flüsse – und die Tiere sind robuster.",
  },
  {
    t: "Eingewöhnt & gesund",
    d: "Neue Tiere bleiben bei uns in Quarantäne, bis sie fressen und gesund sind. Erst dann gehen sie in den Verkauf.",
  },
  {
    t: "Montag ist Pflegetag",
    d: "Einmal pro Woche bleibt der Laden zu – dann gehört der ganze Tag unseren Becken: Wasserwechsel, Kontrolle, Pflege.",
  },
];

export default function Home() {
  const featured = products.filter((p) => p.featured);
  const tiles = categories.filter((c) => c.id !== "rueckwaende").slice(0, 6);
  const tileArt = Object.fromEntries(tiles.map((c) => [c.id, products.find((p) => p.category === c.id)!.art]));

  return (
    <>
      {/* ——— Hero ——— */}
      <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-abyss text-white">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,#2a86c8_0%,#0a3a6a_45%,#03101f_100%)]" />
        <AquariumScene />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="container-x pb-14 md:pb-20">
            <p className="eyebrow text-lagoon">Aquaristik- & Zierfischfachgeschäft · Dettingen an der Erms</p>
            <h1 className="display mt-5 max-w-[13ch] text-[52px] sm:text-[72px] md:text-[104px]">
              Aquaristik aus <em className="text-lagoon">Liebe</em> zur Flosse.
            </h1>
            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-[46ch] text-[17px] leading-relaxed text-white/80 md:text-[19px]">
                Gesunde Tiere, ehrliche Beratung und Aquarien mit Charakter – für Einsteiger genauso wie für alte Hasen
                der Süß- und Meerwasseraquaristik.
              </p>
              <div className="pointer-events-auto flex flex-wrap gap-3">
                <Link href="/shop" className="btn btn-primary">
                  Zum Shop
                  <Arrow />
                </Link>
                <Link href="/rueckwand" className="btn btn-ghost text-white">
                  Rückwand in 3D gestalten
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className="pointer-events-none absolute right-5 top-28 hidden text-right text-[12px] leading-relaxed text-white/50 md:block">
          Echtzeit-3D · Maus bewegen
          <br />
          Frontosa · Skalar · Neonsalmler
        </p>
      </section>

      {/* ——— Laufband ——— */}
      <div className="overflow-hidden border-y border-navy/10 bg-white py-5" aria-label="Das zeichnet uns aus">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...facts, ...facts].map((f, i) => (
            <span key={i} className="flex items-center gap-12 text-[15px] font-semibold text-navy">
              {f}
              <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden />
            </span>
          ))}
        </div>
      </div>

      {/* ——— Intro ——— */}
      <section className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-36">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-sky">Willkommen bei Flossenliebe</p>
          <h2 className="display mt-5 text-[40px] text-navy md:text-[60px]">
            Der Name ist <em>Programm.</em>
          </h2>
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          <p className="text-[19px] leading-relaxed text-ink/80 md:text-[22px]">
            Bei uns ist Aquaristik keine Ware, sondern gelebte Leidenschaft. Gegründet {site.founded} von {site.owner},
            gelerntem Zierfischzüchter mit über 20 Jahren Erfahrung in der Süß- und Meerwasseraquaristik.
          </p>
          <p className="mt-6 leading-relaxed text-mist">
            Ob dein erstes Nano-Becken oder ein 350-Liter-Riff: Wir nehmen uns Zeit, hören zu und geben Anregungen für
            eine kreative Aquariengestaltung. Die artgerechte Haltung der Tiere steht dabei immer im Mittelpunkt.
          </p>
          <Link href="/ueber-uns" className="link-underline mt-8 inline-flex items-center gap-2 font-bold text-navy">
            Mehr über uns <Arrow />
          </Link>
        </Reveal>
      </section>

      {/* ——— Sortiment ——— */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-x">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-sky">Sortiment</p>
              <h2 className="display mt-4 max-w-[14ch] text-[40px] text-navy md:text-[60px]">
                Alles fürs Becken – <em>und mehr.</em>
              </h2>
            </div>
            <Link href="/shop" className="btn btn-dark self-start md:self-auto">
              Ganzes Sortiment <Arrow />
            </Link>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {tiles.map((c, i) => {
              const big = i === 0 || i === 5;
              return (
                <Reveal key={c.id} delay={i * 70} className={big ? "col-span-2" : "col-span-1"}>
                  <Link
                    href={`/shop?kategorie=${c.id}`}
                    className="group relative flex h-full min-h-[190px] flex-col justify-between overflow-hidden rounded-[20px] p-5 md:min-h-[240px] md:p-7"
                    style={{ background: artBackground(tileArt[c.id]) }}
                  >
                    <div
                      className={`absolute transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 ${
                        big ? "right-2 top-4 h-[75%] w-[58%] md:right-6" : "right-1 top-7 h-[52%] w-[80%]"
                      }`}
                    >
                      <ProductArt art={tileArt[c.id]} />
                    </div>
                    <p className={`relative eyebrow text-[10.5px] ${["suesswasser", "meerwasser", "wirbellose"].includes(c.id) ? "text-lagoon" : "text-sky"}`}>
                      {c.claim}
                    </p>
                    <p
                      className={`display relative max-w-[10ch] ${big ? "text-[34px] md:text-[44px]" : "text-[18px] sm:text-[22px] md:text-[28px]"} ${
                        ["suesswasser", "meerwasser", "wirbellose"].includes(c.id) ? "text-white" : "text-navy"
                      }`}
                    >
                      {c.name}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— Plexiglas-Rückwände ——— */}
      <section className="grain relative overflow-hidden bg-abyss py-24 text-white md:py-36">
        <div className="container-x relative grid items-center gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow text-lagoon">Unsere Besonderheit</p>
            <h2 className="display mt-5 text-[40px] md:text-[64px]">
              Rückwände, die <em className="text-lagoon">Tiefe</em> geben.
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-white/75">
              Jede Rückwand wird bei uns individuell aus Plexiglas gestaltet und passgenau für dein Becken gefertigt –
              zum Beispiel in der Wassertropfentechnik mit Weiß und Dunkelblau, auf Wunsch mit grüner Rückseite für echte
              Tiefenwirkung.
            </p>
            <ul className="mt-8 space-y-3 text-[15px] text-white/80">
              {["Maß auf den Millimeter", "Handlackiert mit Effekttechniken", "Optional mit LED-Hinterleuchtung"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-moss/20 text-moss">✓</span>
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/rueckwand" className="btn btn-light mt-10">
              Jetzt in 3D gestalten <Arrow />
            </Link>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={150}>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <BackdropPreview style="tropfen" className="col-span-2 aspect-[2/1] rounded-[20px]" />
                <BackdropPreview style="pflanzen" className="aspect-square rounded-[20px]" />
                <BackdropPreview style="tiefsee" className="aspect-square rounded-[20px]" />
              </div>
              <p className="mt-4 text-[13px] text-white/50">Live erzeugte Vorschau der Motive „Wassertropfen“, „Pflanzenwelt“ und „Tiefsee-Verlauf“.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Lieblingsstücke ——— */}
      <section className="container-x py-24 md:py-32">
        <Reveal>
          <p className="eyebrow text-sky">Lieblingsstücke</p>
          <h2 className="display mt-4 text-[40px] text-navy md:text-[60px]">
            Gerade <em>beliebt</em> im Laden.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 8).map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— Grundsätze ——— */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow text-moss">Artgerecht. Immer.</p>
            <h2 className="display mt-4 text-[40px] text-navy md:text-[56px]">
              Was uns <em>wichtig</em> ist.
            </h2>
            <p className="mt-6 leading-relaxed text-mist">
              Die artgerechte Haltung der Tiere steht im Mittelpunkt unseres Geschäftskonzepts – lebende Tiere gibt es
              deshalb nur im Laden, nach einem kurzen Gespräch.
            </p>
          </Reveal>
          <ol className="md:col-span-7 md:col-start-6">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 80} className="grid grid-cols-[56px_1fr] gap-4 border-t border-navy/10 py-7">
                <span className="display text-[28px] text-sky">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[20px] font-bold text-navy">{p.t}</h3>
                  <p className="mt-2 leading-relaxed text-mist">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— Zitat ——— */}
      <section className="container-x py-24 md:py-36">
        <Reveal className="mx-auto max-w-[920px] text-center">
          <svg width="44" height="32" viewBox="0 0 44 32" className="mx-auto text-sky" aria-hidden>
            <path fill="currentColor" d="M0 32V19C0 8 6 1 17 0l2 5c-6 2-9 6-9 11h8v16H0Zm25 0V19C25 8 31 1 42 0l2 5c-6 2-9 6-9 11h8v16H25Z" />
          </svg>
          <blockquote className="display mt-8 text-[30px] leading-[1.15] text-navy md:text-[48px]">
            Ein Aquarium ist ein Stück Natur im Wohnzimmer. Wer es einrichtet, übernimmt Verantwortung –{" "}
            <em>und wir helfen gern dabei.</em>
          </blockquote>
          <p className="mt-8 font-semibold text-ink">{site.owner}</p>
          <p className="text-[14px] text-mist">Inhaber & gelernter Zierfischzüchter</p>
        </Reveal>
      </section>

      {/* ——— Besuch ——— */}
      <section className="px-3 pb-3 md:px-5 md:pb-5">
        <div className="grain relative overflow-hidden rounded-[28px] bg-navy text-white">
          <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_100%,rgb(76_168_61/0.35),transparent_70%)]" />
          <div className="container-x relative grid gap-10 py-20 md:grid-cols-12 md:py-28">
            <div className="md:col-span-7">
              <p className="eyebrow text-lagoon">Komm vorbei</p>
              <h2 className="display mt-4 text-[40px] md:text-[64px]">
                Wir nehmen uns <em className="text-lagoon">Zeit</em> für dein Aquarium.
              </h2>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/kontakt" className="btn btn-light">
                  Beratungstermin anfragen
                </Link>
                <a href={`tel:${site.phoneHref}`} className="btn btn-ghost text-white">
                  {site.phone}
                </a>
              </div>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="text-[19px] font-semibold">
                {site.street}
                <br />
                {site.zip} {site.city}
              </p>
              <ul className="mt-6 space-y-3 text-white/80">
                {site.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6 border-b border-white/10 pb-3 text-[15px]">
                    <span>{h.day}</span>
                    <span className="text-right text-white">{h.time.replace(" – Pflegetag für unsere Tiere", "")}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
