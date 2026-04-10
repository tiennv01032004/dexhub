"use client";

import React from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  LinearProgress,
  Grid,
  Avatar,
  Paper,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

const DATA = {
  id: 6,
  name: "Charizard",
  types: ["fire", "flying"],
  height: 1.7,
  weight: 90.5,
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
  description:
    "It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.",
  stats: [
    { label: "HP", value: 78 },
    { label: "ATK", value: 84 },
    { label: "DEF", value: 78 },
    { label: "SPD", value: 100 },
  ],
  evolution: [
    {
      name: "Charmander",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    },
    {
      name: "Charmeleon",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
    },
    {
      name: "Charizard",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    },
  ],
  moves: ["Flamethrower", "Dragon Claw", "Air Slash", "Overheat", "Blast Burn"],
  locations: ["Kanto Route 2", "Victory Road", "Cerulean Cave"],
};

const TYPE_COLORS: any = {
  fire: "#FF4422",
  flying: "#8899FF",
  default: "#A8A77A",
};

export default function CinematicLayout() {
  const themeColor = TYPE_COLORS[DATA.types[0]] || TYPE_COLORS.default;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "#000",
      }}
    >
      {/* BÊN TRÁI: VISUAL PANEL (Fixed) */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: `linear-gradient(45deg, ${themeColor} 0%, #000 100%)`,
          position: "relative",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            position: "absolute",
            fontWeight: 1000,
            fontSize: "15rem",
            color: "#fff",
            opacity: 0.05,
            top: "10%",
          }}
        >
          #{DATA.id}
        </Typography>
        <Box
          component="img"
          src={DATA.image}
          sx={{
            width: "80%",
            maxWidth: 500,
            zIndex: 2,
            filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.5))",
          }}
        />
      </Box>

      {/* BÊN PHẢI: DATA PANEL (Scrollable) */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          bgcolor: "#121212",
          color: "#fff",
          p: { xs: 4, md: 8 },
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-thumb": { bgcolor: themeColor },
        }}
      >
        <Stack spacing={6}>
          {/* Header Moble (Chỉ hiện trên mobile) */}
          <Box
            sx={{ display: { xs: "block", md: "none" }, textAlign: "center" }}
          >
            <Box component="img" src={DATA.image} sx={{ width: 200, mb: 2 }} />
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{ fontWeight: 1000, textTransform: "uppercase" }}
            >
              {DATA.name}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {DATA.types.map((t) => (
                <Chip
                  key={t}
                  label={t.toUpperCase()}
                  sx={{
                    bgcolor: TYPE_COLORS[t],
                    color: "#fff",
                    fontWeight: 900,
                  }}
                />
              ))}
            </Stack>
            <Typography
              variant="body1"
              sx={{ mt: 3, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}
            >
              {DATA.description}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid size={6}>
              <Typography variant="caption" color="grey.500">
                HEIGHT
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                {DATA.height} m
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="caption" color="grey.500">
                WEIGHT
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                {DATA.weight} kg
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

          {/* STATS */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 1000, mb: 3 }}>
              BASE STATS
            </Typography>
            <Stack spacing={3}>
              {DATA.stats.map((s) => (
                <Box key={s.label}>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="caption" sx={{ fontWeight: 800 }}>
                      {s.label}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 800 }}>
                      {s.value}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={s.value}
                    sx={{
                      height: 4,
                      bgcolor: "rgba(255,255,255,0.1)",
                      "& .MuiLinearProgress-bar": { bgcolor: themeColor },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Box>

          {/* EVOLUTION */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 1000, mb: 3 }}>
              EVOLUTION CHAIN
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              {DATA.evolution.map((evo, i) => (
                <React.Fragment key={i}>
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      src={evo.img}
                      sx={{
                        width: 70,
                        height: 70,
                        bgcolor: "rgba(255,255,255,0.05)",
                        border: `1px solid ${themeColor}44`,
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ display: "block", mt: 1, fontWeight: 700 }}
                    >
                      {evo.name}
                    </Typography>
                  </Box>
                  {i < DATA.evolution.length - 1 && (
                    <Typography sx={{ color: "grey.700" }}>▶</Typography>
                  )}
                </React.Fragment>
              ))}
            </Stack>
          </Box>

          {/* MOVES & FIND */}
          <Grid container spacing={4}>
            <Grid size={6}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 1000,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <SportsKabaddiIcon /> MOVES
              </Typography>
              <Stack spacing={1}>
                {DATA.moves.map((m) => (
                  <Typography
                    key={m}
                    sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}
                  >
                    • {m}
                  </Typography>
                ))}
              </Stack>
            </Grid>
            <Grid size={6}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 1000,
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <LocationOnIcon /> FIND AT
              </Typography>
              <Stack spacing={1}>
                {DATA.locations.map((l) => (
                  <Chip
                    key={l}
                    label={l}
                    size="small"
                    variant="outlined"
                    sx={{ color: "grey.400", borderColor: "grey.800" }}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}
