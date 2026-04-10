import SectionTitle from "@/components/shared/SectionTitle";
import { useGetNatureDetailQuery } from "@/store/services/pokeApi";
import { Restaurant } from "@mui/icons-material";
import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";

const NatureTasteSkeleton = () => (
  <Paper sx={{ p: 4, height: "100%" }} elevation={0}>
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
      <Skeleton variant="circular" width={24} height={24} />
      <Skeleton variant="text" width={140} height={24} />
    </Stack>
    <Stack direction="row" spacing={2}>
      <Skeleton
        variant="rounded"
        sx={{ flex: 1, height: 90, borderRadius: "24px" }}
      />
      <Skeleton
        variant="rounded"
        sx={{ flex: 1, height: 90, borderRadius: "24px" }}
      />
    </Stack>
  </Paper>
);

export default function NatureTaste() {
  const params = useParams();
  const name = params.name as string;
  const { data: nature, isLoading } = useGetNatureDetailQuery(name);

  if (isLoading) return <NatureTasteSkeleton />;

  return (
    <Paper
      sx={{
        p: 4,
        height: "100%",
      }}
      elevation={0}
    >
      <SectionTitle
        icon={<Restaurant />}
        title="Dietary Preferences"
        color="primary.main"
      />

      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            flex: 1,
            p: 2.5,
            bgcolor: "background.paper",
            borderRadius: "24px",
            border: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Typography
            variant="caption"
            fontWeight={800}
            color="text.disabled"
            display="block"
          >
            FAVORITE
          </Typography>
          <Typography
            variant="h6"
            fontWeight={900}
            sx={{ textTransform: "capitalize", color: "#10b981" }}
          >
            {nature.likes_flavor?.name || "None"}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            p: 2.5,
            bgcolor: "background.paper",
            borderRadius: "24px",
            border: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Typography
            variant="caption"
            fontWeight={800}
            color="text.disabled"
            display="block"
          >
            DISLIKED
          </Typography>
          <Typography
            variant="h6"
            fontWeight={900}
            sx={{ textTransform: "capitalize", color: "#ef4444" }}
          >
            {nature.hates_flavor?.name || "None"}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
