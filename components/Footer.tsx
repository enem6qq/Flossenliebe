import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-abyss text-white">
      <div className="container-x relative grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image src="/brand/flossenliebe-logo.svg" alt="Flossenliebe" width={1930} height={774} className="h-24 w-auto rounded-[18px] bg-white px-3 py-2" />
          <p className="display mt-8 max-w-[18ch] text-[32px] leading-tight">
            Aquaristik ist bei uns keine Ware, <em className="text-lagoon">sondern Leidenschaft.</em>
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-lagoon">Besuch uns</p>
          <address className="mt-4 not-italic leading-relaxed text-white/80">
            {site.name}
            <br />
            {site.street}
            <br />
            {site.zip} {site.city}
          </address>
          <p className="mt-4 text-white/80">
            <a href={`tel:${site.phoneHref}`} className="link-underline">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="link-underline break-all">
              {site.email}
            </a>
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow text-lagoon">Öffnungszeiten</p>
          <ul className="mt-4 space-y-2 text-[14px] text-white/80">
            {site.hours.map((h) => (
              <li key={h.day}>
                <span className="block font-semibold text-white">{h.day}</span>
                {h.time}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow text-lagoon">Seiten</p>
          <ul className="mt-4 space-y-2 text-[14px] text-white/80">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-underline">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/qr" className="link-underline">
                QR-Code
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-[12.5px] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.founded} {site.name} · Inhaber {site.owner}
          </p>
          <p className="md:text-right">
            Fiktives Unternehmen · Projekt zur Meisterprüfung im Fahrzeuglackierer-Handwerk ·{" "}
            <Link href="/impressum" className="underline underline-offset-4 hover:text-white">
              Impressum & Hinweise
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
