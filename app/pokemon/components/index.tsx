"use client";

import { Box, Grid, Container } from "@mui/material";

import PokemonFilter from "./PokemonFilter";
import PokemonList from "./PokemonList";
import Banner from "@/components/layout/Banner";

export default function PokemonWrapper() {
  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <Banner banner="pokedex" />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3.5 }}>
            <PokemonFilter />
          </Grid>

          <Grid size={{ xs: 12, md: 8.5 }}>
            <PokemonList />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
