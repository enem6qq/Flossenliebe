import { useId } from "react";
import type { FishShape, ProductArt as Art } from "@/lib/products";

// Gezeichnete Produktbilder im Stil des Logos: flache Formen, klare Farben, Luftblasen.

const BODY: Record<FishShape, string> = {
  slim: "M40,60 C60,40 118,36 150,52 C160,56 160,64 150,68 C118,84 60,80 40,60Z",
  cichlid: "M44,62 C52,34 102,20 140,36 C158,44 166,56 161,66 C150,84 100,92 44,62Z",
  tall: "M58,60 C80,36 126,38 152,58 C126,82 80,84 58,60Z",
  disc: "M52,60 C52,18 150,18 156,60 C150,102 52,102 52,60Z",
  cat: "M40,64 C56,40 120,38 156,58 C161,62 159,70 150,72 C110,80 60,80 40,64Z",
  betta: "M74,60 C88,47 126,46 146,56 C151,60 149,64 146,66 C126,74 88,73 74,60Z",
  clown: "M46,60 C56,32 126,30 151,54 C158,60 157,66 151,70 C126,90 56,88 46,60Z",
  tang: "M46,60 C56,26 130,22 158,56 C161,62 159,66 152,70 C130,96 56,95 46,60Z",
  goby: "M46,62 C60,42 120,40 152,56 C158,62 156,68 148,72 C115,84 60,82 46,62Z",
  livebearer: "M64,60 C78,47 120,45 148,56 C154,60 152,64 148,66 C120,75 78,73 64,60Z",
};

const TAIL: Record<FishShape, string> = {
  slim: "M44,60 L16,42 L24,60 L16,78Z",
  cichlid: "M48,62 L18,40 L27,62 L18,86Z",
  tall: "M60,60 L34,40 L42,60 L34,80Z",
  disc: "M54,60 L36,46 L40,60 L36,74Z",
  cat: "M44,64 L18,46 L26,64 L18,80Z",
  betta: "M76,60 C40,4 2,26 8,60 C2,94 40,116 76,60Z",
  clown: "M50,60 C34,40 22,42 24,60 C22,78 34,80 50,60Z",
  tang: "M50,60 L22,36 L32,60 L22,84Z",
  goby: "M50,62 C34,44 18,48 20,62 C18,76 34,80 50,62Z",
  livebearer: "M66,60 L18,28 C8,50 8,70 18,92Z",
};

const FINS: Partial<Record<FishShape, string>> = {
  cichlid: "M66,40 C88,16 122,18 140,36 L120,34 Z M80,82 C92,96 112,94 118,84Z",
  tall: "M86,44 L72,2 L124,46Z M86,76 L72,118 L124,74Z",
  disc: "M70,30 C100,10 130,14 148,36Z M70,90 C100,110 130,106 148,84Z",
  betta: "M84,52 C92,20 126,20 132,50Z M84,68 C96,104 126,100 132,70Z",
  tang: "M62,36 C90,18 130,20 150,44Z M64,84 C90,102 126,98 146,78Z",
  goby: "M70,48 C78,18 104,16 112,46Z",
  clown: "M76,38 C92,24 118,26 132,40Z",
  slim: "M92,42 L100,30 L108,42Z",
  cat: "M88,44 L98,26 L108,44Z",
  livebearer: "M96,50 L112,40 L120,52Z",
};

function Bubbles({ color = "#ffffff" }: { color?: string }) {
  return (
    <g fill="none" stroke={color} strokeOpacity="0.55" strokeWidth="1.4">
      <circle cx="168" cy="40" r="4" />
      <circle cx="178" cy="26" r="2.6" />
      <circle cx="170" cy="14" r="3.4" />
    </g>
  );
}

