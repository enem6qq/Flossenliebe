"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { items, open, setOpen, total, setQty, remove, toast } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-abyss/50 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-[420px] flex-col bg-pearl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Warenkorb"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <p className="display text-2xl">Dein Warenkorb</p>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-ink/5"
            onClick={() => setOpen(false)}
            aria-label="Warenkorb schließen"
            tabIndex={open ? 0 : -1}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="display text-3xl text-navy">Noch ganz leer hier.</p>
              <p className="mt-3 max-w-[30ch] text-mist">Stöbere im Shop oder gestalte deine eigene Plexiglas-Rückwand.</p>
              <Link href="/shop" className="btn btn-dark mt-6" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                Zum Shop
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-ink/10">
              {items.map((i) => (
                <li key={i.id} className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold leading-snug">{i.name}</p>
                      {i.note && <p className="mt-1 text-[13px] text-mist">{i.note}</p>}
                      {i.live && <p className="mt-1 text-[12px] font-semibold text-moss">Lebendes Tier · Abholung im Laden</p>}
                    </div>
                    <p className="shrink-0 font-semibold">{formatPrice(i.price * i.qty)}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center rounded-full border border-ink/15">
                      <button type="button" className="h-9 w-9 text-lg" onClick={() => setQty(i.id, i.qty - 1)} aria-label="Menge verringern" tabIndex={open ? 0 : -1}>
                        −
                      </button>
                      <span className="w-7 text-center text-sm font-semibold" aria-live="polite">
                        {i.qty}
                      </span>
                      <button type="button" className="h-9 w-9 text-lg" onClick={() => setQty(i.id, i.qty + 1)} aria-label="Menge erhöhen" tabIndex={open ? 0 : -1}>
                        +
                      </button>
                    </div>
                    <button type="button" className="text-[13px] text-mist underline-offset-4 hover:underline" onClick={() => remove(i.id)} tabIndex={open ? 0 : -1}>
                      Entfernen
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink/10 px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-mist">Zwischensumme</span>
              <span className="display text-2xl">{formatPrice(total)}</span>
            </div>
            <p className="mt-1 text-[12px] text-mist">inkl. MwSt. · Abholung im Laden kostenlos</p>
            <Link href="/warenkorb" className="btn btn-primary mt-4 w-full" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              Zur Kasse
            </Link>
          </div>
        )}
      </aside>

      <div
        className={`fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-abyss px-5 py-3 text-sm font-semibold text-white shadow-xl transition-all duration-500 ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
        role="status"
        aria-live="polite"
      >
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-moss align-middle" />
        {toast}
      </div>
    </>
  );
}
