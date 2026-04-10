"use client";

import { Box, Paper, Typography, Tooltip, Skeleton, Grid } from "@mui/material";
import PokemonHeader from "./PokemonHeader";
import {
  capitalizeName,
  formatValue,
  getDamageResist,
  getImage,
  getMultiplierColor,
  toShowdownId,
} from "@/utils/heplers";
import { useParams } from "next/navigation";
import { Dex } from "@pkmn/dex";
import { useEffect, useState } from "react";

export default function PokemonTypeDefenses() {
  const { name } = useParams();
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setFakeLoading(false), 500);
    return () => clearTimeout(timer);
  }, [name]);

  if (fakeLoading) {
    return (
      <Paper
        elevation={0}
        sx={{
          height: "100%",
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
        }}
      >
        <PokemonHeader title="Type defenses" />
        <Box sx={{ p: 2 }}>
          <Skeleton variant="text" width="80%" height={25} sx={{ mb: 2 }} />
          <Grid container spacing={0.5} columns={6}>
            {Array.from(new Array(18)).map((_, index) => (
              <Grid key={index} size={{ xs: 1 }}>
                <Skeleton
                  variant="rounded"
                  height={100}
                  sx={{ borderRadius: "6px" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    );
  }

  const infoPokemon = Dex.species.get(toShowdownId(name as string));
  const allTypes = Dex.types.all().filter((item) => item.name !== "Stellar");

  console.log(infoPokemon);

  const pokemonTypeData = infoPokemon.types.map((typeName) => {
    return allTypes.find((v) => v.name === typeName)?.damageTaken;
  });

  const typeDefenses = allTypes.map((item) => {
    const finalMultiplier = pokemonTypeData.reduce(
      (acc, currentDamageTaken: any) => {
        const damageCode = currentDamageTaken?.[item.name] || 0;
        return acc * getDamageResist(damageCode);
      },
      1,
    );

    return {
      type: item.name,
      value: finalMultiplier,
      color: getMultiplierColor(finalMultiplier),
    };
  });

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
      }}
    >
      <PokemonHeader title="Type defenses" />

      <Box sx={{ p: 2 }}>
        <Typography
          variant="body2"
          sx={{ mb: 2, color: "#666", fontStyle: "italic" }}
        >
          The effectiveness of each type on{" "}
          <strong>{capitalizeName(name?.toString())}</strong>.
        </Typography>

        <Grid container spacing={0.5} columns={6}>
          {typeDefenses.map((t, index) => (
            <Tooltip key={index} title={t.type} arrow placement="top">
              <Grid size={{ xs: 1 }}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100px",
                    bgcolor: "#fff",
                    transition: "all 0.2s",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      zIndex: 1,
                    },
                  }}
                >
                  {/* Icon hệ */}
                  <Box
                    sx={{
                      py: 0.5,
                      display: "flex",
                      justifyContent: "center",
                      bgcolor: "#f8f9fa",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Box
                      component="img"
                      src={getImage(t.type.toLowerCase())}
                      alt={t.type}
                      sx={{
                        width: 40,
                        height: 40,
                        p: 0.5,
                        filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.1))",
                      }}
                    />
                  </Box>

                  {/* Multiplier */}
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: t.color,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: "800",
                        color: "gold",
                      }}
                    >
                      {formatValue(t.value)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Tooltip>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}
