import PokemonCard from "@/components/shared/PokemonCard1";
import { EXCLUDED_FORMS } from "@/constants";
import { Result } from "@/types/Generation";
import { extractIdFromUrl, toShowdownId } from "@/utils/heplers";
import {
  Box,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Dex } from "@pkmn/dex";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { useParams } from "next/navigation";
import { useGetMoveDetailQuery } from "@/store/services/pokeApi";

export default function MovePokemon() {
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
          <Skeleton variant="text" width={200} height={32} />
        </Stack>

        <Grid container spacing={2}>
          {[...Array(12)].map((_, idx) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={idx}>
              <Box sx={{ width: "100%" }}>
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={150}
                  sx={{ borderRadius: "16px" }}
                />
                <Skeleton
                  variant="text"
                  width="70%"
                  height={20}
                  sx={{ mt: 1, mx: "auto" }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  }

  const typeColor = theme.palette.pokemonType[move.type.name] || "#777";

  const filteredPokemon = move.learned_by_pokemon.filter(
    (p: Result) => !EXCLUDED_FORMS.includes(p.name),
  );

  return (
    <Paper
      sx={{ p: 4, borderRadius: "20px", border: "1px solid #E2E8F0" }}
      elevation={0}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
        <CatchingPokemonIcon sx={{ color: typeColor }} />
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Learning Pokémon
        </Typography>
      </Stack>

      {filteredPokemon.length > 0 ? (
        <Grid container spacing={2}>
          {filteredPokemon.map((p: Result) => {
            const species = Dex.species.get(toShowdownId(p.name));
            species.num = parseInt(extractIdFromUrl(p.url));
            return (
              <Grid size={{ xs: 6, md: 2 }} key={p.name}>
                <PokemonCard species={species} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box
          sx={{
            py: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#F8FAFC",
            borderRadius: "16px",
            border: "1px dashed #E2E8F0",
          }}
        >
          <CatchingPokemonIcon sx={{ fontSize: 48, color: "#CBD5E1", mb: 2 }} />
          <Typography
            variant="body1"
            sx={{ color: "#64748B", fontWeight: 600 }}
          >
            No Pokémon can learn this move.
          </Typography>
          <Typography variant="caption" sx={{ color: "#94A3B8" }}>
            This move might be exclusive to certain events or unavailable in the
            current dex.
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
