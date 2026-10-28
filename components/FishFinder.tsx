"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { ProductArt, artBackground } from "./ProductArt";

type Water = "suess" | "meer";
type Level = "neu" | "erfahren";

// Mindestbeckengröße in Litern je Tier (vereinfacht)
const minLiters: Record<string, number> = {
  neonsalmler: 60,
  "roter-neon": 80,
  "guppy-endler": 54,
  skalar: 200,
  "diskus-turkis": 300,
  kampffisch: 25,
  panzerwels: 80,
  frontosa: 500,
  clownfisch: 150,
  "paletten-doktorfisch": 500,
  mandarinfisch: 200,
  "red-fire-garnele": 12,
  amanogarnele: 30,
  rennschnecke: 20,
};
const expert = new Set(["diskus-turkis", "mandarinfisch", "paletten-doktorfisch"]);
const marine = new Set(["clownfisch", "paletten-doktorfisch", "mandarinfisch"]);

export function FishFinder() {
  const [water, setWater] = useState<Water>("suess");
  const [liters, setLiters] = useState(60);
  const [level, setLevel] = useState<Level>("neu");

  const result = useMemo(
    () =>
      products.filter(
        (p) =>
          p.live &&
          (water === "meer") === marine.has(p.slug) &&
          liters >= (minLiters[p.slug] ?? 9999) &&
          (level === "erfahren" || !expert.has(p.slug)),
      ),
    [water, liters, level],
  );

  return (
    <div className="grid gap-8 rounded-[24px] bg-white p-6 ring-1 ring-ink/5 md:grid-cols-12 md:p-10">
      <div className="space-y-7 md:col-span-5">
        <div>
          <p className="text-[15px] font-bold">Welches Wasser?</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(
              [
                ["suess", "Süßwasser"],
                ["meer", "Meerwasser"],
              ] as const
            ).map(([v, l]) => (
              <button
                key={v}
                type="button"
                aria-pressed={water === v}
                onClick={() => {
                  setWater(v);
                  if (v === "meer" && liters < 150) setLiters(150);
                }}
                className={`rounded-[12px] border px-4 py-3 font-semibold ${water === v ? "border-navy bg-navy text-white" : "border-ink/15"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="flex justify-between text-[15px]">
            <span className="font-bold">Beckengröße</span>
            <span className="font-bold text-sky">{liters} Liter</span>
          </span>
          <input type="range" min={10} max={600} step={10} value={liters} onChange={(e) => setLiters(Number(e.target.value))} className="mt-3 w-full accent-sky" />
        </label>
        <div>
          <p className="text-[15px] font-bold">Deine Erfahrung</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(
              [
                ["neu", "Einsteiger"],
                ["erfahren", "Erfahren"],
              ] as const
            ).map(([v, l]) => (
              <button
                key={v}
                type="button"
                aria-pressed={level === v}
                onClick={() => setLevel(v)}
                className={`rounded-[12px] border px-4 py-3 font-semibold ${level === v ? "border-navy bg-navy text-white" : "border-ink/15"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <p className="text-[13px] leading-relaxed text-mist">
          Vereinfachte Empfehlung – Wasserwerte und Vergesellschaftung besprechen wir immer persönlich im Laden.
        </p>
      </div>
      <div className="md:col-span-7" aria-live="polite">
        <p className="text-[15px] font-bold">
          {result.length > 0 ? `${result.length} passende Bewohner` : "Für diese Kombination haben wir gerade nichts Passendes."}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {result.map((p) => (
            <Link key={p.slug} href={`/shop/${p.slug}`} className="group flex items-center gap-4 rounded-[16px] p-2 ring-1 ring-ink/5 transition-colors hover:bg-pearl">
              <span className="block h-16 w-24 shrink-0 overflow-hidden rounded-[12px] p-1.5" style={{ background: artBackground(p.art) }}>
                <ProductArt art={p.art} />
              </span>
              <span>
                <span className="block font-bold leading-tight text-navy">{p.name}</span>
                <span className="text-[12.5px] text-mist">ab {minLiters[p.slug]} Liter</span>
              </span>
            </Link>
          ))}
        </div>
        {water === "suess" && liters < 54 && (
          <p className="mt-4 rounded-[12px] bg-moss/10 p-4 text-[14px] text-kelp">
            Tipp: In kleinen Becken fühlen sich Garnelen, Schnecken oder ein einzelner Kampffisch am wohlsten.
          </p>
        )}
      </div>
    </div>
  );
}
