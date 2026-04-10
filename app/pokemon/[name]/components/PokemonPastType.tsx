"use client";

import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  alpha,
  Divider,
  Skeleton,
  Chip,
} from "@mui/material";
import { HistoryEdu, Verified } from "@mui/icons-material";
import { useParams } from "next/navigation";
import { useGetPokemonDetailQuery } from "@/store/services/pokeApi";
import { capitalizeName } from "@/utils/heplers";
import PokemonHeader from "./PokemonHeader";
import { PastType } from "@/types/PokemonDetail";

export default function PokemonPastTypes() {
  const { name } = useParams();
  const { data: pokemon, isLoading } = useGetPokemonDetailQuery(name as string);

  const pastTypes = pokemon?.past_types || [];
  const hasChanges = pastTypes.length > 0;

  if (isLoading) {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          border: "1px solid #eee",
          overflow: "hidden",
        }}
      >
        <PokemonHeader title="Type History" />
        <Box sx={{ p: 2.5 }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={80}
            sx={{ borderRadius: "16px" }}
          />
        </Box>
      </Paper>
    );
  }

  if (!hasChanges) {
    return (
      <Paper elevation={0} sx={{ height: "100%" }}>
        <PokemonHeader title="Type History" />
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Verified
            sx={{ fontSize: 40, mb: 1.5, color: "text.disabled", opacity: 0.6 }}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "text.secondary" }}
          >
            Types are Original
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.disabled", mt: 0.5 }}
          >
            This Pokémon has maintained its elemental typing since its debut.
          </Typography>
        </Box>
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
      <PokemonHeader title="Type History" />
      <Box sx={{ p: 2.5 }}>
        <Stack
          divider={<Divider flexItem sx={{ borderStyle: "dashed", my: 2 }} />}
          spacing={2}
        >
          {pastTypes.map((past: PastType, index: number) => (
            <Box
              key={index}
              sx={{
                p: 2,
                borderRadius: "16px",
                bgcolor: alpha("#ed6c02", 0.03),
                border: "1px solid",
                borderColor: alpha("#ed6c02", 0.1),
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                transition: "0.2s",
                "&:hover": {
                  bgcolor: alpha("#ed6c02", 0.06),
                  borderColor: alpha("#ed6c02", 0.2),
                },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  bgcolor: "#ed6c02",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: `0 4px 10px ${alpha("#ed6c02", 0.3)}`,
                }}
              >
                <HistoryEdu sx={{ color: "#fff", fontSize: 20 }} />
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 900,
                    color: "#e65100",
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    display: "block",
                    mb: 0.5,
                  }}
                >
                  During & Before{" "}
                  {past.generation.name
                    .replace("generation-", "GEN ")
                    .toUpperCase()}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 1.5 }}
                >
                  <Box
                    component="span"
                    sx={{ fontWeight: 700, color: "text.primary" }}
                  >
                    {capitalizeName(pokemon.name)}
                  </Box>{" "}
                  was classified as:
                </Typography>

                <Stack direction="row" spacing={1}>
                  {past.types.map((t) => (
                    <Chip
                      key={t.type.name}
                      label={t.type.name}
                      size="small"
                      sx={{
                        borderRadius: "6px",
                        bgcolor: "#fff",
                        border: "1px solid",
                        borderColor: alpha("#ed6c02", 0.3),
                        fontWeight: 800,
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        height: "24px",
                        color: "#e65100",
                        "& .MuiChip-label": { px: 1.5 },
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
