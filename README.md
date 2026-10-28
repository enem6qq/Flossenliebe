# Flossenliebe – Webseite

Webseite für **Flossenliebe – Aquaristik- & Zierfischfachgeschäft** (fiktives Unternehmen, Projekt zur
Meisterprüfung im Fahrzeuglackierer-Handwerk, HM Lackiererei).

## Inhalt

| Seite | Was drauf ist |
|---|---|
| `/` | Startseite mit Echtzeit-3D-Unterwasserwelt (Frontosa, Skalare, Neonschwarm, Pflanzen, Luftblasen) |
| `/shop` | Shop mit ca. 35 Artikeln, Kategorien, Suche, Warenkorb (Click & Collect, Demo) |
| `/rueckwand` | 3D-Konfigurator für Plexiglas-Rückwände (Motiv, Farben, Maße, LED, Preis) |
| `/showroom` | Verkaufsraum in 3D: Werbeplatte + Raumobjekt (Lowboard, Plexiglas, LED) aus der Roten Mappe |
| `/ueber-uns`, `/service`, `/ratgeber`, `/kontakt` | Unternehmen, Leistungen, Einsteiger-Ratgeber + Fisch-Finder, Kontaktformular (Demo) |
| `/qr` | QR-Code zur Seite – erzeugt sich automatisch für die aktuelle Adresse, Download als PNG/SVG |

Grundlage: `docs/BRIEF.md` (Inhalte) und `docs/DESIGN.md` (Design-System) – nach der Methode aus der Anleitung.

## Lokal starten

```bash
npm install
npm run dev
```

Dann http://localhost:3000 öffnen.

## Auf Vercel veröffentlichen (kostenlos, ohne eigene Domain)

1. Auf https://vercel.com mit dem GitHub-Konto anmelden.
2. **Add New → Project** → Repository `Flossenliebe` importieren.
3. Einstellungen so lassen (Next.js wird automatisch erkannt) → **Deploy**.
4. Du bekommst eine Adresse wie `https://flossenliebe.vercel.app`.
5. Diese Adresse + `/qr` öffnen → QR-Code herunterladen und in die Mappe drucken.

Jeder weitere Push auf den Haupt-Branch aktualisiert die Seite automatisch.
