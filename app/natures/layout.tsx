import { Metadata } from "next";

export default function NaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

export const metadata: Metadata = {
  title: "Natures List",
  description:
    "Browse all Pokémon Natures, including their effects on stats (Attack, Defense, Speed, etc.) and flavor preferences for Poffins or Pokeblocks.",
  keywords: [
    "Pokemon Natures",
    "Nature Chart",
    "Stat Modifiers",
    "DexHub",
    "Pokemon Guide",
  ],
};