function Fish({ art }: { art: Extract<Art, { kind: "fish" }> }) {
  const id = useId().replace(/:/g, "");
  const { shape, pattern, body, accent, fin } = art;
  const clip = `b${id}`;
  const shade = `s${id}`;
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={clip}>
          <path d={BODY[shape]} />
        </clipPath>
        <linearGradient id={shade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.18" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <path d={TAIL[shape]} fill={fin} opacity={shape === "betta" || shape === "livebearer" ? 0.95 : 0.9} />
      {FINS[shape] && <path d={FINS[shape]} fill={fin} opacity="0.85" />}
      <path d={BODY[shape]} fill={body} />
      <g clipPath={`url(#${clip})`}>
        {pattern === "neon" && (
          <>
            <rect x="50" y="50" width="110" height="7" rx="3.5" fill={accent} />
            <rect x="30" y="60" width="62" height="16" fill="#e8283a" />
          </>
        )}
        {pattern === "redneon" && (
          <>
            <rect x="50" y="50" width="110" height="7" rx="3.5" fill={accent} />
            <rect x="30" y="60" width="122" height="22" fill="#e8283a" />
          </>
        )}
        {pattern === "stripes" &&
          (shape === "cichlid"
            ? [62, 82, 102, 122, 146].map((x) => <rect key={x} x={x} y="10" width={x === 146 ? 9 : 11} height="100" fill={accent} />)
            : shape === "tall"
              ? [78, 104, 134].map((x) => <rect key={x} x={x} y="0" width={x === 104 ? 8 : 5} height="120" fill={accent} />)
              : Array.from({ length: 9 }, (_, i) => (
                  <path
                    key={i}
                    d={`M${58 + i * 11},10 q6,25 0,50 q-6,25 0,50`}
                    stroke={accent}
                    strokeWidth="3"
                    fill="none"
                    opacity="0.85"
                  />
                )))}
        {pattern === "clown" &&
          [70, 104, 138].map((x) => (
            <g key={x}>
              <rect x={x - 7} y="0" width="14" height="120" rx="7" fill="#111" />
              <rect x={x - 5} y="0" width="10" height="120" rx="5" fill={accent} />
            </g>
          ))}
        {pattern === "tang" && (
          <>
            <path d="M60,46 C90,30 130,34 150,50 C130,46 110,52 96,62 C84,70 70,66 60,58Z" fill={accent} />
            <circle cx="122" cy="62" r="9" fill={body} />
            <path d="M42,52 L70,60 L42,70Z" fill="#ffd21a" />
          </>
        )}
        {pattern === "mandarin" &&
          Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              d={`M${50 + i * 13},44 c6,8 -6,14 0,22 c6,8 -6,14 0,22`}
              stroke={accent}
              strokeWidth="3.4"
              fill="none"
            />
          ))}
        {pattern === "guppy" && (
          <>
            <circle cx="92" cy="58" r="6" fill={accent} />
            <circle cx="112" cy="64" r="4" fill="#111" opacity="0.7" />
            <circle cx="126" cy="56" r="4" fill={accent} />
          </>
        )}
        {pattern === "spots" &&
          [70, 90, 110, 130].map((x, i) => <circle key={x} cx={x} cy={52 + (i % 2) * 12} r="3.5" fill={accent} />)}
        {pattern === "betta" && <rect x="70" y="40" width="90" height="40" fill={accent} opacity="0.25" />}
        <rect x="0" y="0" width="200" height="120" fill={`url(#${shade})`} />
      </g>
      {shape === "betta" && <path d="M78,60 C50,30 30,40 34,60 C30,80 50,90 78,60Z" fill={accent} opacity="0.35" />}
      {shape === "livebearer" && (
        <path d="M60,60 L26,40 C20,54 20,66 26,80Z" fill={accent} opacity="0.55" />
      )}
      {shape === "cat" && (
        <g stroke="#6b5233" strokeWidth="1.4" strokeLinecap="round">
          <path d="M152,68 l8,6" />
          <path d="M150,70 l5,8" />
        </g>
      )}
      <circle cx={shape === "disc" ? 140 : shape === "cichlid" ? 146 : 142} cy={shape === "cichlid" ? 52 : 56} r="5.4" fill="#fff" />
      <circle cx={shape === "disc" ? 141 : shape === "cichlid" ? 147 : 143} cy={shape === "cichlid" ? 52 : 56} r="2.8" fill="#0a1628" />
      <Bubbles />
    </svg>
  );
}

function Shrimp({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <g fill={color}>
        <path d="M150,58 C150,40 120,32 96,36 C72,40 56,52 50,66 C46,76 54,84 62,78 C70,70 80,66 92,68 C110,72 122,78 136,72 C146,68 150,64 150,58Z" />
        <path d="M54,72 C40,74 30,84 34,92 L48,84 Z" opacity="0.85" />
      </g>
      <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.8">
        <path d="M150,52 C170,40 186,30 196,18" />
        <path d="M150,56 C172,52 186,46 198,44" />
        {[86, 98, 110, 122].map((x) => (
          <path key={x} d={`M${x},72 l-4,14`} />
        ))}
      </g>
      <g stroke="#fff" strokeOpacity="0.35" strokeWidth="2" fill="none">
        {[76, 92, 108, 124].map((x) => (
          <path key={x} d={`M${x},40 C${x - 6},52 ${x - 6},62 ${x},72`} />
        ))}
      </g>
      <circle cx="140" cy="50" r="3.4" fill="#0a1628" />
      <Bubbles />
    </svg>
  );
}

