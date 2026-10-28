const eur = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
export const formatPrice = (n: number) => eur.format(n);
