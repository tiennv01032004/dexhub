import { useGetAbilityDetailQuery } from "@/store/services/pokeApi";
import { Gamepad } from "@mui/icons-material";
import { Box, Chip, Paper, Stack, Typography, Skeleton } from "@mui/material";
import { useParams } from "next/navigation";

export default function AbilityName() {
  const { name } = useParams();
  const { data: ability, isLoading } = useGetAbilityDetailQuery(name);

  // --- TRẠNG THÁI LOADING (SKELETON) ---
  if (isLoading || !ability) {
    return (
      <Paper
        sx={{ p: 4, borderRadius: "20px", border: "1px solid #E2E8F0" }}
        elevation={0}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ width: { xs: "100%", sm: "300px" } }}>
            <Skeleton
              variant="text"
              height={60}
              width="80%"
              sx={{ transform: "none", borderRadius: "8px" }}
            />
          </Box>
          <Skeleton
            variant="rounded"
            width={120}
            height={32}
            sx={{ borderRadius: "10px" }}
          />
        </Stack>
      </Paper>
    );
  }

  // --- TRẠNG THÁI DATA SẴN SÀNG ---
  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: "20px",
        border: "1px solid #E2E8F0",
        background: "linear-gradient(135deg, #fff 0%, #f8fafc 100%)",
      }}
      elevation={0}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              textTransform: "capitalize",
              color: "#0f172a",
              fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem" },
            }}
          >
            {ability.name.replace(/-/g, " ")}
          </Typography>
        </Box>

        <Chip
          label={ability.generation.name.replace(/-/g, " ")}
          icon={<Gamepad />}
          color="primary"
          sx={{
            fontWeight: 700,
            borderRadius: "10px",
            px: 1,
          }}
        />
      </Stack>
    </Paper>
  );
}
