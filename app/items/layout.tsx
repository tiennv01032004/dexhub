import { Metadata } from "next";

export default function ItemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

export const metadata: Metadata = {
  title: "Items List",
  description:
    "Explore all items in the Pokemon world, from Poke Balls to Held Items. View effects, prices, and locations.",
  keywords: [
    "pokemon items",
    "poke ball",
    "held items",
    "pokemon database",
    "dexhub",
  ],
  openGraph: {
    title: "Pokemon Items List | DexHub",
    description:
      "Full database of Pokemon items with detailed effects and locations.",
    url: "https://your-domain.com/items",
    siteName: "DexHub",
    images: [
      {
        url: "/icon.png",
        width: 800,
        height: 600,
        alt: "DexHub Items",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokemon Items List | DexHub",
    description: "Full database of Pokemon items.",
    images: ["/icon.png"],
  },
};
