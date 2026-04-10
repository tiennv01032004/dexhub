import { useGetMoveDetailQuery } from "@/store/services/pokeApi";
import { FlavorTextEntry } from "@/types/MoveDetail";
import { AutoAwesomeMosaicOutlined } from "@mui/icons-material";
import {
  Box,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useParams } from "next/navigation";

export default function MoveEffect() {
  const { name } = useParams();
  const theme = useTheme();
  const { data: move, isLoading } = useGetMoveDetailQuery(name);

  if (isLoading || !move) {
    return (
      <Stack spacing={3}>
        <Paper
          sx={{ p: 4, borderRadius: "20px", border: "1px solid #E2E8F0" }}
          elevation={0}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 2.5 }}
          >
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width={100} height={32} />
          </Stack>

          <Box>
            <Skeleton
              variant="text"
              width="100%"
              height={24}
              animation="wave"
            />
            <Skeleton variant="text" width="95%" height={24} animation="wave" />
            <Skeleton variant="text" width="60%" height={24} animation="wave" />
          </Box>
        </Paper>
      </Stack>
    );
  }

  const typeColor = theme.palette.pokemonType[move.type.name] || "#777";

  return (
    <Stack spacing={3}>
      <Paper
        sx={{ p: 4, borderRadius: "20px", border: "1px solid #E2E8F0" }}
        elevation={0}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ mb: 2.5 }}
        >
          <AutoAwesomeMosaicOutlined sx={{ color: typeColor }} />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Effect
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontSize: "1.1rem",
            color: "#334155",
            lineHeight: 1.6,
            fontWeight: 500,
          }}
        >
          {move.effect_entries.length
            ? move.effect_entries
                .find((e: FlavorTextEntry) => e.language.name === "en")
                .short_effect.replace(
                  "$effect_chance",
                  move.effect_chance || "",
                )
            : "No effect description available for this move."}
        </Typography>
      </Paper>
    </Stack>
  );
}
