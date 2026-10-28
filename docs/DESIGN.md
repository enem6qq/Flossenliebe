# DESIGN – Flossenliebe

> Phase 2 der Anleitung („Designrichtung“). Abgeleitet aus Logo, Werbeplatte und Raumobjekt der Roten Mappe.

## Idee

„Ein Blick ins Becken“: dunkle, ruhige Tiefsee-Flächen (das Logo-Oval) wechseln mit hellen, perlmuttweißen
Flächen (die weiß lackierte Werbeplatte). Echte 3D-Szenen statt Stockfotos – Fische, Pflanzen, Luftblasen.
Viel Luft, wenige Farben, langsame Bewegung wie im Wasser.

## Farben

| Token    | Hex       | Herkunft / Einsatz                                   |
|----------|-----------|------------------------------------------------------|
| abyss    | `#05162D` | Tiefster Hintergrund, Hero, Footer                   |
| navy     | `#0B2E5E` | IP 5749 Ultramarine – Logo-Oval, Überschriften hell  |
| sky      | `#1E9BD7` | IP 5737 Sky – Akzente, Links, Fokus                  |
| lagoon   | `#8ED4F2` | IP 5736 Light Blue – Akzente auf Dunkel              |
| moss     | `#4CA83D` | IP 5700 Grün – Pflanzen, Erfolg, Badges              |
| pearl    | `#F3F7F9` | Weiß Uni / Perlmutt – helle Sektionen                |
| ink      | `#0A1628` | Fließtext auf Hell                                   |
| stone    | `#8C9196` | Steine im Logo – Sekundärtext, Linien                |

Regel: pro Sektion max. eine Akzentfarbe. Grün nur für „Natur/Pflanzen/OK“.

## Typografie

- **Display:** Fraunces (variabel, weiche Serife, Kursiv als Betonung – greift den Schreibschrift-Schwung des Logos auf)
- **Text:** Manrope (variabel, klar, gut lesbar am Handy)
- Skala (px): 12 · 14 · 16 · 18 · 22 · 28 · 36 · 48 · 64 · 88 (clamp für Mobile)
- Überschriften eng gesetzt (letter-spacing −0.02em), Labels in Versalien mit +0.18em

## Abstände & Layout

- 4-px-Raster, Sektionen 96–160 px vertikal (Mobile 64–96 px)
- Max. Breite 1280 px, Seitenrand 20 px (Mobile) / 40 px
- Asymmetrische Layouts (7/5-Spalten), keine drei gleichen Karten nebeneinander als Standard
- Radien: 6 px (Buttons, Inputs), 20 px (Karten), 999 px (Chips)

## Bewegung

- 3D-Szenen: langsam, gedämpft, Maus-Parallaxe max. ±0,4 Einheiten
- Einblenden beim Scrollen: 700 ms, ease-out, 24 px Versatz
- `prefers-reduced-motion` wird respektiert (Animationen stark reduziert)

## Was die Seite hochwertig macht

Viel Leerraum, große Serifen-Headlines mit kursiven Akzenten, echte 3D-Tiefe statt Effekt-Feuerwerk,
konsequent nur die Logo-Farben.
