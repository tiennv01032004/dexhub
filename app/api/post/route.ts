import { createClient } from "contentful";
import { NextResponse } from "next/server";

export async function GET() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  });

  try {
    const response = await client.getEntries({ content_type: "blog" });

    return NextResponse.json(response.items);
  } catch (error) {
    console.error("Contentful Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
