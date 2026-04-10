import SectionTitle from "@/components/shared/SectionTitle";
import { useGetNatureDetailQuery } from "@/store/services/pokeApi";
import { MoveBattleStylePreference } from "@/types/NatureDetail";
import { SportsKabaddi } from "@mui/icons-material";
import {
  alpha,
  Box,
  Grid,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";

const NatureBattleSkeleton = () => (
  <Paper sx={{ p: 4, height: "100%" }} elevation={0}>
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
      <Skeleton variant="circular" width={30} height={30} />
      <Skeleton variant="text" width={150} height={30} />
    </Stack>
    <Grid container spacing={4}>
      {Array.from({ length: 3 }).map((_, index) => (
        <Grid size={{ xs: 12, sm: 4 }} key={index}>
          <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
          <Stack spacing={1.5}>
            <Box>
              <Skeleton variant="text" width="40%" height={15} />
              <Skeleton variant="rounded" height={4} width="100%" />
            </Box>
            <Box>
              <Skeleton variant="text" width="40%" height={15} />
              <Skeleton variant="rounded" height={4} width="100%" />
            </Box>
          </Stack>
        </Grid>
      ))}
    </Grid>
  </Paper>
);

export default function NatureBattle() {
  const params = useParams();
  const name = params.name as string;
  const { data: nature, isLoading } = useGetNatureDetailQuery(name);

  if (isLoading || !nature) return <NatureBattleSkeleton />;

  return (
    <Paper
      sx={{
        p: 4,
        height: "100%",
      }}
      elevation={0}
    >
      <SectionTitle
        icon={<SportsKabaddi />}
        title="Battle Style Shift"
        color="primary.main"
      />
      <Grid container spacing={4}>
        {nature.move_battle_style_preferences.map(
          (pref: MoveBattleStylePreference) => (
            <Grid size={{ xs: 12, sm: 4 }} key={pref.move_battle_style.name}>
              <Typography
                variant="caption"
                fontWeight={800}
                color="text.disabled"
                sx={{
                  textTransform: "uppercase",
                  mb: 1,
                  display: "block",
                }}
              >
                {pref.move_battle_style.name.replace("-", " ")}
              </Typography>
              <Stack spacing={1.5}>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ fontSize: 10, fontWeight: 700 }}
                  >
                    HP {">"} 50%: {pref.high_hp_preference}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={pref.high_hp_preference}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      bgcolor: alpha("#8b5cf6", 0.1),
                      "& .MuiLinearProgress-bar": { bgcolor: "#8b5cf6" },
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ fontSize: 10, fontWeight: 700 }}
                  >
                    HP {"<"} 50%: {pref.low_hp_preference}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={pref.low_hp_preference}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      bgcolor: alpha("#f43f5e", 0.1),
                      "& .MuiLinearProgress-bar": { bgcolor: "#f43f5e" },
                    }}
                  />
                </Box>
              </Stack>
            </Grid>
          ),
        )}
      </Grid>
    </Paper>
  );
}
