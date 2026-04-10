import { useGetNatureDetailQuery } from "@/store/services/pokeApi";
import { formatStatName } from "@/utils/heplers";
import { alpha, Chip, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";

const NatureNameSkeleton = () => (
  <Paper sx={{ height: "100%", p: 4 }} elevation={0}>
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
      <Skeleton
        variant="rounded"
        width={80}
        height={24}
        sx={{ borderRadius: 4 }}
      />
      <Skeleton
        variant="rounded"
        width={100}
        height={24}
        sx={{ borderRadius: 4 }}
      />
    </Stack>
    <Skeleton variant="text" width="50%" sx={{ fontSize: "3.75rem", mb: 2 }} />
    <Skeleton variant="text" width="90%" />
    <Skeleton variant="text" width="70%" />
  </Paper>
);

export default function NatureName() {
  const params = useParams();
  const name = params.name as string;
  const { data: nature, isLoading } = useGetNatureDetailQuery(name);

  if (isLoading) return <NatureNameSkeleton />;

  const isNeutral = !nature.increased_stat;
  const displayName =
    nature.name.charAt(0).toUpperCase() + nature.name.slice(1);

  return (
    <Paper
      sx={{
        height: "100%",
        p: 4,
      }}
      elevation={0}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <Chip
          label={`Index #${nature.id}`}
          size="small"
          sx={{
            fontWeight: 900,
            bgcolor: "common.black",
            color: "white",
          }}
        />
        {isNeutral && (
          <Chip
            label="Neutral Nature"
            variant="outlined"
            size="small"
            sx={{ fontWeight: 700 }}
          />
        )}
      </Stack>
      <Typography
        variant="h2"
        sx={{ fontWeight: 900, mb: 2, textTransform: "capitalize" }}
      >
        {displayName}
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ fontWeight: 400, lineHeight: 1.6 }}
      >
        {isNeutral
          ? "A balanced nature with no specific stat modifiers."
          : `Strategically enhances ${formatStatName(nature.increased_stat!.name)} growth while reducing ${formatStatName(nature.decreased_stat!.name)}.`}
      </Typography>
    </Paper>
  );
}
