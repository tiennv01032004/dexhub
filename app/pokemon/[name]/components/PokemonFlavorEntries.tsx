"use client";

import React from "react";
import {
  useGetPokemonDetailQuery,
  useGetPokemonSpeciesDetailQuery,
} from "@/store/services/pokeApi";
import { FlavorTextEntry } from "@/types/PokemonSpeciesDetail";
import { toPokeApiId, toShowdownId } from "@/utils/heplers";
import { Dex } from "@pkmn/dex";
import { useParams } from "next/navigation";
import PokemonHeader from "./PokemonHeader";
import { Box, Paper, Typography, Grid, Skeleton, alpha } from "@mui/material";

export default function PokemonFlavorEntries() {
  const { name } = useParams();

  const { data: pokemon } = useGetPokemonDetailQuery(name);

  const { data: species, isLoading } = useGetPokemonSpeciesDetailQuery(
    pokemon?.species.name,
  );

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
        <PokemonHeader title="Game Descriptions" />
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Box
                  sx={{
                    p: 2,
                    height: "110px",
                    bgcolor: "#F8FAFC",
                    border: "1px solid #F1F5F9",
                    borderRadius: "8px",
                  }}
                >
                  <Skeleton
                    variant="text"
                    width="40%"
                    height={20}
                    sx={{ mb: 1, bgcolor: alpha("#1976d2", 0.08) }}
                  />
                  <Skeleton variant="text" width="95%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="60%" />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    );
  }

  const allFlavorEntries =
    species?.flavor_text_entries.filter(
      (entry: FlavorTextEntry) => entry.language.name === "en",
    ) || [];

  return (
    <Paper elevation={0}>
      <PokemonHeader title="Game Descriptions" />

      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={2}>
          {allFlavorEntries.map((entry: FlavorTextEntry, index: number) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Box
                sx={{
                  p: 2,
                  height: "100%",
                  bgcolor: "#F8FAFC",
                  border: "1px solid #F1F5F9",
                  borderRadius: "8px",
                  transition: "all 0.2s ease-in-out",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    bgcolor: "#fff",
                    borderColor: "primary.light",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 900,
                    color: "primary.main",
                    textTransform: "uppercase",
                    mb: 1,
                    letterSpacing: "1px",
                  }}
                >
                  {entry.version.name.replace(/-/g, " ")}
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "0.8rem", md: "0.85rem" },
                    lineHeight: 1.6,
                    color: "#475569",
                    fontStyle: "italic",
                  }}
                >
                  {entry.flavor_text.replace(/[\f\n\r]/g, " ")}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {!isLoading && allFlavorEntries.length === 0 && (
          <Typography
            sx={{ textAlign: "center", py: 4, color: "text.secondary" }}
          >
            No descriptions available for this Pokémon.
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
