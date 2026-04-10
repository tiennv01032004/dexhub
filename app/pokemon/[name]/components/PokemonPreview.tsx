"use client";

import React, { useRef } from "react";
import { Box, Paper, IconButton, Tooltip, Skeleton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PokemonHeader from "./PokemonHeader";
import { useGetPokemonDetailQuery } from "@/store/services/pokeApi";
import { useParams } from "next/navigation";

export default function PokemonPreview() {
  const { name } = useParams();
  const { data: pokemon, isLoading } = useGetPokemonDetailQuery(name as string);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (isLoading || !pokemon) {
    return (
      <Paper
        elevation={0}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
        }}
      >
        <PokemonHeader title="Pokémon Image" />
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            position: "relative",
            minHeight: "400px",
          }}
        >
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ position: "absolute", top: 20, right: 20 }}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              width: "80%",
              maxWidth: "300px",
              aspectRatio: "1/1",
              borderRadius: "20px",
              opacity: 0.6,
              height: "300px",
            }}
          />
        </Box>
      </Paper>
    );
  }

  const img =
    pokemon.sprites.other["official-artwork"]?.front_default ||
    pokemon.sprites.other["home"]?.front_default;

  const cryUrl = pokemon.cries?.latest || pokemon.cries?.legacy;

  const playCry = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.log("Audio play failed:", err));
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        border: "1px solid #E2E8F0",
      }}
    >
      <PokemonHeader title="Pokémon Image" />

      {cryUrl && <audio ref={audioRef} src={cryUrl} preload="auto" />}

      <Box
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          position: "relative",
          minHeight: "400px",
        }}
      >
        {cryUrl && (
          <Tooltip title="Listen to Cry" placement="top">
            <IconButton
              onClick={playCry}
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                bgcolor: "rgba(0,0,0,0.05)",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.1)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s",
              }}
            >
              <VolumeUpIcon sx={{ color: "#555" }} />
            </IconButton>
          </Tooltip>
        )}

        <Box
          component="img"
          src={img}
          alt={name as string}
          sx={{
            width: "100%",
            maxWidth: "350px",
            filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.15))",
            cursor: "pointer",
            animation: "fadeIn 0.5s ease-in-out",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(10px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
          onClick={() => window.open(img, "_blank")}
        />
      </Box>
    </Paper>
  );
}
