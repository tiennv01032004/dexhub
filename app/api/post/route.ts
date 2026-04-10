import { createClient } from "contentful";
import { NextResponse } from "next/server";

export async function GET() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  });

  try {
    // Gọi Contentful để lấy danh sách bài viết thực sự
    const response = await client.getEntries({ content_type: "blog" });

    // Trả về mảng các bài viết (items)
    return NextResponse.json(response.items);
  } catch (error) {
    console.error("Contentful Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
