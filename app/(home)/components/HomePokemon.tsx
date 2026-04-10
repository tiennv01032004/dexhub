"use client";
import { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Fade,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import PokemonCardSkeleton from "@/components/skeleton/PokemonCardSkeleton";
import PreviewSectionSkeleton from "@/components/skeleton/PreviewSectionSkeleton";
import PreviewSection from "./PreviewSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  useGetGenerationDetailQuery,
  useGetGenerationListQuery,
} from "@/store/services/pokeApi";
import { Result } from "@/types/Generation";
import { capitalizeName } from "@/utils/heplers";
import PokemonCard from "@/components/shared/PokemonCard1";
import { Dex } from "@pkmn/dex";
import { VersionGroup } from "@/types/GenerationDetail";

import { useRouter } from "next/navigation";

export default function HomePokemon() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: generation } = useGetGenerationListQuery(undefined);
  const [tab, setTab] = useState(0);
  const { data: detail, isFetching } = useGetGenerationDetailQuery(tab + 1);

  const genCount = generation?.count || 0;

  const router = useRouter();

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      {isMobile ? (
        <FormControl fullWidth sx={{ mb: 4 }}>
          <Select
            value={tab}
            onChange={(e) => setTab(Number(e.target.value))}
            sx={{
              fontWeight: 900,
              borderRadius: "12px",
              bgcolor: "background.paper",
            }}
          >
            {Array.from({ length: genCount }).map((_, index) => (
              <MenuItem key={index} value={index}>
                Generation {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 4, "& .MuiTab-root": { fontWeight: 900 } }}
        >
          {Array.from({ length: genCount }).map((_, index) => (
            <Tab label={`Gen ${index + 1}`} key={index} />
          ))}
        </Tabs>
      )}

      <Box sx={{}}>
        <Fade in key={tab} timeout={500}>
          <Box>
            {isFetching || !detail ? (
              <PreviewSectionSkeleton>
                {Array.from({ length: 4 }).map((_, index) => (
                  <PokemonCardSkeleton key={index} />
                ))}
              </PreviewSectionSkeleton>
            ) : (
              <PreviewSection
                title={`Pokemon ${capitalizeName(detail.main_region.name)} (${detail.version_groups.map((v: VersionGroup) => capitalizeName(v.name)).join(", ")})`}
                subtitle={`A total of ${detail.pokemon_species.length} Pokémon species discovered in the ${detail.main_region.name} region`}
                onViewAll={() => router.push(`/pokemon?gen=${tab + 1}`)}
                icon="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              >
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,

                      spaceBetween: 10,
                    },

                    640: {
                      slidesPerView: 2,

                      spaceBetween: 20,
                    },

                    1024: {
                      slidesPerView: 4,

                      spaceBetween: 30,
                    },
                  }}
                  navigation
                  pagination={{ clickable: true }}
                  loop
                  style={{
                    padding: "20px 10px 40px 10px",
                  }}
                >
                  {detail.pokemon_species

                    .slice(0, 12)

                    .map((pokemon: Result) => {
                      const species = Dex.species.get(pokemon.name);

                      return (
                        <SwiperSlide
                          key={pokemon.name}
                          style={{
                            display: "flex",

                            justifyContent: "center",

                            alignItems: "center",
                          }}
                        >
                          <PokemonCard species={species}></PokemonCard>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </PreviewSection>
            )}
          </Box>
        </Fade>
      </Box>
    </Paper>
  );
}
