"use client";

import { Box, Container, Stack, Grid } from "@mui/material";

import MoveName from "./MoveName";
import MoveEffect from "./MoveEffect";
import MoveStats from "./MoveStats";
import MoveAttribute from "./MoveAttribute";
import MoveLanguage from "./MoveLanguage";
import MoveDesciption from "./MoveDescription";
import MovePokemon from "./MovePokemon";
import { notFound, useParams } from "next/navigation";
import { useGetMoveDetailQuery } from "@/store/services/pokeApi";

export default function MoveDetailWrapper() {
  const { name } = useParams();
  const { error } = useGetMoveDetailQuery(name);

  if (error) notFound();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 12 }}>
            <MoveName />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <MoveEffect />
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              <MoveStats />
              <MoveAttribute />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <MoveLanguage />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <MoveDesciption />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <MovePokemon />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
