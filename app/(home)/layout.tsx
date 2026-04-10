import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore the World of Pokémon",
  description:
    "The most comprehensive digital encyclopedia for your Pokémon adventure. Access detailed data on 1000+ Pokémon, moves, abilities, and natures with optimized stats and tactical analysis.",
  keywords: [
    "Pokémon",
    "Pokédex",
    "DexHub",
    "Pokémon Stats",
    "Pokémon Database",
    "Competitive Pokémon",
    "Natures",
    "Abilities",
  ],
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
