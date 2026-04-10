"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CircularProgress,
  Paper,
} from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { client } from "@/lib/contentful";
import { useEffect, useState } from "react";
import PreviewSection from "./PreviewSection";
import { useRouter } from "next/navigation";
import BlogCard from "@/components/shared/BlogCard";

export default function BlogSection() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const response = await client.getEntries({
        content_type: "blog",
        include: 2,
      });
      setPosts(response.items);
    } catch (error) {
      console.error("Lỗi lấy bài viết:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={0} sx={{ p: 3, mb: 10 }}>
      <PreviewSection
        title="News & Directions"
        subtitle="Stay up-to-date with the latest information and tips for conquering the world of Pokemon."
        icon="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/oaks-parcel.png"
        onViewAll={() => router.push("/blog")}
      >
        <Grid container spacing={4}>
          {posts.slice(0, 3).map((post) => {
            const { title, content, slug, thumbnail } = post.fields;

            const imageUrl = thumbnail?.fields?.file?.url
              ? `https:${thumbnail.fields.file.url}`
              : "https://via.placeholder.com/400x200?text=No+Image";

            return (
              <Grid key={post.sys.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <BlogCard blog={{ title, slug, content, imageUrl, post }} />
              </Grid>
            );
          })}
        </Grid>

        {posts.length === 0 && (
          <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
            Chưa có bài viết nào được xuất bản.
          </Typography>
        )}
      </PreviewSection>
    </Paper>
  );
}
