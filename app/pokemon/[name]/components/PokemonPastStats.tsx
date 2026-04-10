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
} from "@mui/material";
import { Assessment, CheckCircleOutline } from "@mui/icons-material";
import { useParams } from "next/navigation";
import { useGetPokemonDetailQuery } from "@/store/services/pokeApi";
import PokemonHeader from "./PokemonHeader";
import { PastStat, Stat } from "@/types/PokemonDetail";

export default function PokemonPastStats() {
  const { name } = useParams();
  const { data: pokemon, isLoading } = useGetPokemonDetailQuery(name as string);

  const pastStats = pokemon?.past_stats || [];
  const hasChanges = pastStats.length > 0;

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
        <PokemonHeader title="Stat History" />
        <Box sx={{ p: 2.5 }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={100}
            sx={{ borderRadius: "16px" }}
          />
        </Box>
      </Paper>
    );
  }

  if (!hasChanges) {
    return (
      <Paper elevation={0} sx={{ height: "100%" }}>
        <PokemonHeader title="Stat History" />
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
          <CheckCircleOutline
            sx={{ fontSize: 40, mb: 1.5, color: "text.disabled", opacity: 0.6 }}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "text.secondary" }}
          >
            Base Stats are Consistent
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.disabled", mt: 0.5 }}
          >
            No stat adjustments recorded for this Pokémon in previous
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
      <PokemonHeader title="Stat History" />
      <Box sx={{ p: 2.5 }}>
        <Stack
          divider={<Divider flexItem sx={{ borderStyle: "dashed", my: 2 }} />}
          spacing={2}
        >
          {pastStats.map((past: PastStat, index: number) => (
            <Box
              key={index}
              sx={{
                p: 2,
                borderRadius: "16px",
                bgcolor: alpha("#0288d1", 0.03),
                border: "1px solid",
                borderColor: alpha("#0288d1", 0.08),
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                transition: "0.2s",
                "&:hover": {
                  bgcolor: alpha("#0288d1", 0.05),
                  borderColor: alpha("#0288d1", 0.2),
                },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  bgcolor: "#0288d1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: `0 4px 10px ${alpha("#0288d1", 0.25)}`,
                }}
              >
                <Assessment sx={{ color: "#fff", fontSize: 20 }} />
              </Box>

              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 900,
                    color: "#0288d1",
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    display: "block",
                    mb: 1,
                  }}
                >
                  Generation {past.generation.name.split("-")[1].toUpperCase()}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "text.primary", fontWeight: 600, mb: 1.5 }}
                >
                  Stat values in this period:
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                    gap: 1,
                  }}
                >
                  {past.stats.map((s: Stat) => (
                    <Box
                      key={s.stat.name}
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: "8px",
                        bgcolor: "#fff",
                        border: "1px solid #e0e0e0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.6rem",
                          fontWeight: 800,
                          color: "text.disabled",
                          textTransform: "uppercase",
                        }}
                      >
                        {s.stat.name.replace("special-", "Sp.")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 800, color: "text.primary" }}
                      >
                        {s.base_stat}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
