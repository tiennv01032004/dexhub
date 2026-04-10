import BlogCard from "@/components/shared/BlogCard";
import { Box, Grid, Typography } from "@mui/material";

interface BlogOtherProps {
  otherPosts: any;
}

export default function BlogOther({ otherPosts }: BlogOtherProps) {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}
      >
        Articles you might like
      </Typography>
      <Grid container spacing={3}>
        {otherPosts.map((post: any) => {
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
    </Box>
  );
}
