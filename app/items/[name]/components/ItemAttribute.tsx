import { useGetItemDetailQuery } from "@/store/services/pokeApi";
import { Attribute } from "@/types/ItemDetail";
import { Box, Chip, Paper, Skeleton, Typography } from "@mui/material";
import { useParams } from "next/navigation";

import StyleIcon from "@mui/icons-material/Style";

export default function ItemAttribute() {
  const { name } = useParams();
  const { data: item, isLoading } = useGetItemDetailQuery(name);

  if (isLoading || !item) {
    return (
      <Paper
        sx={{ p: 4, borderRadius: "20px", border: "1px solid #E2E8F0" }}
        elevation={0}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width={100} height={24} />
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Skeleton
            variant="rounded"
            width={80}
            height={24}
            sx={{ borderRadius: "16px" }}
          />
          <Skeleton
            variant="rounded"
            width={60}
            height={24}
            sx={{ borderRadius: "16px" }}
          />
          <Skeleton
            variant="rounded"
            width={90}
            height={24}
            sx={{ borderRadius: "16px" }}
          />
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{ p: 4, borderRadius: "20px", border: "1px solid #E2E8F0" }}
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
        <StyleIcon sx={{ color: "primary.main" }} /> Attributes
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {item.attributes.map((attr: Attribute) => (
          <Chip
            key={attr.name}
            label={attr.name.replace("-", " ")}
            size="small"
            sx={{ fontWeight: 700 }}
          />
        ))}
        {item.attributes.length === 0 && (
          <Typography variant="caption" color="text.secondary">
            Common Item
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
