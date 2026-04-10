import { useGetItemDetailQuery } from "@/store/services/pokeApi";
import { FlavorTextEntry } from "@/types/ItemDetail";
import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { useParams } from "next/navigation";

import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

export default function ItemDescription() {
  const { name } = useParams();
  const { data: item, isLoading } = useGetItemDetailQuery(name);

  if (isLoading || !item) {
    return (
      <Paper
        sx={{ p: 4, borderRadius: "20px", border: "1px solid #E2E8F0" }}
        elevation={0}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={180} height={32} />
        </Box>

        <Box sx={{ pr: 1 }}>
          {[...Array(3)].map((_, idx) => (
            <Box
              key={idx}
              sx={{
                mb: 3,
                pb: 2,
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <Skeleton variant="text" width={100} height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="85%" height={20} />
            </Box>
          ))}
        </Box>
      </Paper>
    );
  }

  const allFlavorTexts = item.flavor_text_entries.filter(
    (entry: FlavorTextEntry) => entry.language.name === "en",
  );

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
      <Typography
        variant="h6"
        fontWeight={800}
        mb={3}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <HistoryEduIcon sx={{ color: "primary.main" }} /> Game Descriptions
      </Typography>
      <Box sx={{ maxHeight: 350, overflowY: "auto", pr: 1 }}>
        {allFlavorTexts.map((flavor: FlavorTextEntry, idx: number) => (
          <Box
            key={idx}
            sx={{
              mb: 3,
              pb: 2,
              borderBottom:
                idx !== allFlavorTexts.length - 1
                  ? "1px solid #f0f0f0"
                  : "none",
            }}
          >
            <Typography
              variant="caption"
              fontWeight={900}
              color="primary"
              textTransform="uppercase"
            >
              {flavor.version_group.name.replace("-", " ")}
            </Typography>
            <Typography variant="body2" color="text.primary" mt={0.5}>
              {flavor.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
