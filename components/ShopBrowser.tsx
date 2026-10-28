"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { categories, products, type CategoryId } from "@/lib/products";
import { ProductCard } from "./ProductCard";

type Sort = "empfohlen" | "preis-auf" | "preis-ab" | "name";

export function ShopBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const active = (params.get("kategorie") as CategoryId | null) ?? null;
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("empfohlen");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let l = products.filter((p) => (!active || p.category === active) && (!needle || `${p.name} ${p.latin ?? ""} ${p.short}`.toLowerCase().includes(needle)));
    if (sort === "preis-auf") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "preis-ab") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "name") l = [...l].sort((a, b) => a.name.localeCompare(b.name, "de"));
    if (sort === "empfohlen") l = [...l].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return l;
  }, [active, q, sort]);

  const setCat = (id: CategoryId | null) => {
    const url = id ? `/shop?kategorie=${id}` : "/shop";
    router.replace(url, { scroll: false });
  };

  return (
    <div className="container-x py-12 md:py-16">
      <div className="sticky top-[72px] z-20 -mx-5 border-b border-ink/5 bg-pearl/90 px-5 py-4 backdrop-blur-xl md:top-[84px] md:-mx-10 md:px-10">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="tablist" aria-label="Kategorien">
          <button
            type="button"
            role="tab"
            aria-selected={!active}
            onClick={() => setCat(null)}
            className={`chip shrink-0 border px-4 py-2 text-[13px] transition-colors ${!active ? "border-navy bg-navy text-white" : "border-ink/15 bg-white text-ink hover:border-navy"}`}
          >
            Alles
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active === c.id}
              onClick={() => setCat(c.id)}
              className={`chip shrink-0 border px-4 py-2 text-[13px] transition-colors ${
                active === c.id ? "border-navy bg-navy text-white" : "border-ink/15 bg-white text-ink hover:border-navy"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Suche</span>
            <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mist" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input className="input pl-11" placeholder="Suche nach Fisch, Pflanze, Technik …" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <label className="sm:w-56">
            <span className="sr-only">Sortierung</span>
            <select className="input" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="empfohlen">Empfohlen</option>
              <option value="preis-auf">Preis aufsteigend</option>
              <option value="preis-ab">Preis absteigend</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-8 flex items-baseline justify-between">
        <h2 className="display text-[30px] text-navy md:text-[40px]">{active ? categories.find((c) => c.id === active)?.name : "Alle Produkte"}</h2>
        <p className="text-[14px] text-mist">{list.length} Artikel</p>
      </div>
      {active && <p className="mt-1 text-mist">{categories.find((c) => c.id === active)?.claim}</p>}

      {list.length === 0 ? (
        <p className="py-24 text-center text-mist">Nichts gefunden – frag uns gern im Laden, wir bestellen auch für dich.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
