import { capitalizeName } from "@/utils/heplers";
import { Metadata } from "next";

interface Props {
  params: { name: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;

  const description = `${capitalizeName(name)} details, stats, and how to learn it in various Pokémon game versions.`;

  return {
    title: `${capitalizeName(name)} - Pokémon Move Dex | DexHub`,
    description: description,
    openGraph: {
      title: `${capitalizeName(name)} - Pokémon Move Guide`,
      description: description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${capitalizeName(name)} Guide`,
      description: description,
    },
  };
}

export default function MoveDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
