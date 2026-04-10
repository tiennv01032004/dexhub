import { client } from "@/lib/contentful";
import { Metadata } from "next";

export default function BlogdetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;

  const response = await client.getEntries({
    content_type: "blog",
    "fields.slug": slug,
    limit: 1,
  });

  const post = response.items[0];

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const { title, thumbnail } = post.fields as any;

  return {
    title: `${title} - Blog Detail | DexHub`,
    description:
      "Learn everything about ${title} at DexHub. Get up-to-date in-depth analysis, detailed guides, and a dedicated discussion community for Trainers.",
  };
}
