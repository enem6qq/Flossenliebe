// Stammdaten aus der Roten Mappe (Abschnitt 1.5). Telefon, Öffnungszeiten etc. sind frei erfunden.
export const site = {
  name: "Flossenliebe",
  claim: "Aquaristik- & Zierfischfachgeschäft",
  owner: "Allan Kader",
  founded: 2026,
  street: "Neutstraße 25",
  zip: "72581",
  city: "Dettingen an der Erms",
  phone: "0123 456 78 90",
  phoneHref: "+491234567890",
  email: "info@flossenliebe-aquaristik.de",
  web: "www.flossenliebe-aquaristik.de",
  hours: [
    { day: "Montag", time: "Ruhetag – Pflegetag für unsere Tiere" },
    { day: "Dienstag – Freitag", time: "10:00 – 18:30 Uhr" },
    { day: "Samstag", time: "09:30 – 15:00 Uhr" },
  ],
  mapsQuery: "Dettingen an der Erms",
};

export const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/rueckwand", label: "Rückwand-Konfigurator" },
  { href: "/service", label: "Service" },
  { href: "/ratgeber", label: "Ratgeber" },
  { href: "/showroom", label: "Verkaufsraum" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];
