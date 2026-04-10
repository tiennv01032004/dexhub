"use client";

import { Box, Paper, Stack, Typography, Skeleton } from "@mui/material";
import PokemonHeader from "./PokemonHeader";
import {
  useGetPokemonDetailQuery,
  useGetPokemonSpeciesDetailQuery,
} from "@/store/services/pokeApi";
import { useParams } from "next/navigation";
import { getFullLanguageName } from "@/utils/heplers";
import { Name } from "@/types/PokemonSpeciesDetail";

export default function PokemonLanguage() {
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
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          bgcolor: "background.paper",
          borderRadius: "20px",
        }}
      >
        <PokemonHeader title="Other languages" />
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Stack spacing={1}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Stack
                key={index}
                direction="row"
                justifyContent="space-between"
                sx={{
                  py: 1.2,
                  borderTop: index === 0 ? "none" : "1px solid #F1F5F9",
                }}
              >
                <Skeleton variant="text" width="30%" height={20} />
                <Skeleton variant="text" width="25%" height={20} />
              </Stack>
            ))}
          </Stack>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={0}>
      <PokemonHeader title="Other languages" />

      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Stack spacing={1}>
          {species?.names?.map((n: Name, index: number) => (
            <Stack
              key={index}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                py: 1.2,
                borderTop: index === 0 ? "none" : "1px solid #F1F5F9",
              }}
            >
              <Typography
                sx={{
                  color: "#64748B",
                  fontSize: { xs: "0.75rem", md: "0.85rem" },
                  fontWeight: 600,
                }}
              >
                {getFullLanguageName(n.language.name)}
              </Typography>
              <Typography
                sx={{
                  color: "#1E293B",
                  fontWeight: 700,
                  fontSize: { xs: "0.75rem", md: "0.85rem" },
                  textAlign: "right",
                }}
              >
                {n.name}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
