"use client";

import { useState } from "react";
import { ShowroomScene } from "./three/Lazy";
import type { ShowroomFocus } from "./three/ShowroomScene";

const views: { id: ShowroomFocus; label: string }[] = [
  { id: "gesamt", label: "Gesamtansicht" },
  { id: "werbeplatte", label: "Werbeplatte" },
  { id: "raumobjekt", label: "Raumobjekt" },
];

export function Showroom() {
  const [focus, setFocus] = useState<ShowroomFocus>("gesamt");
  const [led, setLed] = useState(true);
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[#e9eef1] ring-1 ring-ink/5">
      <div className="h-[64svh] min-h-[420px] md:h-[78vh]">
        <ShowroomScene focus={focus} led={led} />
      </div>
      <div className="absolute inset-x-3 bottom-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between md:inset-x-5 md:bottom-5">
        <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-full bg-white/85 p-1 backdrop-blur" role="tablist" aria-label="Ansicht wählen">
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={focus === v.id}
              onClick={() => setFocus(v.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${focus === v.id ? "bg-navy text-white" : "text-navy hover:bg-navy/5"}`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setLed((l) => !l)}
          aria-pressed={led}
          className="flex items-center gap-3 self-start rounded-full bg-white/85 py-2 pl-2 pr-4 text-[13px] font-bold text-navy backdrop-blur sm:self-auto"
        >
          <span className={`relative h-6 w-10 rounded-full transition-colors ${led ? "bg-sky" : "bg-stone/50"}`}>
            <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${led ? "left-5" : "left-1"}`} />
          </span>
          LED-Beleuchtung
        </button>
      </div>
      <p className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1.5 text-[12px] font-semibold text-navy backdrop-blur md:left-5 md:top-5">
        3D · ziehen zum Umsehen
      </p>
    </div>
  );
}
