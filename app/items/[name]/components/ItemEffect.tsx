import { useGetItemDetailQuery } from "@/store/services/pokeApi";
import { EffectEntry } from "@/types/ItemDetail";
import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { useParams } from "next/navigation";

import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

export default function ItemEffect() {
  const { name } = useParams();
  const { data: item, isLoading } = useGetItemDetailQuery(name);

  if (isLoading || !item) {
    return (
      <Paper
        sx={{
          p: 4,
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          height: "100%",
        }}
        elevation={0}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width={150} height={30} />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Skeleton variant="text" width="100%" height={24} animation="wave" />
          <Skeleton variant="text" width="95%" height={24} animation="wave" />
          <Skeleton variant="text" width="60%" height={24} animation="wave" />
        </Box>
      </Paper>
    );
  }

  const effectDetail = item.effect_entries.find(
    (e: EffectEntry) => e.language.name === "en",
  )?.effect;

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: "20px",
        border: "1px solid #E2E8F0",
        height: "100%",
      }}
      elevation={0}
    >
      <Typography
        variant="subtitle1"
        fontWeight={800}
        mb={2}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <MilitaryTechIcon sx={{ color: "primary.main" }} /> Battle Mechanics
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          lineHeight: 1.8,
          fontSize: "1.1rem",
        }}
      >
        {effectDetail || "No detailed battle effect documented."}
      </Typography>
    </Paper>
  );
}
