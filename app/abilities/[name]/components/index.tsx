"use client";

import { Box, Container, Grid } from "@mui/material";
import AbilityName from "./AbilityName";
import AbilityEffect from "./AbilityEffect";
import AbilityLanguage from "./AbilityLanguage";
import AbilityDescription from "./AbilityDescription";
import AbilityEffectChange from "./AbilityEffectChange";
import AbilityHiddenPokemon from "./AbilityHiddenPokemon";
import AbilityStandardPokemon from "./AbilityStandardPokemon";
import { notFound, useParams } from "next/navigation";
import { useGetAbilityDetailQuery } from "@/store/services/pokeApi";

export default function AbilityDetailWrapper() {
  const { name } = useParams();

  const { error } = useGetAbilityDetailQuery(name);

  if (error) {
    notFound();
  }

  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      <Container maxWidth="lg" sx={{ py: 6, minHeight: "100vh" }}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <AbilityName />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <AbilityEffect />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <AbilityLanguage />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <AbilityDescription />
          </Grid>

          <Grid size={12}>
            <AbilityEffectChange />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <AbilityHiddenPokemon />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <AbilityStandardPokemon />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
