import { useGetAbilityDetailQuery } from "@/store/services/pokeApi";
import { Name } from "@/types/AbilityDetail";
import { getFullLanguageName } from "@/utils/heplers";
import { Language } from "@mui/icons-material";
import { alpha, Box, Paper, Stack, Typography, Skeleton } from "@mui/material";
import { useParams } from "next/navigation";

export default function AbilityLanguage() {
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
          {[...Array(6)].map((_, index) => (
            <Stack
              key={index}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ p: 1.2 }}
            >
              <Skeleton
                variant="text"
                width={40}
                height={20}
                sx={{ transform: "none" }}
              />
              <Skeleton
                variant="text"
                width={80}
                height={20}
                sx={{ transform: "none" }}
              />
            </Stack>
          ))}
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
      <SectionTitle
        icon={<Language fontSize="small" />}
        title="Other Language"
        color="primary.main"
      />
      <Stack spacing={1}>
        {ability.names.map((n: Name) => (
          <Stack
            key={n.language.name}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              p: 1.2,
              borderRadius: "10px",
              "&:hover": { bgcolor: alpha("#000", 0.02) },
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "text.secondary" }}
            >
              {getFullLanguageName(n.language.name)}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 800 }}>
              {n.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

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
