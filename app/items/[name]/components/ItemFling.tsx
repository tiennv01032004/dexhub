import { useGetItemDetailQuery } from "@/store/services/pokeApi";
import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

export default function ItemFling() {
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
          <Skeleton variant="text" width={100} height={24} />
        </Box>

        <SkeletonDetailRow />
        <SkeletonDetailRow />
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
      <Typography
        variant="subtitle1"
        fontWeight={800}
        mb={2}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <FitnessCenterIcon sx={{ color: "primary.main" }} /> Fling Stats
      </Typography>
      <DetailRow label="Power" value={item.fling_power || "—"} />
      <DetailRow label="Effect" value={item.fling_effect?.name || "None"} />
    </Paper>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <Stack direction="row" justifyContent="space-between" mb={0.5}>
      <Typography variant="caption" color="text.secondary" fontWeight={600}>
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={800} textTransform="capitalize">
        {value}
      </Typography>
    </Stack>
  );
}

function SkeletonDetailRow() {
  return (
    <Stack direction="row" justifyContent="space-between" mb={1}>
      <Skeleton variant="text" width={50} height={20} />
      <Skeleton variant="text" width={70} height={20} />
    </Stack>
  );
}
