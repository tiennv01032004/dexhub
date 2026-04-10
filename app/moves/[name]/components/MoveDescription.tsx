import { FlavorTextEntry } from "@/types/MoveDetail";
import {
  Box,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { useParams } from "next/navigation";
import { useGetMoveDetailQuery } from "@/store/services/pokeApi";

export default function MoveDesciption() {
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
          <Skeleton variant="text" width={180} height={32} />
        </Stack>
        <Stack spacing={1.5}>
          {[...Array(3)].map((_, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                borderRadius: "12px",
                bgcolor: "#F8FAFC",
                border: "1px solid #F1F5F9",
              }}
            >
              <Skeleton variant="text" width="40%" height={15} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="85%" height={20} />
            </Box>
          ))}
        </Stack>
      </Paper>
    );
  }

  const typeColor = theme.palette.pokemonType[move.type.name] || "#777";

  const allFlavorEntries =
    move.flavor_text_entries.filter(
      (entry: FlavorTextEntry) => entry.language.name === "en",
    ) || [];

  return (
    <Paper
      sx={{ p: 4, borderRadius: "20px", border: "1px solid #E2E8F0" }}
      elevation={0}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
        <PsychologyIcon sx={{ color: typeColor }} />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Game descriptions
        </Typography>
      </Stack>
      <Box
        sx={{
          pr: 1,
          "&::-webkit-scrollbar": { width: "5px" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#E2E8F0",
            borderRadius: "10px",
          },
        }}
      >
        <Stack spacing={1.5}>
          {allFlavorEntries.map((entry: FlavorTextEntry, index: number) => (
            <Box
              key={index}
              sx={{
                p: 2,
                borderRadius: "12px",
                bgcolor: "#F8FAFC",
                border: "1px solid #F1F5F9",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 900,
                  color: typeColor,
                  textTransform: "uppercase",
                  mb: 0.5,
                }}
              >
                {entry.version_group.name.replace(/-/g, " ")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "#475569",
                  fontStyle: "italic",
                }}
              >
                {entry.flavor_text.replace(/\f/g, " ")}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
