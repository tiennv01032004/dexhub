import { Metadata } from "next";

export default function NaturedetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

type Props = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;

  const displayName = name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: `${displayName} - Nature Detail | DexHub`,
    description: `Detailed information about the ${displayName} nature in Pokémon, including its effects on stats and flavor preferences.`,
    keywords: [
      `Pokémon ${displayName} nature`,
      `${displayName} nature effects`,
      `${displayName} nature stats`,
      "Pokémon nature chart",
      "DexHub pokemon",
      "Pokémon competitive guide",
    ],
  };
}
