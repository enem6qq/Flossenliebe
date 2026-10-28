"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: "Beratungstermin", date: "", message: "" });
  const up = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  if (sent) {
    const body = encodeURIComponent(`${form.message}\n\nWunschtermin: ${form.date || "–"}\n${form.name}`);
    return (
      <div className="rounded-[24px] bg-white p-8 ring-1 ring-ink/5 md:p-12" role="status">
        <p className="display text-[34px] text-navy">Danke, {form.name.split(" ")[0] || "bis bald"}!</p>
        <p className="mt-3 leading-relaxed text-mist">
          Da Flossenliebe ein fiktives Unternehmen ist, wurde deine Nachricht nicht wirklich verschickt. In echt würden wir
          uns innerhalb eines Werktags bei dir melden.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="btn btn-dark" href={`mailto:${site.email}?subject=${encodeURIComponent(form.topic)}&body=${body}`}>
            Als E-Mail öffnen
          </a>
          <button type="button" className="btn btn-ghost text-navy" onClick={() => setSent(false)}>
            Neue Nachricht
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4 rounded-[24px] bg-white p-6 ring-1 ring-ink/5 md:grid-cols-2 md:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="block">
        <span className="text-[14px] font-semibold">Name</span>
        <input required className="input mt-1.5" value={form.name} onChange={up("name")} autoComplete="name" />
      </label>
      <label className="block">
        <span className="text-[14px] font-semibold">E-Mail</span>
        <input required type="email" className="input mt-1.5" value={form.email} onChange={up("email")} autoComplete="email" />
      </label>
      <label className="block">
        <span className="text-[14px] font-semibold">Worum geht's?</span>
        <select className="input mt-1.5" value={form.topic} onChange={up("topic")}>
          <option>Beratungstermin</option>
          <option>Plexiglas-Rückwand</option>
          <option>Aquarien-Einrichtung</option>
          <option>Pflege-Abo / Urlaubsbetreuung</option>
          <option>Workshop-Anmeldung</option>
          <option>Sonstiges</option>
        </select>
      </label>
      <label className="block">
        <span className="text-[14px] font-semibold">Wunschtermin (optional)</span>
        <input type="date" className="input mt-1.5" value={form.date} onChange={up("date")} />
      </label>
      <label className="block md:col-span-2">
        <span className="text-[14px] font-semibold">Nachricht</span>
        <textarea required rows={5} className="input mt-1.5 resize-y" value={form.message} onChange={up("message")} placeholder="Erzähl uns kurz von deinem Becken oder deiner Idee …" />
      </label>
      <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className="text-[12.5px] text-mist">Demo-Formular – es werden keine Daten übertragen oder gespeichert.</p>
        <button type="submit" className="btn btn-primary">
          Nachricht senden
        </button>
      </div>
    </form>
  );
}