function Snail({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <path d="M50,92 C60,84 130,84 150,92 C140,100 60,100 50,92Z" fill="#6c5a45" />
      <circle cx="100" cy="66" r="30" fill={color} />
      <g stroke="#1b1b1b" strokeWidth="3.4" fill="none" opacity="0.85">
        <path d="M80,44 C90,60 90,76 82,90" />
        <path d="M96,37 C108,56 108,80 98,96" />
        <path d="M114,40 C124,58 124,80 116,94" />
      </g>
      <path d="M140,88 l14,-14 M144,90 l16,-8" stroke="#6c5a45" strokeWidth="3" strokeLinecap="round" />
      <Bubbles />
    </svg>
  );
}

function Plant({ variant }: { variant: Extract<Art, { kind: "plant" }>["variant"] }) {
  const g1 = "#4ca83d";
  const g2 = "#2f7a2c";
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <ellipse cx="100" cy="112" rx="70" ry="6" fill="#000" opacity="0.15" />
      {variant === "vallis" &&
        Array.from({ length: 9 }, (_, i) => {
          const x = 64 + i * 9;
          return (
            <path
              key={i}
              d={`M${x},112 C${x - 10},80 ${x + 14},50 ${x - 4 + (i % 3) * 6},${8 + (i % 4) * 6}`}
              stroke={i % 2 ? g1 : g2}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          );
        })}
      {variant === "anubias" && (
        <>
          <path d="M40,104 C80,96 130,98 166,106" stroke="#7a5a3a" strokeWidth="10" strokeLinecap="round" fill="none" />
          {[
            [70, 60, -20],
            [96, 46, 0],
            [124, 58, 20],
            [84, 76, -40],
            [114, 78, 40],
          ].map(([x, y, r], i) => (
            <g key={i} transform={`rotate(${r} ${x} ${y + 30})`}>
              <path d={`M${x},${y + 36} L${x},${y + 14}`} stroke={g2} strokeWidth="3" />
              <ellipse cx={x} cy={y} rx="13" ry="20" fill={i % 2 ? g2 : g1} />
              <path d={`M${x},${y - 16} L${x},${y + 16}`} stroke="#fff" strokeOpacity="0.3" strokeWidth="1.4" />
            </g>
          ))}
        </>
      )}
      {variant === "fern" &&
        [-36, -18, 0, 18, 36].map((r, i) => (
          <g key={i} transform={`rotate(${r} 100 108)`}>
            <path d="M100,108 C96,70 104,40 100,10 C112,40 112,80 100,108Z" fill={i % 2 ? g2 : g1} />
            <path d="M100,104 L100,18" stroke="#1d5220" strokeWidth="1.4" />
          </g>
        ))}
      {variant === "crypt" &&
        [-50, -28, -10, 10, 28, 50].map((r, i) => (
          <g key={i} transform={`rotate(${r} 100 110)`}>
            <path d="M100,110 L100,64" stroke="#5a4a2a" strokeWidth="3" />
            <path d="M100,70 C84,56 88,30 100,22 C112,30 116,56 100,70Z" fill={i % 2 ? "#6b7a2e" : g2} />
          </g>
        ))}
      {(variant === "moss" || variant === "carpet") && (
        <g>
          <path d="M40,100 C50,80 80,70 100,74 C130,68 160,84 164,100Z" fill="#5d5e60" />
          {Array.from({ length: 40 }, (_, i) => (
            <circle key={i} cx={46 + ((i * 37) % 116)} cy={82 - ((i * 13) % 22) + (i % 3) * 4} r={6 + (i % 4)} fill={i % 3 ? g1 : g2} opacity="0.9" />
          ))}
        </g>
      )}
      <Bubbles />
    </svg>
  );
}

