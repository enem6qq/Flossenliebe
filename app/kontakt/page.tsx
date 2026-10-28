import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Kontakt" };

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt & Anfahrt"
        title={
          <>
            Schreib uns – oder <em className="text-lagoon">komm einfach vorbei.</em>
          </>
        }
      >
        Beratung ohne Termin ist zu den Öffnungszeiten jederzeit möglich. Für längere Planungsgespräche reservieren wir dir
        gern eine ruhige Stunde.
      </PageHero>
      <section className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="space-y-10 md:col-span-4">
          <div>
            <p className="eyebrow text-sky">Adresse</p>
            <p className="mt-3 text-[19px] font-semibold leading-relaxed text-navy">
              {site.name}
              <br />
              {site.street}
              <br />
              {site.zip} {site.city}
            </p>
            <p className="mt-2 text-mist">Inhaber: {site.owner}</p>
          </div>
          <div>
            <p className="eyebrow text-sky">Telefon & E-Mail</p>
            <p className="mt-3 leading-loose">
              <a className="link-underline font-semibold" href={`tel:${site.phoneHref}`}>
                {site.phone}
              </a>
              <br />
              <a className="link-underline font-semibold break-all" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </div>
          <div>
            <p className="eyebrow text-sky">Öffnungszeiten</p>
            <ul className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
              {site.hours.map((h) => (
                <li key={h.day} className="flex flex-col py-3">
                  <span className="font-semibold">{h.day}</span>
                  <span className="text-mist">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <a
            className="btn btn-dark"
            href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(site.mapsQuery)}`}
            target="_blank"
            rel="noreferrer"
          >
            Dettingen auf der Karte
          </a>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
