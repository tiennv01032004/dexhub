import SectionTitle from "@/components/shared/SectionTitle";
import { useGetNatureDetailQuery } from "@/store/services/pokeApi";
import { Name } from "@/types/AbilityDetail";
import { getFullLanguageName } from "@/utils/heplers";
import { Language } from "@mui/icons-material";
import { alpha, Paper, Stack, Typography, Skeleton } from "@mui/material";
import { useParams } from "next/navigation";

const NatureLanguageSkeleton = () => (
  <Paper sx={{ p: 4, borderRadius: "24px", height: "100%" }} elevation={0}>
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
      <Skeleton variant="circular" width={24} height={24} />
      <Skeleton variant="text" width={150} height={24} />
    </Stack>
    <Stack spacing={1}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Stack key={index} direction="row" justifyContent="space-between">
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="40%" />
        </Stack>
      ))}
    </Stack>
  </Paper>
);

export default function NatureLanguage() {
  const params = useParams();
  const name = params.name as string;
  const { data: nature, isLoading } = useGetNatureDetailQuery(name);

  if (isLoading) return <NatureLanguageSkeleton />;

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
        icon={<Language />}
        title="Other Language"
        color="primary.main"
      />
      <Stack spacing={1}>
        {nature.names.map((n: Name) => (
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
