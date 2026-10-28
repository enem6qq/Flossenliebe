export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden bg-abyss pb-16 pt-36 text-white md:pb-24 md:pt-48">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 80% 0%, rgb(30 155 215 / 0.35), transparent 70%), radial-gradient(50% 50% at 0% 100%, rgb(76 168 61 / 0.18), transparent 70%)",
        }}
      />
      <div className="container-x relative">
        <p className="eyebrow text-lagoon">{eyebrow}</p>
        <h1 className="display mt-5 max-w-[16ch] text-[44px] md:text-[80px]">{title}</h1>
        {children && <div className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-white/75 md:text-[19px]">{children}</div>}
      </div>
    </section>
  );
}
