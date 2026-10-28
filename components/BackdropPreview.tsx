"use client";

import { useEffect, useRef } from "react";
import { backdropStyles, drawBackdrop, type BackdropStyle } from "@/lib/backdrop";

export function BackdropPreview({
  style,
  colors,
  seed = 7,
  className = "",
}: {
  style: BackdropStyle;
  colors?: [string, string];
  seed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const c = colors ?? backdropStyles.find((s) => s.id === style)!.colors;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    el.width = Math.max(200, Math.round(rect.width * dpr));
    el.height = Math.max(100, Math.round(rect.height * dpr));
    drawBackdrop(el, style, c, seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style, c[0], c[1], seed]);
  return <canvas ref={ref} className={`block w-full ${className}`} aria-hidden />;
}
