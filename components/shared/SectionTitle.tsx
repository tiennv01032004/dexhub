import { Box, Stack, Typography } from "@mui/material";

interface SectionTitleProps {
  title: string;
  icon: React.ReactNode;
  color?: string;
}

export default function SectionTitle({
  title,
  icon,
  color = "primary.main",
}: SectionTitleProps) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
      <Box sx={{ color }}>{icon}</Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: "#1e293b" }}>
        {title}
      </Typography>
    </Stack>
  );
}
