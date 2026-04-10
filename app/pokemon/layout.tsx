import { Metadata } from "next";

export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

export const metadata: Metadata = {
  title: "Pokemon List",
  description:
    "Search, filter, and explore all 1000+ Pokémon species. View detailed base stats, types, abilities, and high-quality shiny sprites from every generation.",
  keywords: [
    "Pokedex",
    "Pokemon Database",
    "Pokemon Stats",
    "Shiny Pokemon",
    "Generation 9",
    "DexHub",
  ],
  authors: [{ name: "DexHub Team" }],

  openGraph: {
    title: "Explore the Pokémon World",
    description:
      "Detailed information on every Pokémon ever discovered. Catch 'em all with DexHub!",
    url: "https://your-domain.com/pokemon",
    siteName: "DexHub",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "DexHub Pokedex Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pokedex | DexHub",
    description: "The ultimate digital encyclopedia for Pokémon trainers.",
    images: ["/icon.png"],
  },
};
