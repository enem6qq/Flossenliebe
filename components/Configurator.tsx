"use client";

import { useMemo, useState } from "react";
import { ConfiguratorScene } from "./three/Lazy";
import { BackdropPreview } from "./BackdropPreview";
import { useCart } from "./CartProvider";
import { backdropStyles, priceFor, type BackdropConfig, type BackdropStyle } from "@/lib/backdrop";
import { formatPrice } from "@/lib/format";

const presets = [
  { label: "Nano 30 × 35", w: 30, h: 35, d: 30 },
  { label: "60 × 35", w: 60, h: 35, d: 30 },
  { label: "80 × 40", w: 80, h: 40, d: 35 },
  { label: "100 × 50", w: 100, h: 50, d: 40 },
  { label: "120 × 50", w: 120, h: 50, d: 40 },
  { label: "150 × 60", w: 150, h: 60, d: 50 },
];

export function Configurator() {
  const { add } = useCart();
  const [cfg, setCfg] = useState<BackdropConfig>({
    style: "tropfen",
    colors: backdropStyles[0].colors,
    width: 100,
    height: 50,
    depth: 40,
    thickness: 3,
    led: true,
    mounting: false,
    seed: 12,
  });
  const set = <K extends keyof BackdropConfig>(k: K, v: BackdropConfig[K]) => setCfg((c) => ({ ...c, [k]: v }));
  const price = useMemo(() => priceFor(cfg), [cfg]);
  const style = backdropStyles.find((s) => s.id === cfg.style)!;

  const chooseStyle = (id: BackdropStyle) => {
    const s = backdropStyles.find((x) => x.id === id)!;
    setCfg((c) => ({ ...c, style: id, colors: s.colors }));
  };

  const addToCart = () =>
    add({
      id: `rueckwand-${cfg.style}-${cfg.width}x${cfg.height}-${cfg.colors.join("")}-${cfg.thickness}-${cfg.led}-${cfg.mounting}-${cfg.seed}`,
      name: `Plexiglas-Rückwand „${style.name}“`,
      price,
      note: `${cfg.width} × ${cfg.height} cm · ${cfg.thickness} mm · Farben ${cfg.colors.join(" / ")}${cfg.led ? " · LED" : ""}${cfg.mounting ? " · Montage" : ""}`,
    });

  return (
    <div className="grid lg:grid-cols-12">
      <div className="relative h-[62svh] min-h-[380px] bg-[#e9f0f4] lg:sticky lg:top-0 lg:col-span-8 lg:h-[100svh]">
        <ConfiguratorScene config={cfg} />
        <div className="pointer-events-none absolute left-4 top-[88px] rounded-full bg-white/80 px-4 py-2 text-[12.5px] font-semibold text-navy backdrop-blur md:left-8 md:top-[104px]">
          Ziehen zum Drehen · Zoomen mit Mausrad / zwei Fingern
        </div>
      </div>

      <div className="bg-pearl lg:col-span-4">
        <div className="space-y-10 px-5 py-10 md:px-10 lg:pt-[120px]">
          <div>
            <p className="eyebrow text-sky">Rückwand-Konfigurator</p>
            <h1 className="display mt-3 text-[38px] text-navy md:text-[46px]">
              Deine Rückwand, <em>in 3D.</em>
            </h1>
            <p className="mt-3 leading-relaxed text-mist">
              Wähle Motiv, Farben und Maße – die Vorschau zeigt dir sofort, wie die Rückwand an deinem Becken wirkt. Jede
              Rückwand wird bei uns von Hand lackiert und passgenau zugeschnitten.
            </p>
          </div>

          <fieldset>
            <legend className="text-[15px] font-bold">1 · Motiv</legend>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {backdropStyles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => chooseStyle(s.id)}
                  aria-pressed={cfg.style === s.id}
                  className={`overflow-hidden rounded-[14px] bg-white text-left ring-2 transition-all ${
                    cfg.style === s.id ? "ring-sky" : "ring-transparent hover:ring-ink/15"
                  }`}
                >
                  <BackdropPreview style={s.id} className="aspect-[2/1]" seed={3} />
                  <span className="block px-3 py-2 text-[13px] font-semibold">{s.name}</span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-mist">{style.text}</p>
          </fieldset>

          <fieldset>
            <legend className="text-[15px] font-bold">2 · Farben</legend>
            <div className="mt-4 flex flex-wrap gap-4">
              {(["Grundfarbe", "Effektfarbe"] as const).map((label, i) => (
                <label key={label} className="flex items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-4 ring-1 ring-ink/10">
                  <input
                    type="color"
                    value={cfg.colors[i]}
                    onChange={(e) => {
                      const c = [...cfg.colors] as [string, string];
                      c[i] = e.target.value;
                      set("colors", c);
                    }}
                    className="h-9 w-9 cursor-pointer rounded-full border-0 bg-transparent p-0"
                  />
                  <span className="text-[14px] font-semibold">{label}</span>
                </label>
              ))}
              <button type="button" className="text-[14px] font-semibold text-sky underline-offset-4 hover:underline" onClick={() => set("seed", Math.floor(Math.random() * 9999))}>
                Muster neu mischen
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[15px] font-bold">3 · Maße (Breite × Höhe in cm)</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setCfg((c) => ({ ...c, width: p.w, height: p.h, depth: p.d }))}
                  className={`chip border px-3.5 py-2 ${cfg.width === p.w && cfg.height === p.h ? "border-navy bg-navy text-white" : "border-ink/15 bg-white"}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="mt-5 space-y-4">
              {(
                [
                  ["Breite", "width", 30, 200],
                  ["Höhe", "height", 25, 80],
                  ["Beckentiefe (Vorschau)", "depth", 25, 70],
                ] as const
              ).map(([label, key, min, max]) => (
                <label key={key} className="block">
                  <span className="flex justify-between text-[14px]">
                    <span className="text-mist">{label}</span>
                    <span className="font-bold">{cfg[key]} cm</span>
                  </span>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={5}
                    value={cfg[key]}
                    onChange={(e) => set(key, Number(e.target.value))}
                    className="mt-2 w-full accent-sky"
                  />
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[15px] font-bold">4 · Ausführung</legend>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {([3, 5] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set("thickness", t)}
                  aria-pressed={cfg.thickness === t}
                  className={`rounded-[12px] border px-4 py-3 text-left ${cfg.thickness === t ? "border-navy bg-navy text-white" : "border-ink/15 bg-white"}`}
                >
                  <span className="block font-bold">{t} mm</span>
                  <span className={`text-[12.5px] ${cfg.thickness === t ? "text-white/70" : "text-mist"}`}>{t === 3 ? "Standard" : "extra stabil, ab 120 cm"}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {(
                [
                  ["led", "LED-Hinterleuchtung", "+ 79 €"],
                  ["mounting", "Montage bei dir zu Hause", "+ 49 €"],
                ] as const
              ).map(([key, label, extra]) => (
                <label key={key} className="flex cursor-pointer items-center justify-between gap-4 rounded-[12px] bg-white px-4 py-3 ring-1 ring-ink/10">
                  <span className="flex items-center gap-3">
                    <input type="checkbox" checked={cfg[key]} onChange={(e) => set(key, e.target.checked)} className="h-5 w-5 accent-sky" />
                    <span className="font-semibold">{label}</span>
                  </span>
                  <span className="text-[14px] text-mist">{extra}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="sticky bottom-0 -mx-5 border-t border-ink/10 bg-pearl/95 px-5 py-5 backdrop-blur md:-mx-10 md:px-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[13px] text-mist">
                  {cfg.width} × {cfg.height} cm · {cfg.thickness} mm
                </p>
                <p className="display text-[36px] text-navy">{formatPrice(price)}</p>
              </div>
              <button type="button" className="btn btn-primary" onClick={addToCart}>
                In den Warenkorb
              </button>
            </div>
            <p className="mt-2 text-[12px] text-mist">Fertigung ca. 10 Werktage · Preise frei erfunden (fiktives Projekt)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
