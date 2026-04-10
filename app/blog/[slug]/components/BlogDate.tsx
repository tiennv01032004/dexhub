import { Typography } from "@mui/material";

interface BlogDateProps {
  date: string;
}

export default function BlogDate({ date }: BlogDateProps) {
  return (
    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
      {new Date(date).toLocaleDateString("vi-VN")}
    </Typography>
  );
}
