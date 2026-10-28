import type { Metadata } from "next";
import { Configurator } from "@/components/Configurator";

export const metadata: Metadata = {
  title: "Rückwand-Konfigurator",
  description: "Gestalte deine individuelle Plexiglas-Rückwand in 3D – passgenau gefertigt von Flossenliebe.",
};

export default function RueckwandPage() {
  return (
    <div className="bg-abyss">
      <Configurator />
    </div>
  );
}
