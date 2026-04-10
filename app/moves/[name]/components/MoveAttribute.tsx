import { useGetMoveDetailQuery } from "@/store/services/pokeApi";
import {
  Box,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useParams } from "next/navigation";
import AnalyticsIcon from "@mui/icons-material/Analytics";

export default function MoveAttribute() {
  const { name } = useParams();
  const theme = useTheme();
  const { data: move, isLoading } = useGetMoveDetailQuery(name);

  if (isLoading || !move) {
    return (
      <Paper
        sx={{ p: 4, borderRadius: "20px", border: "1px solid #E2E8F0" }}
        elevation={0}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={120} height={32} />
        </Stack>

        <Grid container spacing={1.5}>
          {[...Array(6)].map((_, idx) => (
            <Grid size={{ xs: 6 }} key={idx}>
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: "#F8FAFC",
                  borderRadius: "12px",
                  border: "1px solid #F1F5F9",
                }}
              >
                <Skeleton
                  variant="text"
                  width="50%"
                  height={15}
                  sx={{ mb: 0.5 }}
                />
                <Skeleton variant="text" width="80%" height={20} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  }

  const typeColor = theme.palette.pokemonType[move.type.name] || "#777";

  return (
    <Paper
      sx={{ p: 4, borderRadius: "20px", border: "1px solid #E2E8F0" }}
      elevation={0}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
        <AnalyticsIcon sx={{ color: typeColor }} />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Attributes
        </Typography>
      </Stack>
      <Grid container spacing={1.5}>
        {[
          { l: "Target", v: move.target.name },
          { l: "Priority", v: move.priority },
          { l: "Crit Rate", v: move.meta.crit_rate || 0 },
          { l: "Ailment", v: move.meta.ailment.name || "None" },
          { l: "Drain", v: `${move.meta.drain || 0}%` },
          { l: "Flinch", v: `${move.meta.flinch_chance || 0}%` },
        ].map((item) => (
          <Grid size={{ xs: 6 }} key={item.l}>
            <Box
              sx={{
                p: 1.5,
                bgcolor: "#F8FAFC",
                borderRadius: "12px",
                border: "1px solid #F1F5F9",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.6rem",
                  fontWeight: 900,
                  color: "#94A3B8",
                  textTransform: "uppercase",
                }}
              >
                {item.l}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#1E293B",
                  textTransform: "capitalize",
                  fontSize: "0.85rem",
                }}
              >
                {item.v}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