function Tank({ size }: { size: "nano" | "m" | "l" | "reef" }) {
  const dims = { nano: [70, 44, 60, 62], m: [46, 40, 108, 56], l: [28, 34, 144, 62], reef: [28, 30, 144, 66] }[size];
  const [x, y, w, h] = dims;
  const reef = size === "reef";
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`w-${size}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={reef ? "#38b6e8" : "#5ec3a8"} stopOpacity="0.55" />
          <stop offset="1" stopColor={reef ? "#0b4e9e" : "#1d6b5e"} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={`url(#w-${size})`} stroke="#d8eef8" strokeWidth="2" />
      <rect x={x + 2} y={y + h - 10} width={w - 4} height="8" fill={reef ? "#efe6d0" : "#c9b48c"} />
      {reef ? (
        <>
          <path d={`M${x + 20},${y + h - 10} c0,-16 10,-20 8,-30 M${x + 26},${y + h - 22} c6,-4 8,-10 14,-12`} stroke="#ff7aa8" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx={x + w - 34} cy={y + h - 18} r="10" fill="#c7e86a" opacity="0.9" />
          <path d={`M${x + 60},${y + 30} l10,6 l-10,6 z`} fill="#ff7a1a" />
        </>
      ) : (
        Array.from({ length: Math.round(w / 14) }, (_, i) => (
          <path
            key={i}
            d={`M${x + 8 + i * 14},${y + h - 10} C${x + 4 + i * 14},${y + h - 30} ${x + 14 + i * 14},${y + h - 40} ${x + 8 + i * 14},${y + 10 + (i % 3) * 8}`}
            stroke={i % 2 ? "#4ca83d" : "#2f7a2c"}
            strokeWidth="3"
            fill="none"
          />
        ))
      )}
      <rect x={x - 3} y={y - 5} width={w + 6} height="5" rx="2" fill="#0b2e5e" />
      {(size === "l" || size === "reef") && <rect x={x} y={y + h} width={w} height={120 - y - h - 4} fill="#f3f7f9" stroke="#c8d3da" />}
      <path d={`M${x + 6},${y + 6} L${x + 20},${y + h - 16}`} stroke="#fff" strokeOpacity="0.35" strokeWidth="3" />
    </svg>
  );
}

function Gear({ kind }: { kind: "filter" | "light" | "heater" | "co2" | "test" | "food" | "conditioner" }) {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      {kind === "filter" && (
        <g>
          <rect x="70" y="30" width="60" height="78" rx="10" fill="#e9eef1" stroke="#0b2e5e" strokeWidth="2" />
          <rect x="66" y="22" width="68" height="16" rx="6" fill="#0b2e5e" />
          {[52, 66, 80, 94].map((y) => (
            <rect key={y} x="78" y={y} width="44" height="8" rx="3" fill={y === 52 ? "#1e9bd7" : y === 66 ? "#4ca83d" : "#c8d3da"} />
          ))}
          <path d="M84,22 C84,6 60,6 52,18 M116,22 C116,6 140,6 148,18" stroke="#8c9196" strokeWidth="4" fill="none" />
        </g>
      )}
      {kind === "light" && (
        <g>
          <rect x="22" y="34" width="156" height="12" rx="6" fill="#0b2e5e" />
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx={34 + i * 12} cy="46" r="3" fill="#fffbe0" />
          ))}
          <path d="M30,48 L10,112 L190,112 L170,48Z" fill="#fff6c4" opacity="0.35" />
        </g>
      )}
      {kind === "heater" && (
        <g transform="rotate(-20 100 60)">
          <rect x="88" y="10" width="24" height="96" rx="12" fill="#dfe8ee" stroke="#8c9196" strokeWidth="2" />
          <rect x="94" y="30" width="12" height="60" rx="6" fill="#ff7a1a" opacity="0.7" />
          <rect x="86" y="4" width="28" height="14" rx="5" fill="#0b2e5e" />
        </g>
      )}
      {kind === "co2" && (
        <g>
          <rect x="70" y="30" width="34" height="82" rx="14" fill="#8c9196" />
          <rect x="78" y="16" width="18" height="18" rx="4" fill="#0b2e5e" />
          <circle cx="132" cy="64" r="12" fill="#e9eef1" stroke="#0b2e5e" strokeWidth="2" />
          <path d="M96,24 C120,24 130,40 132,52" stroke="#4ca83d" strokeWidth="3" fill="none" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={152 + i * 4} cy={58 - i * 14} r={3 + i} fill="none" stroke="#1e9bd7" strokeWidth="1.6" />
          ))}
        </g>
      )}
      {kind === "test" && (
        <g>
          <rect x="34" y="40" width="132" height="66" rx="8" fill="#0b2e5e" />
          {["#ffd21a", "#4ca83d", "#1e9bd7", "#e8283a", "#9b59b6", "#ff7a1a"].map((c, i) => (
            <g key={c}>
              <rect x={46 + i * 20} y="24" width="12" height="62" rx="4" fill="#f3f7f9" />
              <rect x={46 + i * 20} y="56" width="12" height="30" rx="4" fill={c} opacity="0.85" />
            </g>
          ))}
        </g>
      )}
      {(kind === "food" || kind === "conditioner") && (
        <g>
          <rect x="72" y="28" width="56" height="82" rx="12" fill={kind === "food" ? "#f3f7f9" : "#e6f4fb"} stroke="#0b2e5e" strokeWidth="2" />
          <rect x="76" y="16" width="48" height="16" rx="6" fill={kind === "food" ? "#4ca83d" : "#1e9bd7"} />
          <rect x="80" y="56" width="40" height="30" rx="4" fill="#0b2e5e" />
          <path d="M88,72 C96,62 106,62 112,70 C106,78 96,80 88,72Z M86,72 l-6,-5 v10z" fill="#8ed4f2" />
        </g>
      )}
    </svg>
  );
}

