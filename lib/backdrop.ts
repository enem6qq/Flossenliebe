// Erzeugt Rückwand-Motive als Canvas – angelehnt an die Lacktechniken aus der Roten Mappe.

export type BackdropStyle = "tropfen" | "pflanzen" | "tiefsee" | "felsen" | "lais";

export const backdropStyles: { id: BackdropStyle; name: string; text: string; colors: [string, string] }[] = [
  {
    id: "tropfen",
    name: "Wassertropfen",
    text: "Weiß & Dunkelblau in Wassertropfentechnik – Formen wie Tropfen und aufsteigende Luftblasen.",
    colors: ["#0b2e5e", "#ffffff"],
  },
  {
    id: "pflanzen",
    name: "Pflanzenwelt",
    text: "Hell- und Dunkelgrün zu einem lebendigen Hintergrund kombiniert.",
    colors: ["#1d5a28", "#8fd16d"],
  },
  {
    id: "tiefsee",
    name: "Tiefsee-Verlauf",
    text: "Ein ruhiger Verlauf von Tiefblau zu Lagune – lässt jedes Becken tiefer wirken.",
    colors: ["#05162d", "#2aa7d8"],
  },
  {
    id: "felsen",
    name: "Felsenküste",
    text: "Geschichtete Steinlagen in Grautönen – ideal für Buntbarsch- und Tanganjika-Becken.",
    colors: ["#3f454b", "#a7adb2"],
  },
  {
    id: "lais",
    name: "Florale Laistechnik",
    text: "Blüten und Ranken mit Schablone lackiert – wie auf unserem Lowboard im Verkaufsraum.",
    colors: ["#f3f7f9", "#3f9a36"],
  },
];

function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function drawBackdrop(
  canvas: HTMLCanvasElement,
  style: BackdropStyle,
  colors: [string, string],
  seed = 42,
  opts: { transparentDrops?: boolean } = {},
) {
  const ctx = canvas.getContext("2d")!;
  const W = canvas.width;
  const H = canvas.height;
  const r = rng(seed);
  const [a, b] = colors;
  ctx.clearRect(0, 0, W, H);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";

  if (style === "tropfen") {
    if (!opts.transparentDrops) {
      ctx.fillStyle = a;
      ctx.fillRect(0, 0, W, H);
    }
    // Weiße Schleier
    for (let i = 0; i < 16; i++) {
      const x = r() * W;
      const y = r() * H;
      const rad = (0.08 + r() * 0.2) * W;
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, hexA(b, opts.transparentDrops ? 0.2 : 0.24));
      g.addColorStop(1, hexA(b, 0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }
    // Tropfen / Zellen: dunkle Kerne mit hellem Rand
    const n = Math.round((W * H) / 2600);
    for (let i = 0; i < n; i++) {
      const x = r() * W;
      const yBias = Math.pow(r(), 0.8);
      const y = H - yBias * H;
      const rad = (2 + Math.pow(r(), 2.4) * 34) * (W / 1024);
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fillStyle = hexA(b, 0.85);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + rad * 0.06, y + rad * 0.04, rad * (0.62 + r() * 0.2), 0, Math.PI * 2);
      ctx.fillStyle = opts.transparentDrops ? "rgba(0,0,0,1)" : a;
      if (opts.transparentDrops) ctx.globalCompositeOperation = "destination-out";
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      if (r() > 0.6) {
        ctx.beginPath();
        ctx.arc(x - rad * 0.3, y - rad * 0.3, rad * 0.12, 0, Math.PI * 2);
        ctx.fillStyle = hexA("#ffffff", 0.7);
        ctx.fill();
      }
    }
  } else if (style === "pflanzen") {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, b);
    g.addColorStop(1, a);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 140; i++) {
      const x = r() * W;
      const h = (0.3 + r() * 0.7) * H;
      ctx.beginPath();
      ctx.moveTo(x, H);
      const sway = (r() - 0.5) * 120 * (W / 1024);
      ctx.bezierCurveTo(x + sway, H - h * 0.4, x - sway, H - h * 0.7, x + sway * 0.6, H - h);
      ctx.strokeStyle = hexA(r() > 0.5 ? a : b, 0.25 + r() * 0.35);
      ctx.lineWidth = (3 + r() * 9) * (W / 1024);
      ctx.lineCap = "round";
      ctx.stroke();
    }
    softDots(ctx, W, H, r, "#ffffff", 40, 0.15);
  } else if (style === "tiefsee") {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, b);
    g.addColorStop(1, a);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 9; i++) {
      const x = r() * W;
      const w = (20 + r() * 90) * (W / 1024);
      const lg = ctx.createLinearGradient(0, 0, 0, H);
      lg.addColorStop(0, "rgba(200,240,255,0.22)");
      lg.addColorStop(1, "rgba(200,240,255,0)");
      ctx.fillStyle = lg;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + w, 0);
      ctx.lineTo(x + w * 2.4 - W * 0.12, H);
      ctx.lineTo(x - W * 0.12, H);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
    softDots(ctx, W, H, r, "#ffffff", 60, 0.25);
  } else if (style === "felsen") {
    ctx.fillStyle = b;
    ctx.fillRect(0, 0, W, H);
    for (let layer = 0; layer < 6; layer++) {
      const base = H * (0.25 + layer * 0.14);
      ctx.beginPath();
      ctx.moveTo(0, H);
      let x = 0;
      ctx.lineTo(0, base);
      while (x < W) {
        x += (40 + r() * 120) * (W / 1024);
        ctx.lineTo(x, base - r() * H * 0.18);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = mix(b, a, 0.15 + layer * 0.16);
      ctx.fill();
    }
    softDots(ctx, W, H, r, "#ffffff", 30, 0.08);
  } else if (style === "lais") {
    ctx.fillStyle = a;
    ctx.fillRect(0, 0, W, H);
    laisPattern(ctx, W, H, r, b);
  }
}

