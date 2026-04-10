import { Metadata } from "next";

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

interface GenerateMetadataProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { name } = await params;
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  return {
    title: `${capitalizedName} Pokedex: stats, moves, evolution & location | DexHub`,
    description: `Explore comprehensive data for ${capitalizedName} in the Pokedex. Check out its base stats, movesets, abilities, evolutionary line, and where to find it in the wild on DexHub.`,
  };
}
