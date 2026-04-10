import { Metadata } from "next";

export default function AbilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

export const metadata: Metadata = {
  title: "Abilities List",
  description:
    "Browse and explore all Pokémon abilities. Learn about their effects in battle, which Pokémon possess them, and how they impact gameplay.",
  keywords: [
    "Pokemon abilities",
    "Ability effects",
    "Pokedex",
    "Pokemon battle mechanics",
  ],
};
