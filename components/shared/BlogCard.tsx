import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { CalendarToday } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";

interface BlogCardProps {
  blog: any;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const { slug, title, imageUrl, content, post } = blog;

  return (
    <Card
      component={Link}
      href={`/blog/${slug}`}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        borderRadius: "16px",
        transition: "all 0.3s ease-in-out",
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
          borderColor: "primary.light",
        },
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={imageUrl}
        alt={title}
        sx={{ transition: "0.3s" }}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1.5,
            gap: 1,
          }}
        >
          <CalendarToday sx={{ fontSize: "0.9rem", color: "text.secondary" }} />
          <Typography variant="caption" color="text.secondary">
            {new Date(post.sys.createdAt).toLocaleDateString("vi-VN")}
          </Typography>
        </Box>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: "bold",
            mb: 1.5,
            lineHeight: 1.3,
            color: "text.primary",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          component="div"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {documentToReactComponents({
            ...content,
            content: content.content.filter(
              (node: any) => node.nodeType !== "heading-1",
            ),
          })}
        </Typography>
      </CardContent>
    </Card>
  );
}
