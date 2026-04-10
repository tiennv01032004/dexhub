"use client";

import { Box, Paper, Stack, Typography, Skeleton } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { useParams } from "next/navigation";
import { Dex } from "@pkmn/dex";
import PokemonHeader from "./PokemonHeader";
import React, { useEffect, useState } from "react";
import {
  extractIdFromUrl,
  getEvoCondition,
  toPokeApiId,
  toShowdownId,
} from "@/utils/heplers";

import PokemonCard from "@/components/shared/PokemonCard1";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import SouthIcon from "@mui/icons-material/South";
import { useGetPokemonListQuery } from "@/store/services/pokeApi";

export default function HybridEvolution() {
  const { name } = useParams();
  const [evolutionTree, setEvolutionTree] = useState<any>({});
  const { data: pokemonList, isLoading } = useGetPokemonListQuery(undefined);

  const findRoot = (pokeName: string): string => {
    const species = Dex.species.get(toShowdownId(pokeName));
    if (species.prevo) return findRoot(species.prevo);
    if (species.changesFrom) return findRoot(species.changesFrom);
    if (species.forme === "Mega-Z" || species.forme === "Bond")
      return findRoot(species.baseSpecies);
    return species.name;
  };

  const buildEvolutionTree = (nodeName: string): any => {
    const species = Dex.species.get(nodeName);
    const found = pokemonList?.results?.find(
      (p: any) => p.name === toPokeApiId(nodeName.toLowerCase()),
    );
    if (found) species.num = parseInt(extractIdFromUrl(found.url));
    const node: any = { ...species, next: [] };
    if (species.evos) {
      node.next = species.evos.map((evoName: string) =>
        buildEvolutionTree(evoName),
      );
    }
    return node;
  };

  useEffect(() => {
    if (name && pokemonList) {
      const rootName = findRoot(name as string);
      setEvolutionTree(buildEvolutionTree(rootName));
    }
  }, [name, pokemonList]);

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
        <PokemonHeader title="Evolution chart" />
        <Box
          sx={{
            p: { xs: 2, md: 4 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            spacing={{ xs: 3, md: 4 }}
          >
            {[...Array(3)].map((_, i) => (
              <React.Fragment key={i}>
                <Skeleton
                  variant="rounded"
                  sx={{
                    borderRadius: "15px",
                    width: { xs: 120, md: 140 },
                    height: { xs: 160, md: 180 },
                  }}
                />
                {i < 2 && (
                  <Stack alignItems="center" spacing={1}>
                    <Skeleton
                      variant="text"
                      sx={{ width: { xs: 40, md: 60 } }}
                    />
                    <Skeleton variant="circular" width={32} height={32} />
                  </Stack>
                )}
              </React.Fragment>
            ))}
          </Stack>
        </Box>
      </Paper>
    );
  }

  const renderEvolutionNode = (node: any) => {
    if (!node || !node.name) return null;
    const nextLength = node.next?.length || 0;
    const avg = nextLength ? (nextLength + 1) / 2 : 0;

    return (
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        spacing={{ xs: 4, md: 2 }}
        key={node.name}
      >
        {/* Card Pokemon */}
        <Box sx={{ transform: { xs: "scale(0.9)", md: "none" } }}>
          <PokemonCard species={node} />
        </Box>

        {nextLength > 0 && (
          <Stack
            direction={{ xs: "row", md: "column" }}
            spacing={{ xs: 4, md: 2 }}
          >
            {node.next.map((evoChild: any, index: number) => {
              const currentPos = index + 1;
              return (
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  alignItems="center"
                  key={evoChild.name}
                >
                  <Stack
                    alignItems="center"
                    sx={{ minWidth: { xs: 0, md: 120 }, py: { xs: 2, md: 0 } }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#666",
                        mb: 0.5,
                        fontWeight: 700,
                        fontSize: { xs: "0.7rem", md: "0.75rem" },
                        textAlign: "center",
                      }}
                    >
                      {getEvoCondition(evoChild)}
                    </Typography>

                    <Box sx={{ display: { xs: "block", md: "none" } }}>
                      <SouthIcon color="action" />
                    </Box>
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                      {currentPos < avg ? (
                        <NorthEastIcon fontSize="large" color="action" />
                      ) : currentPos > avg ? (
                        <SouthEastIcon fontSize="large" color="action" />
                      ) : (
                        <EastIcon fontSize="large" color="action" />
                      )}
                    </Box>
                  </Stack>

                  {renderEvolutionNode(evoChild)}
                </Stack>
              );
            })}
          </Stack>
        )}
      </Stack>
    );
  };

  return (
    <Paper elevation={0}>
      <PokemonHeader title="Evolution chart" />
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          p: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#fcfcfc",
          "&::-webkit-scrollbar": { height: "6px" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#ddd",
            borderRadius: "10px",
          },
        }}
      >
        <Box
          sx={{
            margin: "0 auto",
            minWidth: "max-content",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {evolutionTree.name &&
          (!evolutionTree.next || evolutionTree.next.length === 0) ? (
            <Typography
              sx={{ textAlign: "center", py: 4, color: "text.secondary" }}
            >
              <strong>{evolutionTree.name}</strong> does not evolve.
            </Typography>
          ) : (
            renderEvolutionNode(evolutionTree)
          )}
        </Box>
      </Box>
    </Paper>
  );
}
