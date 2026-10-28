// Fiktiver Produktkatalog von Flossenliebe. Alle Preise sind erfunden.

export type FishShape = "slim" | "tall" | "disc" | "cichlid" | "cat" | "betta" | "clown" | "tang" | "goby" | "livebearer";
export type FishPattern = "neon" | "redneon" | "stripes" | "plain" | "spots" | "clown" | "tang" | "mandarin" | "betta" | "guppy";

export type ProductArt =
  | { kind: "fish"; shape: FishShape; pattern: FishPattern; body: string; accent: string; fin: string }
  | { kind: "shrimp"; color: string }
  | { kind: "snail"; color: string }
  | { kind: "tank"; size: "nano" | "m" | "l" | "reef" }
  | { kind: "filter" | "light" | "heater" | "co2" | "test" | "food" | "conditioner" }
  | { kind: "plant"; variant: "anubias" | "fern" | "crypt" | "vallis" | "moss" | "carpet" }
  | { kind: "stone" | "wood" | "sand" }
  | { kind: "backdrop"; colors: [string, string] };

export type CategoryId =
  | "suesswasser"
  | "meerwasser"
  | "wirbellose"
  | "aquarien"
  | "technik"
  | "pflanzen"
  | "deko"
  | "futter"
  | "rueckwaende";

export type Product = {
  slug: string;
  name: string;
  latin?: string;
  category: CategoryId;
  price: number;
  unit?: string;
  short: string;
  description: string;
  art: ProductArt;
  badges?: string[];
  facts?: [string, string][];
  live?: boolean;
  featured?: boolean;
};

export const categories: { id: CategoryId; name: string; claim: string }[] = [
  { id: "suesswasser", name: "Süßwasserfische", claim: "Nachzuchten aus guter Hand" },
  { id: "meerwasser", name: "Meerwasserfische", claim: "Riff-tauglich & eingewöhnt" },
  { id: "wirbellose", name: "Garnelen & Schnecken", claim: "Kleine Helfer, große Wirkung" },
  { id: "aquarien", name: "Aquarien", claim: "Vom Nano bis zum Riffbecken" },
  { id: "technik", name: "Technik", claim: "Filter, Licht, Wärme, CO₂" },
  { id: "pflanzen", name: "Wasserpflanzen", claim: "Grün aus eigener Haltung" },
  { id: "deko", name: "Deko & Bodengrund", claim: "Steine, Wurzeln, Sand" },
  { id: "futter", name: "Futter & Pflege", claim: "Was gesunde Fische brauchen" },
  { id: "rueckwaende", name: "Plexiglas-Rückwände", claim: "Handgestaltet & passgenau" },
];

