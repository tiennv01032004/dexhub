"use client";

import { client } from "@/lib/contentful";
import { Container, Box, Divider, Skeleton } from "@mui/material";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BlogTitle from "./BlogTitle";
import BlogDate from "./BlogDate";
import BlogContent from "./BlogContent";
import BlogOther from "./BlogOther";

export default function BlogDetailWrapper() {
  const [post, setPost] = useState<any>(null);
  const [otherPosts, setOtherPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await client.getEntries({
          content_type: "blog",
          "fields.slug": slug,
          limit: 1,
          include: 2,
        });

        if (res.items.length > 0) {
          const currentPost = res.items[0];
          setPost(currentPost);

          const otherRes = await client.getEntries({
            content_type: "blog",
            limit: 3,
            "sys.id[ne]": currentPost.sys.id,
          });
          setOtherPosts(otherRes.items);
        }
      } catch (error) {
        console.error("Lỗi fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchContent();
  }, [slug]);

  if (loading)
    return (
      <Box sx={{ pb: 10, mt: 3 }}>
        <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
          <Skeleton
            variant="text"
            sx={{ fontSize: { xs: "2rem", md: "3.5rem" }, mb: 2 }}
            width="80%"
          />

          <Skeleton variant="text" width="100px" sx={{ mb: 4 }} />

          <Divider sx={{ mb: { xs: 4, md: 6 } }} />

          <Box>
            <Skeleton
              variant="rectangular"
              height={300}
              sx={{ borderRadius: "12px", mb: 4 }}
            />
            <Skeleton variant="text" sx={{ mb: 1 }} />
            <Skeleton variant="text" sx={{ mb: 1 }} />
            <Skeleton variant="text" sx={{ mb: 3 }} width="60%" />
            <Skeleton
              variant="text"
              sx={{ mb: 1, height: "40px" }}
              width="40%"
            />{" "}
            <Skeleton variant="text" sx={{ mb: 1 }} />
            <Skeleton variant="text" sx={{ mb: 1 }} />
          </Box>
        </Container>
      </Box>
    );

  if (!post) notFound();

  const { title, content } = post.fields;

  return (
    <Box sx={{ pb: 10, backgroundColor: "background.default" }}>
      <Container maxWidth="md" sx={{ py: { xs: 2, sm: 3 } }}>
        <BlogTitle title={title} />
        <BlogDate date={post.sys.createdAt} />
        <Divider sx={{ mb: { xs: 4, md: 6 } }} />
        <BlogContent content={content} />
        {otherPosts.length > 0 && <BlogOther otherPosts={otherPosts} />}
      </Container>
    </Box>
  );
}
