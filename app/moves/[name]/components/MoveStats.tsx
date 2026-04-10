import {
  alpha,
  Box,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ShieldIcon from "@mui/icons-material/Shield";
import SpeedIcon from "@mui/icons-material/Speed";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useParams } from "next/navigation";
import { useGetMoveDetailQuery } from "@/store/services/pokeApi";

export default function MoveStats() {
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
          <Skeleton variant="text" width={150} height={32} />
        </Stack>

        <Grid container spacing={2}>
          {[1, 2, 3].map((item) => (
            <Grid size={{ xs: 4 }} key={item}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  py: 2,
                  bgcolor: "#F8FAFC",
                  borderRadius: "16px",
                  border: "1px solid #F1F5F9",
                }}
              >
                <Skeleton
                  variant="circular"
                  width={24}
                  height={24}
                  sx={{ mb: 1 }}
                />
                <Skeleton variant="text" width="60%" height={15} />
                <Skeleton variant="text" width="40%" height={25} />
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={55}
            sx={{ borderRadius: "16px" }}
          />
        </Box>
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
        <BarChartIcon sx={{ color: typeColor }} />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Move Statistics
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        {[
          {
            label: "Power",
            val: move.power || "—",
            icon: <LocalFireDepartmentIcon />,
            color: "#F87171",
          },
          {
            label: "Accuracy",
            val: move.accuracy ? `${move.accuracy}%` : "—",
            icon: <ShieldIcon />,
            color: "#60A5FA",
          },
          {
            label: "PP",
            val: move.pp,
            icon: <SpeedIcon />,
            color: "#34D399",
          },
        ].map((stat) => (
          <Grid size={{ xs: 4 }} key={stat.label}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 2,
                bgcolor: "#F8FAFC",
                borderRadius: "16px",
                border: "1px solid #F1F5F9",
              }}
            >
              <Box sx={{ color: stat.color, mb: 1, display: "flex" }}>
                {stat.icon}
              </Box>
              <Typography
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  color: "#94A3B8",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </Typography>
              <Typography sx={{ fontWeight: 900, color: "#1E293B" }}>
                {stat.val}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          p: 2.5,
          textAlign: "center",
          bgcolor: alpha(typeColor, 0.05),
          borderRadius: "16px",
          border: `1px dashed ${alpha(typeColor, 0.3)}`,
          mt: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.75rem",
            color: "#64748B",
            fontWeight: 600,
          }}
        >
          Introduced in{" "}
          <strong>
            {move.generation.name.replace("generation-", "GEN ").toUpperCase()}
          </strong>
        </Typography>
      </Box>
    </Paper>
  );
}
