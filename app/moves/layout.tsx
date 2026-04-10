import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokemon Moves",
  description:
    "Explore the full list of Pokémon moves. Database includes base power, accuracy, PP, and secondary effects for Physical, Special, and Status moves across all generations.",

  keywords: [
    "Pokemon Moves",
    "Move List",
    "Physical Moves",
    "Special Moves",
    "Status Moves",
    "PP",
    "Base Power",
    "DexHub",
  ],

  openGraph: {
    title: "Pokémon Moves Database | DexHub",
    description:
      "Search and filter through every Pokémon move. Find the best movesets for your team.",
    url: "https://your-domain.com/moves",
    siteName: "DexHub",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "DexHub Moves Encyclopedia",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pokémon Moves | DexHub",
    description: "The ultimate digital encyclopedia for Pokémon moves.",
    images: ["/icon.png"],
  },
};

export default function MovesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
