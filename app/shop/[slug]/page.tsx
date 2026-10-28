import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { ProductArt, artBackground } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { categoryName, getProduct, products } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return products.filter((p) => p.category !== "rueckwaende").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p?.name ?? "Produkt", description: p?.short };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const dark = ["fish", "shrimp", "snail"].includes(product.art.kind);

  return (
    <>
      <section className={`${dark ? "bg-abyss text-white" : "bg-sand/50 text-ink"} pt-28 md:pt-32`}>
        <div className="container-x">
          <nav className={`text-[13px] ${dark ? "text-white/60" : "text-mist"}`} aria-label="Brotkrumen">
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>{" "}
            /{" "}
            <Link href={`/shop?kategorie=${product.category}`} className="hover:underline">
              {categoryName(product.category)}
            </Link>
          </nav>
        </div>
        <div className="container-x grid items-center gap-10 pb-16 pt-6 md:grid-cols-12 md:pb-24">
          <div className="md:col-span-7">
            <div className="relative aspect-[5/3] overflow-hidden rounded-[24px]" style={{ background: artBackground(product.art) }}>
              <div className="absolute inset-0 p-6 md:p-12">
                <ProductArt art={product.art} />
              </div>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="flex flex-wrap gap-2">
              {product.badges?.map((b) => (
                <span key={b} className={`chip ${dark ? "bg-white/10 text-lagoon" : "bg-white text-navy"}`}>
                  {b}
                </span>
              ))}
            </div>
            <h1 className="display mt-5 text-[40px] md:text-[56px]">{product.name}</h1>
            {product.latin && <p className={`mt-2 italic ${dark ? "text-white/60" : "text-mist"}`}>{product.latin}</p>}
            <p className={`mt-5 text-[18px] leading-relaxed ${dark ? "text-white/80" : "text-ink/80"}`}>{product.short}</p>
            <p className="display mt-8 text-[44px]">{formatPrice(product.price)}</p>
            {product.unit && <p className={`text-[14px] ${dark ? "text-white/60" : "text-mist"}`}>{product.unit} · inkl. MwSt.</p>}
            <div className="mt-6">
              <AddToCart product={product} />
            </div>
            {product.live && (
              <p className={`mt-5 rounded-xl p-4 text-[14px] leading-relaxed ${dark ? "bg-white/5 text-white/75" : "bg-white text-mist"}`}>
                <strong className="text-moss">Lebendes Tier:</strong> Online reservieren, Abholung im Laden nach kurzer Beratung.
                Wir halten das Tier 3 Tage für dich zurück. Kein Versand.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="eyebrow text-sky">Beschreibung</p>
          <p className="mt-5 text-[18px] leading-relaxed text-ink/80">{product.description}</p>
        </div>
        {product.facts && (
          <div className="md:col-span-5 md:col-start-8">
            <p className="eyebrow text-sky">{product.live ? "Steckbrief" : "Details"}</p>
            <dl className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
              {product.facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-3.5">
                  <dt className="text-mist">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section className="container-x pb-24">
          <h2 className="display text-[32px] text-navy md:text-[44px]">
            Passt <em>dazu</em>
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
