import { useGetItemDetailQuery } from "@/store/services/pokeApi";
import { Name } from "@/types/ItemDetail";
import { getFullLanguageName } from "@/utils/heplers";
import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";

import LanguageIcon from "@mui/icons-material/Language";

export default function ItemLanguage() {
  const { name } = useParams();
  const { data: item, isLoading } = useGetItemDetailQuery(name);

  if (isLoading || !item) {
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width={140} height={24} />
        </Box>

        <Stack spacing={1.5}>
          {[...Array(6)].map((_, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pb: 0.5,
                borderBottom: "1px dashed #eee",
              }}
            >
              <Skeleton variant="text" width="30%" height={20} />
              <Skeleton variant="text" width="40%" height={20} />
            </Box>
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
      <Typography
        variant="subtitle1"
        fontWeight={800}
        mb={2}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <LanguageIcon sx={{ color: "primary.main" }} /> Other Language
      </Typography>
      <Stack spacing={1.5}>
        {item.names.map((n: Name, idx: number) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pb: 0.5,
              borderBottom: "1px dashed #eee",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {getFullLanguageName(n.language.name)}
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {n.name}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
