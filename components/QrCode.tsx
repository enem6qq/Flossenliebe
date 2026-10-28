"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

export function QrCode() {
  const [url, setUrl] = useState("");
  const [svg, setSvg] = useState("");
  const [png, setPng] = useState("");

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  useEffect(() => {
    if (!url) return;
    const opts = { margin: 1, color: { dark: "#0b2e5e", light: "#ffffff" }, errorCorrectionLevel: "H" as const };
    QRCode.toString(url, { ...opts, type: "svg" }).then(setSvg);
    QRCode.toDataURL(url, { ...opts, width: 1200 }).then(setPng);
  }, [url]);

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div className="mx-auto w-full max-w-[420px] rounded-[28px] bg-white p-6 shadow-[0_40px_80px_-40px_rgb(11_46_94/0.5)] ring-1 ring-ink/5">
        <div className="relative">
          <div className="aspect-square w-full [&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
          {svg && (
            <img
              src="/favicon.svg"
              alt=""
              className="absolute left-1/2 top-1/2 h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-[22%] ring-4 ring-white"
            />
          )}
        </div>
        <p className="mt-4 text-center text-[13px] font-semibold text-navy">Flossenliebe · Aquaristik- & Zierfischfachgeschäft</p>
      </div>
      <div>
        <label className="block">
          <span className="text-[14px] font-semibold">Adresse im QR-Code</span>
          <input className="input mt-1.5" value={url} onChange={(e) => setUrl(e.target.value)} spellCheck={false} />
        </label>
        <p className="mt-2 text-[13px] text-mist">
          Automatisch die Adresse, unter der diese Seite gerade läuft (z. B. deine Vercel-Adresse). Du kannst sie auch ändern.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {png && (
            <a className="btn btn-primary" href={png} download="flossenliebe-qr.png">
              PNG herunterladen
            </a>
          )}
          {svg && (
            <a className="btn btn-dark" href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`} download="flossenliebe-qr.svg">
              SVG (für Druck)
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
