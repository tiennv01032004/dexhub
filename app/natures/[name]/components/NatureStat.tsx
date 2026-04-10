import SectionTitle from "@/components/shared/SectionTitle";
import { useGetNatureDetailQuery } from "@/store/services/pokeApi";
import { formatStatName } from "@/utils/heplers";
import { SwapVert } from "@mui/icons-material";
import { alpha, Box, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";

const NatureStatSkeleton = () => (
  <Paper sx={{ p: 3, height: "100%" }} elevation={0}>
    <Stack spacing={2} height="100%" justifyContent="center">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton variant="text" width={120} height={24} />
      </Stack>
      <Skeleton variant="rounded" height={80} sx={{ borderRadius: "20px" }} />
      <Skeleton variant="rounded" height={80} sx={{ borderRadius: "20px" }} />
    </Stack>
  </Paper>
);

export default function NatureStat() {
  const params = useParams();
  const name = params.name as string;
  const { data: nature, isLoading } = useGetNatureDetailQuery(name);

  if (isLoading) return <NatureStatSkeleton />;

  const isNeutral = !nature.increased_stat;

  return (
    <Paper
      sx={{
        p: 3,
        height: "100%",
      }}
      elevation={0}
    >
      <Stack spacing={2} height="100%" justifyContent="center">
        <SectionTitle
          icon={<SwapVert />}
          title="Stat Modifiers"
          color="primary.main"
        />

        {isNeutral ? (
          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
            fontWeight={600}
          >
            No stat modifications applied.
          </Typography>
        ) : (
          <>
            <Box
              sx={{
                p: 2,
                borderRadius: "20px",
                bgcolor: alpha("#78C850", 0.08),
                border: "1px solid",
                borderColor: alpha("#78C850", 0.1),
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#78C850",
                  fontWeight: 900,
                  display: "block",
                  textTransform: "uppercase",
                }}
              >
                increased
              </Typography>
              <Typography variant="h6" fontWeight={800}>
                {formatStatName(nature.increased_stat!.name)}
              </Typography>
            </Box>
            <Box
              sx={{
                p: 2,
                borderRadius: "20px",
                bgcolor: alpha("#ef4444", 0.08),
                border: "1px solid",
                borderColor: alpha("#ef4444", 0.1),
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#ef4444",
                  fontWeight: 900,
                  display: "block",
                  textTransform: "uppercase",
                }}
              >
                decreased
              </Typography>
              <Typography variant="h6" fontWeight={800}>
                {formatStatName(nature.decreased_stat!.name)}
              </Typography>
            </Box>
          </>
        )}
      </Stack>
    </Paper>
  );
}
