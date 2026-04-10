import { useGetItemDetailQuery } from "@/store/services/pokeApi";
import { capitalizeName } from "@/utils/heplers";
import { Box, Chip, Paper, Skeleton, Stack, Typography } from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";
import { useParams } from "next/navigation";

export default function ItemImage() {
  const { name } = useParams();
  const { data: item, isLoading } = useGetItemDetailQuery(name);

  if (isLoading || !item) {
    return (
      <Paper
        sx={{
          p: 4,
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={0}
      >
        <Skeleton
          variant="rectangular"
          width={160}
          height={160}
          sx={{ mb: 3, borderRadius: "16px" }}
          animation="wave"
        />

        <Skeleton
          variant="text"
          width="60%"
          height={60}
          sx={{ mb: 1 }}
          animation="wave"
        />

        <Stack direction="row" spacing={1}>
          <Skeleton
            variant="rounded"
            width={100}
            height={32}
            animation="wave"
          />
          <Skeleton variant="rounded" width={80} height={32} animation="wave" />
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: "20px",
        border: "1px solid #E2E8F0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
      elevation={0}
    >
      <Box
        component="img"
        src={
          item.sprites.default ||
          `https://img.pokemondb.net/sprites/items/${item.name}.png`
        }
        sx={{
          width: 160,
          height: 160,
          mb: 3,
          filter: "drop-shadow(0px 12px 20px rgba(0,0,0,0.1))",
        }}
      />
      <Typography variant="h3" fontWeight={900} letterSpacing={-1} gutterBottom>
        {capitalizeName(item.name)}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Chip
          label={item.category.name.replace("-", " ")}
          color="primary"
          sx={{ fontWeight: 800, textTransform: "uppercase" }}
        />
        <Chip
          icon={<InventoryIcon sx={{ fontSize: 16 }} />}
          label={`ID: #${item.id}`}
          variant="outlined"
          sx={{ fontWeight: 700 }}
        />
      </Stack>
    </Paper>
  );
}
