"use client";

import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import { capitalizeName, toPokeApiId } from "@/utils/heplers";
import Link from "next/link";
import { Species } from "@pkmn/dex";

interface PokemonCardProps {
  species: Species;
  isShiny?: boolean;
}

export default function PokemonCard({ species, isShiny }: PokemonCardProps) {
  // const [isImageLoaded, setIsImageLoaded] = useState(false);
  // const { data: pokemon, isFetching } = useGetPokemonDetailQuery(
  //   toPokeApiId(species.name),
  // );

  // const img = !isShiny
  //   ? pokemon?.sprites.other["official-artwork"].front_default
  //   : pokemon?.sprites.other["official-artwork"].front_shiny;

  const img = !isShiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${species.num}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${species.num}.png`;
  return (
    <Paper elevation={0} sx={{ p: 2, backgroundColor: "transparent" }}>
      {/* <Box
        component="img"
        src={img}
        onLoad={() => setIsImageLoaded(true)}
        sx={{
          position: "absolute",
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
      /> */}

      {/* {isImageLoaded ? ( */}
      {/* <PokemonCardSkeleton /> */}
      {/* ) : ( */}
      <Stack
        direction="column"
        alignItems="center"
        sx={{ width: "fit-content", padding: "10px" }}
      >
        <Box
          component="img"
          src={img}
          alt={species.name}
          sx={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${species.num}.png`;
          }}
        />

        <Typography
          variant="caption"
          sx={{
            color: "#999",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        >
          {/* #{String(pokemon?.id || "").padStart(3, "0")} */}#
          {String(species.num || "").padStart(3, "0")}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            fontSize: "1rem",
            "& a": {
              textDecoration: "none",
              color: "#333",
              transition: "all 0.2s ease-in-out",
              display: "inline-block",
              "&:hover": {
                color: "primary.main",
                transform: "scale(1.1)",
                textDecoration: "underline",
              },
            },
          }}
        >
          {/* <Link href={"/pokemon/" + pokemon?.name}>
              {capitalizeName(pokemon?.name || species.name)}
            </Link> */}
          <Link href={"/pokemon/" + toPokeApiId(species.name)}>
            {capitalizeName(species.name)}
          </Link>
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
          {species.types.map((type: string) => (
            <Typography
              key={type}
              variant="body2"
              sx={{
                color: (theme) =>
                  theme.palette.pokemonType?.[type.toLowerCase()] || "#777",
                fontWeight: 600,
                fontSize: "0.8rem",
              }}
            >
              {type}
            </Typography>
          ))}
        </Stack>
      </Stack>
      {/* )} */}
    </Paper>
  );
}