export const products: Product[] = [
  // ——— Süßwasser
  {
    slug: "frontosa",
    name: "Frontosa – Kaiserbuntbarsch",
    latin: "Cyphotilapia frontosa",
    category: "suesswasser",
    price: 39.9,
    unit: "Stück · ca. 8 cm",
    short: "Unser Wappentier aus dem Tanganjikasee – ruhig, imposant, langlebig.",
    description:
      "Der Frontosa ist der Fisch aus unserem Logo – und das nicht ohne Grund. Mit seinen blau-weißen Querbinden und der markanten Stirn ist er einer der beeindruckendsten Buntbarsche überhaupt. Er wird alt, wächst langsam und lebt am liebsten in einer kleinen Gruppe in großen Becken mit vielen Steinaufbauten.",
    art: { kind: "fish", shape: "cichlid", pattern: "stripes", body: "#f4f8fb", accent: "#2d9fd8", fin: "#2d9fd8" },
    badges: ["Nachzucht", "Logo-Fisch"],
    facts: [
      ["Endgröße", "bis 35 cm"],
      ["Temperatur", "24–27 °C"],
      ["pH-Wert", "7,8–9,0"],
      ["Becken ab", "500 Liter"],
      ["Herkunft", "Tanganjikasee, Afrika"],
    ],
    live: true,
    featured: true,
  },
  {
    slug: "neonsalmler",
    name: "Neonsalmler",
    latin: "Paracheirodon innesi",
    category: "suesswasser",
    price: 1.99,
    unit: "Stück · Gruppe ab 10 empfohlen",
    short: "Der Klassiker – leuchtet im Schwarm am schönsten.",
    description:
      "Kaum ein Fisch ist so beliebt wie der Neonsalmler. Im Schwarm von mindestens zehn Tieren zeigt er sein leuchtendes Blau und Rot und bringt Ruhe und Bewegung zugleich ins Becken. Ideal für bepflanzte Gesellschaftsaquarien mit weichem Wasser.",
    art: { kind: "fish", shape: "slim", pattern: "neon", body: "#c9d6dd", accent: "#22b8ff", fin: "#d9e6ec" },
    badges: ["Einsteiger", "Schwarmfisch"],
    facts: [
      ["Endgröße", "ca. 4 cm"],
      ["Temperatur", "20–26 °C"],
      ["pH-Wert", "5,0–7,0"],
      ["Becken ab", "60 Liter"],
      ["Gruppe", "ab 10 Tieren"],
    ],
    live: true,
    featured: true,
  },
  {
    slug: "roter-neon",
    name: "Roter Neon",
    latin: "Paracheirodon axelrodi",
    category: "suesswasser",
    price: 2.49,
    unit: "Stück · Gruppe ab 10 empfohlen",
    short: "Noch mehr Rot – der große Bruder des Neonsalmlers.",
    description:
      "Beim Roten Neon zieht sich das Rot über den gesamten Bauch. Er braucht etwas wärmeres, weiches Wasser und dankt es mit intensiven Farben. Wunderschön vor dunklem Hintergrund und zwischen Wurzeln.",
    art: { kind: "fish", shape: "slim", pattern: "redneon", body: "#c9d6dd", accent: "#22b8ff", fin: "#d9e6ec" },
    badges: ["Schwarmfisch"],
    facts: [
      ["Endgröße", "ca. 5 cm"],
      ["Temperatur", "24–28 °C"],
      ["pH-Wert", "4,5–6,5"],
      ["Becken ab", "80 Liter"],
    ],
    live: true,
  },
  {
    slug: "guppy-endler",
    name: "Endler-Guppy",
    latin: "Poecilia wingei",
    category: "suesswasser",
    price: 3.49,
    unit: "Stück · aus eigener Nachzucht",
    short: "Farbenfroh, robust und aus unserer eigenen Zucht.",
    description:
      "Endler-Guppys sind kleine Farbwunder: Die Männchen schimmern orange, grün und schwarz. Sie sind lebendgebärend, robust und ideal für Einsteiger. Unsere Tiere stammen aus eigener Nachzucht im Laden.",
    art: { kind: "fish", shape: "livebearer", pattern: "guppy", body: "#9fb3ba", accent: "#ff7a1a", fin: "#2bb673" },
    badges: ["Eigene Nachzucht", "Einsteiger"],
    facts: [
      ["Endgröße", "ca. 3 cm"],
      ["Temperatur", "22–28 °C"],
      ["pH-Wert", "7,0–8,0"],
      ["Becken ab", "54 Liter"],
    ],
    live: true,
  },
  {
    slug: "skalar",
    name: "Skalar",
    latin: "Pterophyllum scalare",
    category: "suesswasser",
    price: 12.9,
    unit: "Stück · ca. 5 cm",
    short: "Elegante Segelflossen für hohe Becken.",
    description:
      "Der Skalar ist der König des Amazonas-Aquariums. Mit seinen hohen Flossen braucht er Becken mit mindestens 50 cm Höhe. Ruhige Mitbewohner und viele Pflanzen machen ihn glücklich.",
    art: { kind: "fish", shape: "tall", pattern: "stripes", body: "#e9eef0", accent: "#20262c", fin: "#e9eef0" },
    badges: ["Nachzucht"],
    facts: [
      ["Endgröße", "ca. 15 cm (Höhe 20 cm)"],
      ["Temperatur", "24–30 °C"],
      ["pH-Wert", "6,0–7,5"],
      ["Becken ab", "200 Liter, 50 cm hoch"],
    ],
    live: true,
  },
  {
    slug: "diskus-turkis",
    name: "Diskus Türkis",
    latin: "Symphysodon aequifasciatus",
    category: "suesswasser",
    price: 69.0,
    unit: "Stück · ca. 8 cm",
    short: "Für Fortgeschrittene – der Traumfisch vieler Aquarianer.",
    description:
      "Diskusfische sind anspruchsvoll, aber wer ihnen sauberes, warmes und weiches Wasser bietet, bekommt einen der schönsten Fische überhaupt. Wir beraten dich ausführlich, bevor ein Diskus bei dir einzieht.",
    art: { kind: "fish", shape: "disc", pattern: "stripes", body: "#2aa7a0", accent: "#e46a2e", fin: "#1f7e86" },
    badges: ["Für Fortgeschrittene"],
    facts: [
      ["Endgröße", "ca. 15 cm"],
      ["Temperatur", "28–31 °C"],
      ["pH-Wert", "5,5–7,0"],
      ["Becken ab", "300 Liter"],
    ],
    live: true,
  },
  {
    slug: "kampffisch",
    name: "Kampffisch Halfmoon",
    latin: "Betta splendens",
    category: "suesswasser",
    price: 14.9,
    unit: "Männchen · Einzelhaltung",
    short: "Ein Einzelgänger mit Schleierflossen in Königsblau.",
    description:
      "Kampffische sind echte Persönlichkeiten. Männchen werden einzeln gehalten – am besten in einem bepflanzten Becken ab 25 Litern mit wenig Strömung. Bei uns lebt kein Betta in einem Becher.",
    art: { kind: "fish", shape: "betta", pattern: "betta", body: "#1b3fa8", accent: "#c4246c", fin: "#2a55d6" },
    badges: ["Nano-geeignet"],
    facts: [
      ["Endgröße", "ca. 6 cm"],
      ["Temperatur", "25–28 °C"],
      ["pH-Wert", "6,0–7,5"],
      ["Becken ab", "25 Liter"],
    ],
    live: true,
  },
  {
    slug: "panzerwels",
    name: "Metallpanzerwels",
    latin: "Corydoras aeneus",
    category: "suesswasser",
    price: 4.9,
    unit: "Stück · Gruppe ab 6",
    short: "Fröhliche Bodenputzer, die immer in Bewegung sind.",
    description:
      "Panzerwelse durchwühlen in der Gruppe den Bodengrund nach Futter. Wichtig ist feiner, runder Sand, damit sich die empfindlichen Barteln nicht verletzen.",
    art: { kind: "fish", shape: "cat", pattern: "plain", body: "#b88a52", accent: "#3c8b6e", fin: "#d1b28a" },
    badges: ["Einsteiger"],
    facts: [
      ["Endgröße", "ca. 7 cm"],
      ["Temperatur", "20–26 °C"],
      ["Becken ab", "80 Liter"],
      ["Bodengrund", "feiner Sand"],
    ],
    live: true,
  },
  // ——— Meerwasser
  {
    slug: "clownfisch",
    name: "Falscher Clownfisch",
    latin: "Amphiprion ocellaris",
    category: "meerwasser",
    price: 34.9,
    unit: "Stück · Nachzucht",
    short: "Der Star des Riffs – bei uns nur aus Nachzucht.",
    description:
      "Clownfische aus Nachzucht sind robuster, an Futter gewöhnt und schonen die Riffe. Ein Paar passt schon in ein Becken ab 150 Litern – eine Anemone ist schön, aber kein Muss.",
    art: { kind: "fish", shape: "clown", pattern: "clown", body: "#ff7a1a", accent: "#ffffff", fin: "#ff8c33" },
    badges: ["Nachzucht", "Riff-tauglich"],
    facts: [
      ["Endgröße", "ca. 8 cm"],
      ["Temperatur", "24–27 °C"],
      ["Salinität", "1,023–1,025"],
      ["Becken ab", "150 Liter"],
    ],
    live: true,
    featured: true,
  },
  {
    slug: "paletten-doktorfisch",
    name: "Paletten-Doktorfisch",
    latin: "Paracanthurus hepatus",
    category: "meerwasser",
    price: 89.0,
    unit: "Stück · ca. 6 cm",
    short: "Leuchtendes Blau für große Riffaquarien.",
    description:
      "Der Paletten-Doktorfisch ist schwimmfreudig und braucht viel Platz. Wir geben ihn nur in Becken ab 500 Litern und mit ausreichend Schwimmraum ab.",
    art: { kind: "fish", shape: "tang", pattern: "tang", body: "#1e5ad8", accent: "#0a1a44", fin: "#ffd21a" },
    badges: ["Großes Becken"],
    facts: [
      ["Endgröße", "ca. 30 cm"],
      ["Temperatur", "24–27 °C"],
      ["Becken ab", "500 Liter"],
    ],
    live: true,
  },
  {
    slug: "mandarinfisch",
    name: "Mandarinfisch",
    latin: "Synchiropus splendidus",
    category: "meerwasser",
    price: 49.0,
    unit: "Stück · an Frostfutter gewöhnt",
    short: "Ein lebendes Kunstwerk – nur für eingefahrene Becken.",
    description:
      "Mandarinfische fressen in der Natur winzige Kleinkrebse. Unsere Tiere sind an Frostfutter gewöhnt – trotzdem empfehlen wir ein mindestens ein Jahr altes Becken mit viel Lebendgestein.",
    art: { kind: "fish", shape: "goby", pattern: "mandarin", body: "#1d6fd1", accent: "#ff8a1f", fin: "#18a58c" },
    badges: ["Für Fortgeschrittene"],
    facts: [
      ["Endgröße", "ca. 7 cm"],
      ["Temperatur", "24–27 °C"],
      ["Becken ab", "200 Liter, eingefahren"],
    ],
    live: true,
  },
  // ——— Wirbellose
  {
    slug: "red-fire-garnele",
    name: "Red Fire Garnele",
    latin: "Neocaridina davidi",
    category: "wirbellose",
    price: 2.9,
    unit: "Stück · ab 10 Stück günstiger",
    short: "Knallrote Algenputzer – perfekt fürs Nano-Becken.",
    description:
      "Red Fire Garnelen sind anspruchslos, vermehren sich gut und halten das Becken sauber. Ein Klassiker für Nano-Aquarien und bepflanzte Becken.",
    art: { kind: "shrimp", color: "#e3262a" },
    badges: ["Einsteiger", "Nano-geeignet"],
    facts: [
      ["Größe", "ca. 3 cm"],
      ["Temperatur", "18–26 °C"],
      ["Becken ab", "12 Liter"],
    ],
    live: true,
    featured: true,
  },
  {
    slug: "amanogarnele",
    name: "Amanogarnele",
    latin: "Caridina multidentata",
    category: "wirbellose",
    price: 3.9,
    unit: "Stück",
    short: "Der fleißigste Algenfresser im Aquarium.",
    description:
      "Amanogarnelen fressen Fadenalgen, Futterreste und Beläge. Unauffällig gefärbt, aber unermüdlich im Einsatz.",
    art: { kind: "shrimp", color: "#9fb2a6" },
    facts: [
      ["Größe", "ca. 5 cm"],
      ["Temperatur", "18–28 °C"],
    ],
    live: true,
  },
  {
    slug: "rennschnecke",
    name: "Zebra-Rennschnecke",
    latin: "Neritina natalensis",
    category: "wirbellose",
    price: 3.5,
    unit: "Stück",
    short: "Hübsch gestreift, frisst Algen von Scheibe und Steinen.",
    description:
      "Rennschnecken vermehren sich im Süßwasser nicht und bleiben daher in der Anzahl, die du einsetzt. Ideal gegen Grünalgen.",
    art: { kind: "snail", color: "#d9a43a" },
    live: true,
  },
  // ——— Aquarien
  {
    slug: "nano-cube-30",
    name: "Nano Cube 30 L – Weißglas",
    category: "aquarien",
    price: 129.0,
    unit: "30 × 30 × 35 cm",
    short: "Kompaktes Weißglas-Becken für Garnelen und Aquascapes.",
    description:
      "Rahmenloses Becken aus extraklarem Weißglas mit polierten Kanten, inkl. Unterlegmatte. Perfekt für Garnelen, Kampffische oder ein Iwagumi-Layout auf dem Schreibtisch.",
    art: { kind: "tank", size: "nano" },
    badges: ["Weißglas"],
    facts: [
      ["Maße", "30 × 30 × 35 cm"],
      ["Volumen", "ca. 30 Liter"],
      ["Glas", "Weißglas, 5 mm"],
    ],
  },
  {
    slug: "starter-set-60",
    name: "Einsteiger-Set 60 L",
    category: "aquarien",
    price: 179.0,
    unit: "60 × 30 × 35 cm · komplett",
    short: "Alles drin für den Start – inkl. persönlicher Einweisung.",
    description:
      "Becken, Innenfilter, LED-Abdeckung, Heizstab, Bodengrund und Wasseraufbereiter. Beim Kauf im Laden erklären wir dir in Ruhe das Einfahren – und testen in den ersten Wochen kostenlos dein Wasser.",
    art: { kind: "tank", size: "m" },
    badges: ["Einsteiger", "Bestseller"],
    facts: [
      ["Maße", "60 × 30 × 35 cm"],
      ["Volumen", "54 Liter"],
      ["Inklusive", "Filter, LED, Heizer, Bodengrund"],
    ],
    featured: true,
  },
  {
    slug: "komplett-240",
    name: "Komplettaquarium 240 L mit Unterschrank",
    category: "aquarien",
    price: 899.0,
    unit: "120 × 40 × 50 cm",
    short: "Das Gesellschaftsbecken für Wohnzimmer mit Anspruch.",
    description:
      "Weißglas-Front, Außenfilter, dimmbare LED mit Sonnenaufgang, Unterschrank in Weiß matt. Auf Wunsch liefern und bauen wir das Becken bei dir auf – inkl. passender Plexiglas-Rückwand.",
    art: { kind: "tank", size: "l" },
    badges: ["Lieferung & Aufbau"],
    facts: [
      ["Maße", "120 × 40 × 50 cm"],
      ["Volumen", "240 Liter"],
      ["Unterschrank", "Weiß matt"],
    ],
  },
  {
    slug: "riffbecken-350",
    name: "Riffaquarium 350 L",
    category: "aquarien",
    price: 2490.0,
    unit: "120 × 55 × 55 cm · mit Technikbecken",
    short: "Meerwasser-Komplettsystem mit Abschäumer und Rückförderpumpe.",
    description:
      "Bohrung, Überlaufschacht, Technikbecken, Abschäumer und Strömungspumpen – alles aufeinander abgestimmt. Wir planen dein Riff gemeinsam und begleiten dich durch die Einfahrphase.",
    art: { kind: "tank", size: "reef" },
    badges: ["Meerwasser", "Planung inklusive"],
    facts: [
      ["Maße", "120 × 55 × 55 cm"],
      ["Volumen", "ca. 350 Liter"],
      ["Technik", "Abschäumer, Pumpen, Heizer"],
    ],
  },
  // ——— Technik
  {
    slug: "aussenfilter-1200",
    name: "Außenfilter 1200 L/h",
    category: "technik",
    price: 139.0,
    short: "Leise, wartungsfreundlich, für Becken bis 300 Liter.",
    description:
      "Mehrstufiger Außenfilter mit Vorfilter, Biomedien und Feinfiltervlies. Inklusive Schläuchen und Ansaugkorb.",
    art: { kind: "filter" },
    facts: [
      ["Leistung", "1200 L/h"],
      ["Für Becken", "bis 300 Liter"],
      ["Verbrauch", "15 W"],
    ],
  },
  {
    slug: "led-pro-90",
    name: "LED-Leuchte Pro 90 cm",
    category: "technik",
    price: 119.0,
    short: "Vollspektrum mit App-Steuerung und Sonnenaufgang.",
    description:
      "Dimmbare Vollspektrum-LED für Pflanzenbecken. Simuliert Sonnenauf- und -untergang – entspannt für Fische und Betrachter.",
    art: { kind: "light" },
    badges: ["Bestseller"],
    featured: true,
  },
  {
    slug: "regelheizer-100",
    name: "Regelheizer 100 W",
    category: "technik",
    price: 29.9,
    short: "Präzise Temperatur für Becken bis 150 Liter.",
    description: "Bruchsicherer Regelheizer mit Temperaturskala und Abschaltautomatik.",
    art: { kind: "heater" },
  },
  {
    slug: "co2-set",
    name: "CO₂-Anlage Komplettset",
    category: "technik",
    price: 159.0,
    short: "Für üppiges Pflanzenwachstum – mit Nachtabschaltung.",
    description:
      "Mehrweg-CO₂-Flasche, Druckminderer mit Magnetventil, Blasenzähler, Diffusor und Dauertest. Wir füllen deine Flasche im Laden nach.",
    art: { kind: "co2" },
  },
  {
    slug: "wassertest-koffer",
    name: "Wassertest-Koffer Profi",
    category: "technik",
    price: 49.9,
    short: "pH, KH, GH, NO₂, NO₃, PO₄, Fe – alles im Blick.",
    description:
      "Tropftests statt Teststreifen – deutlich genauer. Tipp: Bring uns jederzeit eine Wasserprobe, wir messen kostenlos mit.",
    art: { kind: "test" },
  },
  // ——— Pflanzen
  {
    slug: "anubias-nana",
    name: "Anubias nana auf Wurzel",
    latin: "Anubias barteri var. nana",
    category: "pflanzen",
    price: 12.9,
    short: "Unverwüstlich und wunderschön auf Holz.",
    description: "Langsam wachsend, kommt mit wenig Licht aus und wird von kaum einem Fisch gefressen. Bereits auf Mangrovenwurzel aufgebunden.",
    art: { kind: "plant", variant: "anubias" },
    badges: ["Einsteiger"],
    featured: true,
  },
  {
    slug: "javafarn",
    name: "Javafarn",
    latin: "Microsorum pteropus",
    category: "pflanzen",
    price: 7.9,
    short: "Robuster Aufsitzer für Steine und Wurzeln.",
    description: "Wird nicht in den Boden gesetzt, sondern auf Deko aufgebunden. Perfekt auch für Buntbarschbecken.",
    art: { kind: "plant", variant: "fern" },
  },
  {
    slug: "cryptocoryne",
    name: "Cryptocoryne wendtii",
    category: "pflanzen",
    price: 5.9,
    short: "Pflegeleichte Vordergrundpflanze in Braun-Grün.",
    description: "Wächst auch bei wenig Licht und bildet mit der Zeit dichte Polster.",
    art: { kind: "plant", variant: "crypt" },
  },
  {
    slug: "vallisnerie",
    name: "Vallisnerie spiralis",
    category: "pflanzen",
    price: 4.5,
    unit: "Bund",
    short: "Lange Bänder, die sich in der Strömung wiegen.",
    description: "Ideal für den Hintergrund – wie die Wasserpflanzen in unserem Logo.",
    art: { kind: "plant", variant: "vallis" },
  },
  {
    slug: "javamoos",
    name: "Javamoos",
    category: "pflanzen",
    price: 6.9,
    unit: "Portion",
    short: "Versteck für Jungfische und Garnelen.",
    description: "Lässt sich auf Steine und Wurzeln binden und bildet weiche grüne Polster.",
    art: { kind: "plant", variant: "moss" },
  },
  // ——— Deko
  {
    slug: "seiryu-steine",
    name: "Seiryu-Steine",
    category: "deko",
    price: 4.9,
    unit: "pro kg",
    short: "Graue, scharf gezeichnete Steine fürs Aquascaping.",
    description: "Wie die Steine in unserem Logo. Hinweis: Seiryu kann die Härte leicht anheben – ideal für Buntbarschbecken.",
    art: { kind: "stone" },
  },
  {
    slug: "mangrovenwurzel",
    name: "Mangrovenwurzel",
    category: "deko",
    price: 19.9,
    unit: "ca. 30–40 cm",
    short: "Natürliche Holzstruktur, jede ein Unikat.",
    description: "Gewässert und vorbehandelt. Gibt leichte Huminstoffe ab – ideal für Salmler und Welse.",
    art: { kind: "wood" },
  },
  {
    slug: "flusssand",
    name: "Flusssand fein, natur",
    category: "deko",
    price: 12.9,
    unit: "10 kg",
    short: "Abgerundete Körnung – sanft zu Welsen.",
    description: "Gewaschen und kantengerundet, Körnung 0,4–0,8 mm.",
    art: { kind: "sand" },
  },
  // ——— Futter & Pflege
  {
    slug: "hauptfutter-flocken",
    name: "Flossenliebe Hauptfutter",
    category: "futter",
    price: 9.9,
    unit: "250 ml",
    short: "Unsere Hausmischung – Flocken mit Insektenprotein.",
    description: "Ausgewogenes Hauptfutter für Zierfische. Ohne künstliche Farbstoffe, mit Spirulina und Insektenmehl.",
    art: { kind: "food" },
    badges: ["Hausmarke"],
  },
  {
    slug: "wasseraufbereiter",
    name: "Wasseraufbereiter",
    category: "futter",
    price: 8.9,
    unit: "250 ml",
    short: "Macht Leitungswasser sofort aquarientauglich.",
    description: "Bindet Chlor und Schwermetalle, schützt die Schleimhaut der Fische.",
    art: { kind: "conditioner" },
  },
  // ——— Rückwände
  {
    slug: "rueckwand-wassertropfen",
    name: "Plexiglas-Rückwand „Wassertropfen“",
    category: "rueckwaende",
    price: 125.0,
    unit: "ab · Maß nach Wunsch",
    short: "Weiß & Dunkelblau in Wassertropfentechnik – handlackiert.",
    description:
      "Unsere Signatur-Rückwand: Weiß und Dunkelblau in Wassertropfentechnik, auf Wunsch mit Hell- und Dunkelgrün auf der Rückseite für echte Tiefenwirkung. Passgenau für dein Becken gefertigt. Im Konfigurator kannst du sie in 3D an deinem Aquarium ansehen.",
    art: { kind: "backdrop", colors: ["#0b2e5e", "#ffffff"] },
    badges: ["Handarbeit", "Konfigurierbar"],
    featured: true,
  },
  {
    slug: "rueckwand-pflanzenwelt",
    name: "Plexiglas-Rückwand „Pflanzenwelt“",
    category: "rueckwaende",
    price: 95.0,
    unit: "ab · Maß nach Wunsch",
    short: "Hell- und Dunkelgrün – ein lebendiger, ruhiger Hintergrund.",
    description: "Ein Verlauf in Grüntönen, der Pflanzen größer und das Becken tiefer wirken lässt.",
    art: { kind: "backdrop", colors: ["#1e5e2a", "#8fd16d"] },
    badges: ["Konfigurierbar"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const byCategory = (id: CategoryId) => products.filter((p) => p.category === id);
export const categoryName = (id: CategoryId) => categories.find((c) => c.id === id)?.name ?? id;
