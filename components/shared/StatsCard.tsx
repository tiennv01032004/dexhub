import { Stats } from "@/types/Stats";
import { Box, Grid, Paper, Typography } from "@mui/material";

interface StatsCardProps {
  stat: Stats;
}

export default function StatsCard({ stat }: StatsCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        display: "flex",
        borderRadius: 2,
        alignItems: "center",
        gap: 2.5,
      }}
    >
      <Box
        sx={{
          p: 1.8,
          borderRadius: 5,
          bgcolor: `${stat.color}11`,
          color: stat.color,
        }}
      >
        {stat.icon}
      </Box>
      <Box>
        <Typography variant="h4" fontWeight="900">
          {stat.value}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight="700">
          {stat.label}
        </Typography>
      </Box>
    </Paper>
  );
}
