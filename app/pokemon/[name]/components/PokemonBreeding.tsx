import {
  Box,
  Paper,
  List,
  ListItem,
  Typography,
  Skeleton,
} from "@mui/material";
import PokemonHeader from "./PokemonHeader";
import { useParams } from "next/navigation";
import {
  useGetPokemonDetailQuery,
  useGetPokemonSpeciesDetailQuery,
} from "@/store/services/pokeApi";
import { EggGroup } from "@/types/PokemonSpeciesDetail";
import { capitalizeName } from "@/utils/heplers";
import React from "react";

export default function PokemonBreeding() {
  const { name } = useParams();

  const { data: pokemon, isLoading: isLoadingPokemon } =
    useGetPokemonDetailQuery(name as string);

  const {
    species,
    gender,
    isLoading: isLoadingSpecies,
  } = useGetPokemonSpeciesDetailQuery(pokemon?.species?.name ?? "", {
    skip: !pokemon?.species?.name,
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      species: data,
      gender: {
        female: data ? (data.gender_rate / 8) * 100 : 0,
        male: data ? 100 - (data.gender_rate / 8) * 100 : 0,
      },
    }),
  });

  const isLoading = isLoadingPokemon || isLoadingSpecies || !species;

  const labelStyle = {
    width: "140px",
    color: "#4a4a4a",
    fontWeight: 500,
    flexShrink: 0,
    fontSize: "0.875rem",
  };

  const valueStyle = {
    fontSize: "0.875rem",
    color: "#000",
  };

  if (isLoading) {
    return (
      <Paper
        elevation={0}
        sx={{
          height: "100%",
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          bgcolor: "#fff",
        }}
      >
        <PokemonHeader title="Breeding" />
        <List disablePadding>
          {[...Array(3)].map((_, index) => (
            <ListItem key={index} divider={index !== 2} sx={{ py: 2 }}>
              <Skeleton variant="text" width={100} height={20} sx={{ mr: 4 }} />
              <Skeleton
                variant="text"
                width="50%"
                height={20}
                sx={{ transform: "none" }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
      }}
    >
      <PokemonHeader title="Breeding" />

      <List disablePadding>
        <ListItem divider sx={{ py: 1.5 }}>
          <Typography sx={labelStyle}>Egg Groups:</Typography>
          <Typography
            sx={{ ...valueStyle, color: "primary.main", fontWeight: 600 }}
          >
            {species.egg_groups?.length > 0
              ? species.egg_groups
                  .map((egg: EggGroup) => capitalizeName(egg.name))
                  .join(", ")
              : "Unknown"}
          </Typography>
        </ListItem>

        <ListItem divider sx={{ py: 1.5 }}>
          <Typography sx={labelStyle}>Gender:</Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            {species.gender_rate === -1 ? (
              <Typography
                sx={{ ...valueStyle, color: "#64748b", fontWeight: 600 }}
              >
                Genderless
              </Typography>
            ) : (
              <>
                <Typography
                  sx={{ ...valueStyle, color: "#3b82f6", fontWeight: 600 }}
                >
                  {gender.male}% male
                </Typography>
                <Typography
                  sx={{ ...valueStyle, color: "#ec4899", fontWeight: 600 }}
                >
                  {gender.female}% female
                </Typography>
              </>
            )}
          </Box>
        </ListItem>

        <ListItem sx={{ py: 1.5 }}>
          <Typography sx={labelStyle}>Egg cycles:</Typography>
          <Typography sx={valueStyle}>
            {species.hatch_counter}{" "}
            <Box component="span" sx={{ color: "#94a3b8", ml: 0.5 }}>
              {"("}
              {(species.hatch_counter * 257 - 257).toLocaleString()}–
              {(species.hatch_counter * 257).toLocaleString()} steps
              {")"}
            </Box>
          </Typography>
        </ListItem>
      </List>
    </Paper>
  );
}
