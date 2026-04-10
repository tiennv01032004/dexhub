"use client";

import { client } from "@/lib/contentful";
import { Box, Container, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import BlogCard from "@/components/shared/BlogCard";
import Banner from "@/components/layout/Banner";

export default function BlogListPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await client.getEntries({
          content_type: "blog",
          order: ["-sys.createdAt"],
        });
        setPosts(response.items);
      } catch (error) {
        console.error("Lỗi lấy danh sách blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ backgroundColor: "background.default", pb: 10 }}>
        <Banner banner="blog" />
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {Array.from(new Array(6)).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Skeleton
                  variant="rectangular"
                  height={200}
                  sx={{ borderRadius: 2 }}
                />
                <Skeleton variant="text" sx={{ mt: 2, fontSize: "1.5rem" }} />
                <Skeleton variant="text" width="60%" />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "background.default", pb: 10 }}>
      <Banner banner="blog" />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {posts.map((post) => {
            const { title, slug, thumbnail, content } = post.fields;
            const imageUrl = thumbnail?.fields?.file?.url
              ? `https:${thumbnail.fields.file.url}`
              : "/placeholder-image.jpg";

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.sys.id}>
                <BlogCard blog={{ title, slug, content, imageUrl, post }} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
