export default function AbilitydetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

import { Metadata } from "next";

type Props = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;

  const displayName = name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: `${displayName} - Ability Details | DexHub`,
    description: `Detailed information about the Pokémon ability ${displayName}. Learn about its effects in battle, field usage, and which Pokémon can possess this ability.`,
    keywords: [
      displayName,
      "Pokémon ability",
      "Ability effects",
      "Pokedex Explorer",
    ],
  };
}
