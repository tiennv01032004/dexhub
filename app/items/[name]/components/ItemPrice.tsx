import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";

import StorefrontIcon from "@mui/icons-material/Storefront";
import { useParams } from "next/navigation";
import { useGetItemDetailQuery } from "@/store/services/pokeApi";

export default function ItemPrice() {
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
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="text" width={100} height={24} />
            </Box>

            <Skeleton
              variant="text"
              width={120}
              height={40}
              animation="wave"
              sx={{ borderRadius: "8px" }}
            />
          </Box>
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
        height: "100%",
      }}
      elevation={0}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={800}
            mb={2}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <StorefrontIcon sx={{ color: "primary.main" }} /> Market Price
          </Typography>
          <Typography variant="h5" fontWeight={900}>
            {item.cost > 0 ? `${item.cost.toLocaleString()} ₽` : "Priceless"}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
