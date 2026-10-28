"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import type { Product } from "@/lib/products";

export function AddToCart({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const label = product.live ? "Reservieren" : "In den Warenkorb";

  const onAdd = () =>
    add({ id: product.slug, slug: product.slug, name: product.name, price: product.price, live: product.live, note: product.unit }, qty);

  if (compact) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAdd();
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white transition-colors hover:bg-sky"
        aria-label={`${product.name}: ${label}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" aria-hidden>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border border-ink/15 bg-white text-ink">
        <button type="button" className="h-12 w-12 text-xl" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Menge verringern">
          −
        </button>
        <span className="w-8 text-center font-semibold" aria-live="polite">
          {qty}
        </span>
        <button type="button" className="h-12 w-12 text-xl" onClick={() => setQty((q) => q + 1)} aria-label="Menge erhöhen">
          +
        </button>
      </div>
      <button type="button" className="btn btn-primary flex-1 sm:flex-none" onClick={onAdd}>
        {label}
      </button>
    </div>
  );
}
