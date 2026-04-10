"use client";

import React from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Stack,
  Divider,
  Chip,
  alpha,
  Skeleton,
} from "@mui/material";
import { Inventory2Outlined } from "@mui/icons-material";
import PokemonHeader from "./PokemonHeader";
import { useGetPokemonDetailQuery } from "@/store/services/pokeApi";
import { useParams } from "next/navigation";
import { HeldItem } from "@/types/PokemonDetail";

export default function PokemonHeldItems() {
  const { name } = useParams();
  const { data: pokemon, isLoading } = useGetPokemonDetailQuery(name as string);

  const heldItems = pokemon?.held_items || [];
  const hasItems = heldItems.length > 0;

  if (isLoading) {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
        }}
      >
        <PokemonHeader title="Wild Held Items" />
        <Box sx={{ p: { xs: 2, md: 2.5 } }}>
          <Stack spacing={3}>
            {[1, 2].map((item) => (
              <Box key={item}>
                <Box
                  sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}
                >
                  <Skeleton
                    variant="rounded"
                    width={44}
                    height={44}
                    sx={{ borderRadius: "12px" }}
                  />
                  <Skeleton variant="text" width="40%" height={30} />
                </Box>
                <Stack spacing={1.5}>
                  {[1, 2].map((row) => (
                    <Skeleton
                      key={row}
                      variant="rounded"
                      width="100%"
                      height={50}
                      sx={{ borderRadius: "16px" }}
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </Paper>
    );
  }

  if (!hasItems) {
    return (
      <Paper elevation={0}>
        <PokemonHeader title="Wild Held Items" />
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Inventory2Outlined
            sx={{ fontSize: 48, mb: 1, color: "text.disabled", opacity: 0.5 }}
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "text.secondary" }}
          >
            No held items found in the wild.
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            This Pokémon is never found holding items in any game version.
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={0}>
      <PokemonHeader title="Wild Held Items" />

      <Box sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack
          divider={
            <Divider flexItem sx={{ borderStyle: "dashed", opacity: 0.6 }} />
          }
          spacing={2}
        >
          {heldItems.map((itemObj: HeldItem) => {
            const rarityGroups = itemObj.version_details.reduce(
              (acc, detail) => {
                const r = detail.rarity;
                if (!acc[r]) acc[r] = [];
                acc[r].push(detail.version.name);
                return acc;
              },
              {} as Record<number, string[]>,
            );

            return (
              <Box key={itemObj.item.name} sx={{ py: 1 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}
                >
                  <Box
                    sx={{
                      p: 0.8,
                      bgcolor: "#f8f9fa",
                      borderRadius: "12px",
                      border: "1px solid #eee",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${itemObj.item.name}.png`}
                      variant="square"
                      sx={{
                        width: 28,
                        height: 28,
                        imageRendering: "pixelated",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 800,
                      textTransform: "capitalize",
                      color: "#1a1a1a",
                    }}
                  >
                    {itemObj.item.name.replace(/-/g, " ")}
                  </Typography>
                </Box>

                <Stack spacing={1.5}>
                  {Object.entries(rarityGroups).map(([rarity, versions]) => {
                    const isCommon = Number(rarity) > 5;
                    const themeColor = isCommon ? "#2e7d32" : "#d32f2f";

                    return (
                      <Box
                        key={rarity}
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: { xs: "flex-start", sm: "center" },
                          gap: { xs: 1, sm: 2 },
                          p: 1.5,
                          borderRadius: "16px",
                          bgcolor: alpha(themeColor, 0.03),
                          border: "1px solid",
                          borderColor: alpha(themeColor, 0.1),
                        }}
                      >
                        <Box sx={{ minWidth: "100px" }}>
                          <Typography
                            sx={{
                              fontSize: "0.7rem",
                              fontWeight: 900,
                              color: "#fff",
                              bgcolor: themeColor,
                              px: 1,
                              py: 0.3,
                              borderRadius: "6px",
                              display: "inline-block",
                              boxShadow: `0 3px 8px ${alpha(themeColor, 0.2)}`,
                            }}
                          >
                            {rarity}% CHANCE
                          </Typography>
                        </Box>

                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}
                        >
                          {versions.map((v) => (
                            <Chip
                              key={v}
                              label={v.replace(/-/g, " ")}
                              size="small"
                              sx={{
                                fontWeight: 700,
                                fontSize: "0.65rem",
                                textTransform: "capitalize",
                                bgcolor: "#fff",
                                border: "1px dotted",
                                borderColor: alpha(themeColor, 0.2),
                                height: "22px",
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Paper>
  );
}
