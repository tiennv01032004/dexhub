import { Metadata } from "next";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

export const metadata: Metadata = {
  title: "Pokémon Knowledge Sharing Blog",
  description:
    "Discover in-depth articles on Pokémon strategies, news, and gameplay guides from the DexHub Vietnam community. Stay up-to-date on the latest Pokémon world.",
  keywords: [
    "Pokémon Blog",
    "Pokémon tactics",
    "Pokémon news",
    "Pokémon gameplay guide",
    "Pokémon Pokedex",
  ],
};
