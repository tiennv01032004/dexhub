import { Typography } from "@mui/material";

interface BlogTitleProps {
  title: string;
}

export default function BlogTitle({ title }: BlogTitleProps) {
  return (
    <Typography
      variant="h2"
      component="h1"
      sx={{
        fontWeight: 800,
        mb: 2,
        fontSize: { xs: "2rem", md: "3.5rem" },
        lineHeight: 1.2,
      }}
    >
      {title}
    </Typography>
  );
}
