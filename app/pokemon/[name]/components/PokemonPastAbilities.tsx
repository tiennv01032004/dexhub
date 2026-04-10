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
import { AutoAwesome, HistoryToggleOff } from "@mui/icons-material";
import { useParams } from "next/navigation";
import { useGetPokemonDetailQuery } from "@/store/services/pokeApi";
import PokemonHeader from "./PokemonHeader";
import { Ability, PastAbility } from "@/types/PokemonDetail";

export default function PokemonPastAbilities() {
  const { name } = useParams();
  const { data: pokemon, isLoading } = useGetPokemonDetailQuery(name as string);

  const validPastAbilities = (pokemon?.past_abilities || []).filter(
    (past: PastAbility) =>
      past.abilities.some((a: Ability) => a.ability !== null),
  );

  const hasChanges = validPastAbilities.length > 0;

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
        <PokemonHeader title="Ability History" />
        <Box sx={{ p: 2.5 }}>
          <Stack spacing={2}>
            <Skeleton
              variant="rounded"
              width="100%"
              height={80}
              sx={{ borderRadius: "16px" }}
            />
          </Stack>
        </Box>
      </Paper>
    );
  }

  if (!hasChanges) {
    return (
      <Paper elevation={0} sx={{ height: "100%" }}>
        <PokemonHeader title="Ability History" />
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
          <HistoryToggleOff
            sx={{ fontSize: 40, mb: 1.5, color: "text.disabled", opacity: 0.5 }}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "text.secondary" }}
          >
            No Ability Changes
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.disabled", mt: 0.5 }}
          >
            This Pokémon is abilities have remained consistent across
            generations.
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
      <PokemonHeader title="Ability History" />
      <Box sx={{ p: 2.5 }}>
        <Stack
          divider={<Divider flexItem sx={{ borderStyle: "dashed", my: 1.5 }} />}
          spacing={2}
        >
          {validPastAbilities.map((past: PastAbility, index: number) => (
            <Box
              key={index}
              sx={{
                p: 2,
                borderRadius: "16px",
                bgcolor: alpha("#7b1fa2", 0.03),
                border: "1px solid",
                borderColor: alpha("#7b1fa2", 0.08),
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                transition: "0.2s",
                "&:hover": {
                  bgcolor: alpha("#7b1fa2", 0.05),
                  borderColor: alpha("#7b1fa2", 0.2),
                },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  bgcolor: "#7b1fa2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: `0 4px 10px ${alpha("#7b1fa2", 0.3)}`,
                }}
              >
                <AutoAwesome sx={{ color: "#fff", fontSize: 20 }} />
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 900,
                    color: "#7b1fa2",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    display: "block",
                    mb: 0.5,
                  }}
                >
                  During & Before{" "}
                  {past.generation.name.replace(/-/g, " ").toUpperCase()}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.primary", fontWeight: 600, mb: 1 }}
                >
                  Old Ability Set:
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  useFlexGap
                  sx={{ gap: 1 }}
                >
                  {past.abilities
                    .filter((a: Ability) => a.ability !== null)
                    .map((a: Ability) => (
                      <Chip
                        key={a.ability.name}
                        label={a.ability.name.replace(/-/g, " ")}
                        size="small"
                        sx={{
                          borderRadius: "8px",
                          bgcolor: "#fff",
                          border: "1px solid",
                          borderColor: alpha("#7b1fa2", 0.2),
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          textTransform: "capitalize",
                          height: "24px",
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
