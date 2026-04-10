"use client";

import { Container, Box } from "@mui/material";
import HomeHero from "./HomeHero";
import HomeStats from "./HomeStats";
import HomePokemon from "./HomePokemon";
import HomeItemCategories from "./HomeItemCategories";
import HomeMove from "./HomeMove";
import HomeMechanic from "./HomeMechanic";
import HomesRegion from "./HomeRegions";
import BlogSection from "./HomePost";

export default function HomeWrapper() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        overflow: "hidden",
      }}
    >
      <HomeHero />
      <Container
        maxWidth="lg"
        sx={{
          pt: 10,
        }}
      >
        <HomeStats />
        <HomePokemon />
        <HomeItemCategories />
        <HomeMove />
        <HomeMechanic />
        <HomesRegion />
        <BlogSection />
      </Container>
    </Box>
  );
}