function Decor({ kind }: { kind: "stone" | "wood" | "sand" }) {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      {kind === "stone" && (
        <g>
          <path d="M30,104 L52,58 L86,48 L104,104Z" fill="#7d8287" />
          <path d="M52,58 L86,48 L72,80Z" fill="#a1a6aa" />
          <path d="M96,104 L118,34 L146,46 L170,104Z" fill="#6a6f74" />
          <path d="M118,34 L146,46 L130,72Z" fill="#9aa0a5" />
          <path d="M62,80 L68,70 M130,60 L140,80" stroke="#e9eef1" strokeOpacity="0.5" strokeWidth="2" />
        </g>
      )}
      {kind === "wood" && (
        <path
          d="M30,100 C60,96 70,70 64,44 C74,62 84,70 96,66 C110,40 120,30 146,18 C130,40 120,58 118,74 C140,80 160,86 176,104Z"
          fill="#6e4a2c"
          stroke="#4b311c"
          strokeWidth="2"
        />
      )}
      {kind === "sand" && (
        <g>
          <path d="M30,100 C40,60 80,46 100,46 C120,46 160,60 170,100Z" fill="#d9c79e" />
          {Array.from({ length: 70 }, (_, i) => (
            <circle key={i} cx={46 + ((i * 53) % 110)} cy={66 + ((i * 29) % 32)} r="1.4" fill="#a68b5b" />
          ))}
        </g>
      )}
    </svg>
  );
}

function Backdrop({ colors }: { colors: [string, string] }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id={`bd${id}`} cx="0.3" cy="0.3" r="0.9">
          <stop offset="0" stopColor={colors[1]} stopOpacity="0.9" />
          <stop offset="1" stopColor={colors[0]} />
        </radialGradient>
      </defs>
      <g transform="skewY(-6) translate(0 14)">
        <rect x="36" y="18" width="128" height="80" rx="4" fill={`url(#bd${id})`} />
        {Array.from({ length: 22 }, (_, i) => (
          <circle
            key={i}
            cx={44 + ((i * 47) % 116)}
            cy={26 + ((i * 31) % 66)}
            r={2 + (i % 5) * 1.6}
            fill="none"
            stroke={colors[1]}
            strokeOpacity="0.7"
            strokeWidth="1.3"
          />
        ))}
        <rect x="36" y="18" width="128" height="80" rx="4" fill="none" stroke="#fff" strokeOpacity="0.6" />
      </g>
    </svg>
  );
}

export function ProductArt({ art }: { art: Art }) {
  switch (art.kind) {
    case "fish":
      return <Fish art={art} />;
    case "shrimp":
      return <Shrimp color={art.color} />;
    case "snail":
      return <Snail color={art.color} />;
    case "plant":
      return <Plant variant={art.variant} />;
    case "tank":
      return <Tank size={art.size} />;
    case "stone":
    case "wood":
    case "sand":
      return <Decor kind={art.kind} />;
    case "backdrop":
      return <Backdrop colors={art.colors} />;
    default:
      return <Gear kind={art.kind} />;
  }
}

export function artBackground(art: Art): string {
  switch (art.kind) {
    case "fish":
    case "shrimp":
    case "snail":
      return "radial-gradient(120% 90% at 30% 20%, #134a7c 0%, #0b2e5e 45%, #05162d 100%)";
    case "plant":
      return "radial-gradient(120% 90% at 30% 20%, #e8f3e2 0%, #cfe6c6 100%)";
    case "tank":
      return "radial-gradient(120% 90% at 30% 20%, #ffffff 0%, #e4edf2 100%)";
    case "backdrop":
      return "radial-gradient(120% 90% at 30% 20%, #ffffff 0%, #dfe9ef 100%)";
    default:
      return "radial-gradient(120% 90% at 30% 20%, #ffffff 0%, #ebe5d8 100%)";
  }
}
