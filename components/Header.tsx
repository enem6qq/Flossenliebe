"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { useCart } from "./CartProvider";

export function Header() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  const lightTop = pathname === "/rueckwand";
  const solid = (scrolled || lightTop) && !menu;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? "bg-pearl/85 text-ink shadow-[0_1px_0_rgb(10_22_40/0.08)] backdrop-blur-xl" : "text-white"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6 md:h-[84px]">
          <Link href="/" aria-label="Flossenliebe – Startseite" className="relative z-10 shrink-0">
            <Image
              src="/brand/flossenliebe-logo.svg"
              alt="Flossenliebe – Aquaristik- & Zierfischfachgeschäft"
              width={1930}
              height={774}
              priority
              className={`h-[46px] w-auto transition-all duration-500 md:h-[56px] ${solid ? "" : "rounded-[14px] bg-white/95 px-2 py-1 shadow-[0_8px_30px_-10px_rgb(0_0_0/0.5)]"}`}
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
            {nav.map((n) => {
              const active = pathname === n.href || pathname.startsWith(n.href + "/");
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`link-underline text-[14px] font-semibold ${active ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
                  aria-current={active ? "page" : undefined}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                solid ? "hover:bg-navy/5" : "hover:bg-white/10"
              }`}
              aria-label={`Warenkorb öffnen, ${count} Artikel`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-moss px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              className={`flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${solid ? "hover:bg-navy/5" : "hover:bg-white/10"}`}
              aria-label={menu ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={menu}
            >
              <span className="relative block h-3.5 w-5">
                <span className={`absolute left-0 h-[2px] w-5 bg-current transition-all duration-300 ${menu ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-[2px] w-5 bg-current transition-opacity ${menu ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-[2px] w-5 bg-current transition-all duration-300 ${menu ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-abyss text-white transition-[opacity,visibility] duration-500 lg:hidden ${
          menu ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="container-x flex h-full flex-col justify-center gap-1 pb-10 pt-24" aria-label="Mobile Navigation">
          {[{ href: "/", label: "Start" }, ...nav].map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              className="display border-b border-white/10 py-3 text-[34px] transition-all duration-500"
              style={{ transitionDelay: menu ? `${80 + i * 40}ms` : "0ms", opacity: menu ? 1 : 0, transform: menu ? "none" : "translateY(12px)" }}
            >
              {n.label}
            </Link>
          ))}
          <p className="mt-8 text-sm text-white/60">Neutstraße 25 · 72581 Dettingen an der Erms</p>
        </nav>
      </div>
    </>
  );
}
