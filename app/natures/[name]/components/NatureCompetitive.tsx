import SectionTitle from "@/components/shared/SectionTitle";
import { useGetNatureDetailQuery } from "@/store/services/pokeApi";
import { getCompetitiveRole } from "@/utils/heplers";
import { Psychology } from "@mui/icons-material";
import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";

const NatureCompetitiveSkeleton = () => (
  <Paper sx={{ p: 3, height: "100%" }} elevation={0}>
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
      <Skeleton variant="circular" width={24} height={24} />
      <Skeleton variant="text" width={100} height={24} />
    </Stack>
    <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
    <Skeleton variant="text" width="100%" />
    <Skeleton variant="text" width="100%" />
    <Skeleton variant="text" width="80%" />
  </Paper>
);

export default function NatureCompetitive() {
  const params = useParams();
  const name = params.name as string;
  const { data: nature, isLoading } = useGetNatureDetailQuery(name);

  if (isLoading) return <NatureCompetitiveSkeleton />;

  const analysis = getCompetitiveRole(nature);

  return (
    <Paper
      sx={{
        p: 3,
        height: "100%",
      }}
      elevation={0}
    >
      <SectionTitle
        icon={<Psychology />}
        title="analysis"
        color="primary.main"
      />
      <Typography variant="h5" fontWeight={900} sx={{ mt: 1.5 }}>
        {analysis.role}
      </Typography>
      <Typography variant="body2" sx={{ mt: 2, opacity: 0.8, lineHeight: 1.7 }}>
        {analysis.desc}
      </Typography>
    </Paper>
  );
}
