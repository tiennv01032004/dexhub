"use client";

import React, { useEffect, useRef } from "react";
import { Box, Container, Grid } from "@mui/material";
import { notFound, useParams, usePathname } from "next/navigation";
import PokemonPreview from "./PokemonPreview";
import { usePokemonDetailData } from "@/hooks/usePokemonDetailData";
import PokemonStats from "./PokemonStats";
import FullScreenLoader from "@/components/loading/FullScreenLoader";
import PokemonInfo from "./PokemonInfo";
import PokemonDescription from "./PokemonDescription";
import PokemonTraining from "./PokemonTraining";
import PokemonBreeding from "./PokemonBreeding";
import PokemonTypeDefenses from "./PokemonTypeDefense";
import PokemonEvolution from "./PokemonEvolution";
import PokemonVarietyLinks from "./PokemonVarietyTabs";
import PokemonMoveVersion from "./PokemonMoveVersion";
import PokemonLocation from "./PokemonLocation";
import PokemonSprites from "./PokemonSprites";
import PokemonHeldItems from "./PokemonHeldItems";
import PokemonFlavorEntries from "./PokemonFlavorEntries";
import PokemonLanguage from "./PokemonLanguage";
import PokemonPastTypes from "./PokemonPastType";
import PokemonPastStats from "./PokemonPastStats";
import PokemonPastAbilities from "./PokemonPastAbilities";
import PokemonMoveSuggest from "./PokemonMoveSuggest";
import { Dex } from "@pkmn/dex";
import {
  useGetPokemonDetailQuery,
  useGetPokemonSpeciesDetailQuery,
} from "@/store/services/pokeApi";

export default function PokemonDetailWrapper() {
  // const pathname = usePathname();
  // const scrollRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTo(0, 0);
  //   }
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  const { name } = useParams();

  const { data: pokemon, error: errorPokemon } = useGetPokemonDetailQuery(name);
  const { data: species, error: errorSpecies } =
    useGetPokemonSpeciesDetailQuery(pokemon?.species.name, {
      skip: !pokemon?.species.name,
    });

  if (errorPokemon || errorSpecies) notFound();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <PokemonVarietyLinks></PokemonVarietyLinks>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <PokemonPreview />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <PokemonDescription />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <PokemonInfo />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Grid container spacing={2}>
                  <Grid size={12}>
                    <PokemonTraining />
                  </Grid>
                  <Grid size={12}>
                    <PokemonBreeding />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 8, lg: 8 }}>
            <PokemonStats />
          </Grid>
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <PokemonTypeDefenses />
          </Grid>

          <Grid size={{ md: 12, lg: 12, xs: 12, sm: 12 }}>
            <PokemonEvolution />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <PokemonPastTypes />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <PokemonPastStats />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <PokemonPastAbilities />
          </Grid>

          <Grid size={12}>
            <PokemonLocation />
          </Grid>

          <Grid size={12}>
            <PokemonMoveVersion />
          </Grid>

          {/* <Grid size={12}>
            <PokemonMoveSuggest />
          </Grid> */}

          <Grid size={12}>
            <PokemonSprites />
          </Grid>

          <Grid size={12}>
            <PokemonHeldItems />
          </Grid>

          <Grid size={12}>
            <PokemonFlavorEntries />
          </Grid>

          <Grid size={12}>
            <PokemonLanguage />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
