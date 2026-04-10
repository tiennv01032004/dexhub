export default function ItemdetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

import { Metadata } from "next";
import { capitalizeName } from "@/utils/heplers";

type Props = {
  params: { name: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const formattedName = capitalizeName(name);

  const description = `Discover everything about ${formattedName} in the Pokémon world. Explore its effects, categories, and how to obtain this item in-game.`;

  return {
    title: `${formattedName} - Pokemon Item | DexHub`,
    description: description,
    openGraph: {
      title: `${formattedName} - Pokemon Item | DexHub`,
      description: description,
      images: [
        {
          url: `icon.png`,
          width: 400,
          height: 400,
          alt: formattedName,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${formattedName} - Pokemon Item | DexHub`,
      description: description,
      images: [`icon.png`],
    },
  };
}
