"use client";

import { Grid, Skeleton } from "@mui/material";

import BoltIcon from "@mui/icons-material/Bolt";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import PublicIcon from "@mui/icons-material/Public";
import CategoryIcon from "@mui/icons-material/Category";
import StatsCard from "@/components/shared/StatsCard";
import {
  useGetGenerationListQuery,
  useGetMoveListQuery,
  useGetPokemonSpeciesListQuery,
  useGetTypeListQuery,
} from "@/store/services/pokeApi";

export default function HomeStats() {
  const { data: pokemon, isLoading: loadingPkmn } =
    useGetPokemonSpeciesListQuery(undefined);
  const { data: move, isLoading: loadingMoves } =
    useGetMoveListQuery(undefined);
  const { data: type, isLoading: loadingTypes } =
    useGetTypeListQuery(undefined);
  const { data: generation, isLoading: loadingGens } =
    useGetGenerationListQuery(undefined);

  const isLoading = loadingPkmn || loadingMoves || loadingTypes || loadingGens;

  if (isLoading) {
    return (
      <Grid container spacing={3} sx={{ mb: 12 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
            <Skeleton
              variant="rounded"
              height={120}
              sx={{ borderRadius: "24px" }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  const stats = [
    {
      label: "Species",
      value: pokemon.count.toLocaleString(),
      icon: <CatchingPokemonIcon />,
      color: "pokemonType.fire",
    },
    {
      label: "Battle Moves",
      value: move.count.toLocaleString(),
      icon: <BoltIcon />,
      color: "pokemonType.dragon",
    },
    {
      label: "Generations",
      value: generation.count.toLocaleString(),
      icon: <PublicIcon />,
      color: "pokemonType.grass",
    },
    {
      label: "Types",
      value: ((type.count as number) - 3).toLocaleString(),
      icon: <CategoryIcon />,
      color: "pokemonType.electric",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 12 }}>
      {stats.map((stat, i) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
          <StatsCard stat={stat} />
        </Grid>
      ))}
    </Grid>
  );
}
