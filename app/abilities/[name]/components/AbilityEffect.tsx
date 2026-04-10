import { useGetAbilityDetailQuery } from "@/store/services/pokeApi";
import { FlavorTextEntry } from "@/types/AbilityDetail";
import { AutoFixHigh } from "@mui/icons-material";
import { Box, Paper, Stack, Typography, Skeleton } from "@mui/material";
import { useParams } from "next/navigation";

export default function AbilityEffect() {
  const { name } = useParams();
  const { data: ability, isLoading } = useGetAbilityDetailQuery(name);

  if (isLoading || !ability) {
    return (
      <Paper
        sx={{ p: 4, borderRadius: "20px", border: "1px solid #E2E8F0" }}
        elevation={0}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton
            variant="text"
            width={150}
            height={32}
            sx={{ transform: "none" }}
          />
        </Stack>

        <Stack spacing={1}>
          <Skeleton
            variant="text"
            width="100%"
            height={20}
            sx={{ transform: "none" }}
          />
          <Skeleton
            variant="text"
            width="95%"
            height={20}
            sx={{ transform: "none" }}
          />
          <Skeleton
            variant="text"
            width="60%"
            height={20}
            sx={{ transform: "none" }}
          />
        </Stack>
      </Paper>
    );
  }

  const mainEffect = ability.effect_entries?.find(
    (e: FlavorTextEntry) => e.language.name === "en",
  );

  return (
    <Paper
      sx={{ p: 4, borderRadius: "20px", border: "1px solid #E2E8F0" }}
      elevation={0}
    >
      <SectionTitle
        icon={<AutoFixHigh fontSize="small" />}
        title="In-Battle Effect"
        color="primary.main"
      />
      <Typography
        variant="body1"
        sx={{
          lineHeight: 1.8,
          color: "#334155",
          whiteSpace: "pre-line",
        }}
      >
        {mainEffect?.effect || "Detailed description not found."}
      </Typography>
    </Paper>
  );
}

// Giữ nguyên SectionTitle bên dưới
const SectionTitle = ({
  icon,
  title,
  color = "primary.main",
}: {
  icon: React.ReactNode;
  title: string;
  color?: string;
}) => (
  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
    <Box sx={{ color }}>{icon}</Box>
    <Typography variant="h6" sx={{ fontWeight: 800, color: "#1e293b" }}>
      {title}
    </Typography>
  </Stack>
);
