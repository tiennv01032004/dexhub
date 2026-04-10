import { Box, Paper, Typography, Skeleton } from "@mui/material";
import PokemonHeader from "./PokemonHeader";
import {
  useGetPokemonDetailQuery,
  useGetPokemonSpeciesDetailQuery,
} from "@/store/services/pokeApi";
import { useParams } from "next/navigation";
import { FlavorTextEntry } from "@/types/PokemonSpeciesDetail";
import { capitalizeName } from "@/utils/heplers";

export default function PokemonDescription() {
  const { name } = useParams();

  const { data: pokemon, isLoading: isLoadingPokemon } =
    useGetPokemonDetailQuery(name as string);

  const { description, isLoading: isLoadingSpecies } =
    useGetPokemonSpeciesDetailQuery(pokemon?.species?.name ?? "", {
      skip: !pokemon?.species?.name,
      selectFromResult: ({ data, isLoading }) => ({
        isLoading,
        description:
          data?.flavor_text_entries?.filter(
            (text: FlavorTextEntry) => text.language.name === "en",
          ) ?? [],
      }),
    });

  const isLoading = isLoadingPokemon || isLoadingSpecies || !pokemon;

  if (isLoading) {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
        }}
      >
        <PokemonHeader title="Pokemon Description" />
        <Box sx={{ p: 3 }}>
          <Skeleton
            variant="text"
            width="100%"
            height={20}
            sx={{ transform: "none", mb: 1 }}
          />
          <Skeleton
            variant="text"
            width="95%"
            height={20}
            sx={{ transform: "none", mb: 1 }}
          />
          <Skeleton
            variant="text"
            width="60%"
            height={20}
            sx={{ transform: "none" }}
          />
        </Box>
      </Paper>
    );
  }

  const lastDescription = description[
    description.length - 1
  ]?.flavor_text.replace(/\f/g, " ");

  return (
    <Paper elevation={0}>
      <PokemonHeader title="Pokemon Description" />

      <Box sx={{ p: 3 }}>
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            color: "#475569",
            textAlign: "justify",
            fontSize: "1rem",
            fontStyle: "italic",
            fontWeight: 500,
          }}
        >
          {description.length > 0
            ? `"${capitalizeName(name?.toString() || "")} ${lastDescription}"`
            : "No description available for this Pokémon."}
        </Typography>
      </Box>
    </Paper>
  );
}
