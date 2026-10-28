import Link from "next/link";
import type { Product } from "@/lib/products";
import { categoryName } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { ProductArt, artBackground } from "./ProductArt";
import { AddToCart } from "./AddToCart";

export function ProductCard({ product }: { product: Product }) {
  const href = product.category === "rueckwaende" ? "/rueckwand" : `/shop/${product.slug}`;
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(11_46_94/0.45)]"
    >
      <div className="relative aspect-[5/3] overflow-hidden" style={{ background: artBackground(product.art) }}>
        <div className="absolute inset-0 p-4 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
          <ProductArt art={product.art} />
        </div>
        {product.badges?.[0] && (
          <span className="chip absolute left-3 top-3 bg-white/90 text-navy backdrop-blur">{product.badges[0]}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-[10.5px] text-mist">{categoryName(product.category)}</p>
        <h3 className="mt-2 text-[17px] font-bold leading-snug text-ink">{product.name}</h3>
        {product.latin && <p className="mt-0.5 text-[13px] italic text-mist">{product.latin}</p>}
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="display text-[24px] text-navy">
              {product.unit?.startsWith("ab") ? "ab " : ""}
              {formatPrice(product.price)}
            </p>
            {product.unit && <p className="text-[12px] text-mist">{product.unit.replace(/^ab · /, "")}</p>}
          </div>
          {product.category !== "rueckwaende" && <AddToCart product={product} compact />}
        </div>
      </div>
    </Link>
  );
}