// Florales Spitzenmuster (Tischläufer als Schablone)
export function laisPattern(ctx: CanvasRenderingContext2D, W: number, H: number, r: () => number, color: string) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  const step = W / 7;
  for (let gx = -1; gx < 8; gx++) {
    for (let gy = -1; gy < Math.ceil(H / step) + 1; gy++) {
      const cx = gx * step + (gy % 2) * step * 0.5;
      const cy = gy * step;
      const R = step * 0.22;
      // Blüte
      for (let p = 0; p < 6; p++) {
        const ang = (p / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.ellipse(cx + Math.cos(ang) * R, cy + Math.sin(ang) * R, R * 0.55, R * 0.28, ang, 0, Math.PI * 2);
        ctx.globalAlpha = 0.85;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fill();
      ctx.fillStyle = color;
      // Ranken
      ctx.lineWidth = Math.max(1.5, step * 0.02);
      ctx.beginPath();
      ctx.moveTo(cx + R * 1.2, cy);
      ctx.bezierCurveTo(cx + step * 0.3, cy - step * 0.25, cx + step * 0.45, cy + step * 0.2, cx + step * 0.5, cy + step * 0.5);
      ctx.stroke();
      // Blätter an der Ranke
      for (let l = 0; l < 3; l++) {
        const t = 0.3 + l * 0.22;
        const lx = cx + step * 0.5 * t + R;
        const ly = cy + (r() - 0.5) * step * 0.3;
        ctx.beginPath();
        ctx.ellipse(lx, ly, step * 0.06, step * 0.025, r() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  ctx.globalAlpha = 1;
}

function softDots(ctx: CanvasRenderingContext2D, W: number, H: number, r: () => number, color: string, n: number, alpha: number) {
  for (let i = 0; i < n; i++) {
    const x = r() * W;
    const y = r() * H;
    const rad = (1 + r() * 6) * (W / 1024);
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.strokeStyle = hexA(color, alpha + r() * alpha);
    ctx.lineWidth = Math.max(1, rad * 0.25);
    ctx.stroke();
  }
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function hexA(hex: string, a: number) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}
function mix(h1: string, h2: string, t: number) {
  const a = hexToRgb(h1);
  const b = hexToRgb(h2);
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

export type BackdropConfig = {
  style: BackdropStyle;
  colors: [string, string];
  width: number; // cm
  height: number; // cm
  depth: number; // cm (Beckentiefe, nur Vorschau)
  thickness: 3 | 5;
  led: boolean;
  mounting: boolean;
  seed: number;
};

export function priceFor(c: BackdropConfig) {
  const area = (c.width * c.height) / 10000; // m²
  const perSqm = c.thickness === 5 ? 249 : 199;
  const base = 59;
  const special = c.style === "tropfen" || c.style === "lais" ? 30 : 0; // aufwendigere Lacktechnik
  let total = base + Math.max(area, 0.12) * perSqm + special;
  if (c.led) total += 79;
  if (c.mounting) total += 49;
  return Math.ceil(total);
}
