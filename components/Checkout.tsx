"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/format";

export function Checkout() {
  const { items, total, setQty, remove, clear } = useCart();
  const [done, setDone] = useState<string | null>(null);
  const [delivery, setDelivery] = useState<"abholung" | "lieferung">("abholung");
  const hasLive = items.some((i) => i.live);
  const shipping = delivery === "lieferung" ? 29 : 0;

  if (done) {
    return (
      <div className="mx-auto max-w-[640px] rounded-[24px] bg-white p-8 text-center ring-1 ring-ink/5 md:p-12" role="status">
        <p className="eyebrow text-moss">Bestellung {done}</p>
        <p className="display mt-3 text-[40px] text-navy">Vielen Dank!</p>
        <p className="mt-4 leading-relaxed text-mist">
          Das war eine Demo-Bestellung – Flossenliebe ist ein fiktives Unternehmen, es wurde nichts bezahlt oder verschickt.
        </p>
        <Link href="/" className="btn btn-dark mt-8">
          Zur Startseite
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="display text-[36px] text-navy">Dein Warenkorb ist leer.</p>
        <Link href="/shop" className="btn btn-primary mt-8">
          Zum Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <ul className="divide-y divide-ink/10 rounded-[24px] bg-white px-6 ring-1 ring-ink/5">
          {items.map((i) => (
            <li key={i.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold">{i.name}</p>
                {i.note && <p className="text-[13px] text-mist">{i.note}</p>}
                {i.live && <p className="text-[12px] font-semibold text-moss">Lebendes Tier · nur Abholung</p>}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-full border border-ink/15">
                  <button type="button" className="h-9 w-9" onClick={() => setQty(i.id, i.qty - 1)} aria-label="Menge verringern">
                    −
                  </button>
                  <span className="w-7 text-center text-sm font-semibold">{i.qty}</span>
                  <button type="button" className="h-9 w-9" onClick={() => setQty(i.id, i.qty + 1)} aria-label="Menge erhöhen">
                    +
                  </button>
                </div>
                <p className="w-24 text-right font-semibold">{formatPrice(i.qty * i.price)}</p>
                <button type="button" onClick={() => remove(i.id)} className="text-mist hover:text-ink" aria-label={`${i.name} entfernen`}>
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form
        className="space-y-5 rounded-[24px] bg-white p-6 ring-1 ring-ink/5 md:p-8 lg:col-span-5"
        onSubmit={(e) => {
          e.preventDefault();
          setDone("FL-" + Math.floor(100000 + Math.random() * 899999));
          clear();
        }}
      >
        <p className="display text-[28px] text-navy">Abschluss</p>
        <fieldset>
          <legend className="text-[14px] font-semibold">Erhalt</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(
              [
                ["abholung", "Abholung im Laden", "kostenlos"],
                ["lieferung", "Lieferung", "29 €"],
              ] as const
            ).map(([v, l, p]) => (
              <button
                key={v}
                type="button"
                disabled={v === "lieferung" && hasLive}
                onClick={() => setDelivery(v)}
                aria-pressed={delivery === v}
                className={`rounded-[12px] border px-4 py-3 text-left disabled:opacity-40 ${delivery === v ? "border-navy bg-navy text-white" : "border-ink/15"}`}
              >
                <span className="block font-semibold">{l}</span>
                <span className="text-[12.5px] opacity-70">{p}</span>
              </button>
            ))}
          </div>
          {hasLive && <p className="mt-2 text-[12.5px] text-mist">Mit lebenden Tieren ist nur Abholung möglich.</p>}
        </fieldset>
        <label className="block">
          <span className="text-[14px] font-semibold">Name</span>
          <input required className="input mt-1.5" autoComplete="name" />
        </label>
        <label className="block">
          <span className="text-[14px] font-semibold">E-Mail</span>
          <input required type="email" className="input mt-1.5" autoComplete="email" />
        </label>
        {delivery === "lieferung" && (
          <label className="block">
            <span className="text-[14px] font-semibold">Lieferadresse</span>
            <textarea required rows={3} className="input mt-1.5" autoComplete="street-address" />
          </label>
        )}
        <div className="space-y-2 border-t border-ink/10 pt-5 text-[15px]">
          <div className="flex justify-between">
            <span className="text-mist">Zwischensumme</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-mist">{delivery === "lieferung" ? "Lieferung" : "Abholung"}</span>
            <span>{shipping ? formatPrice(shipping) : "kostenlos"}</span>
          </div>
          <div className="flex items-baseline justify-between pt-2">
            <span className="font-bold">Gesamt</span>
            <span className="display text-[32px] text-navy">{formatPrice(total + shipping)}</span>
          </div>
          <p className="text-[12px] text-mist">inkl. MwSt. · Bezahlung bei Abholung (Demo)</p>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          {hasLive ? "Verbindlich reservieren" : "Jetzt bestellen"}
        </button>
      </form>
    </div>
  );
}
