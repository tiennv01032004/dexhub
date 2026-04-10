"use client";

import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Paper,
  Chip,
  LinearProgress,
  Avatar,
  Divider,
} from "@mui/material";
// Icons
import StraightenIcon from "@mui/icons-material/Straighten";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MapIcon from "@mui/icons-material/Map";
import BoltIcon from "@mui/icons-material/Bolt";

// 1. MOCKUP DỮ LIỆU TỔNG HỢP (Gộp từ 3-4 Endpoints)
const POKEMON_BENTO_DATA = {
  id: 6,
  name: "Charizard",
  genus: "Flame Pokémon",
  types: ["fire", "flying"],
  height: 1.7,
  weight: 90.5,
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
  stats: [
    { label: "HP", value: 78, color: "#FF0000" },
    { label: "ATK", value: 84, color: "#F08030" },
    { label: "DEF", value: 78, color: "#F8D030" },
    { label: "SPD", value: 100, color: "#F85888" },
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
  moves: ["Flamethrower", "Dragon Claw", "Air Slash", "Flare Blitz"],
  locations: ["Lake of Outrage", "Hammerlocke Hills"],
};

const TYPE_COLORS: any = {
  fire: "#FF4422",
  flying: "#8899FF",
  default: "#A8A77A",
};

export default function PokemonBentoDemo() {
  const data = POKEMON_BENTO_DATA;
  const themeColor = TYPE_COLORS[data.types[0]] || TYPE_COLORS.default;

  // Style chung cho các ô Bento
  const bentoStyle = {
    p: 3,
    borderRadius: "24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    border: "1px solid #f0f0f0",
    transition: "0.3s",
    "&:hover": { boxShadow: "0 10px 30px rgba(0,0,0,0.05)" },
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 8, bgcolor: "#fbfbfb", minHeight: "100vh" }}
    >
      <Grid container spacing={3}>
        {/* --- Ô 1: HERO CARD (ẢNH & TÊN) --- */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            elevation={0}
            sx={{
              ...bentoStyle,
              background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}cc 100%)`,
              color: "#fff",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                position: "absolute",
                right: -20,
                top: -20,
                opacity: 0.2,
                fontWeight: 1000,
                fontSize: "10rem",
              }}
            >
              #{data.id}
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={4}
              alignItems="center"
              sx={{ zIndex: 1 }}
            >
              <Box
                component="img"
                src={data.image}
                sx={{
                  width: 240,
                  filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.3))",
                }}
              />
              <Box>
                <Typography
                  variant="h2"
                  sx={{ fontWeight: 1000, textTransform: "uppercase" }}
                >
                  {data.name}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.8, mb: 2 }}>
                  {data.genus}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {data.types.map((t) => (
                    <Chip
                      key={t}
                      label={t.toUpperCase()}
                      sx={{
                        bgcolor: "rgba(255,255,255,0.2)",
                        color: "#fff",
                        fontWeight: 900,
                        backdropFilter: "blur(10px)",
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* --- Ô 2: PHYSICAL STATS --- */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Grid container spacing={3} sx={{ height: "100%" }}>
            <Grid size={6}>
              <Paper
                elevation={0}
                sx={{ ...bentoStyle, textAlign: "center", bgcolor: "#fff" }}
              >
                <StraightenIcon
                  sx={{
                    fontSize: 40,
                    color: themeColor,
                    mb: 1,
                    alignSelf: "center",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 800, color: "text.secondary" }}
                >
                  HEIGHT
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 1000 }}>
                  {data.height} m
                </Typography>
              </Paper>
            </Grid>
            <Grid size={6}>
              <Paper
                elevation={0}
                sx={{ ...bentoStyle, textAlign: "center", bgcolor: "#fff" }}
              >
                <FitnessCenterIcon
                  sx={{
                    fontSize: 40,
                    color: themeColor,
                    mb: 1,
                    alignSelf: "center",
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 800, color: "text.secondary" }}
                >
                  WEIGHT
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 1000 }}>
                  {data.weight} kg
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* --- Ô 3: BASE STATS (CHỈ SỐ) --- */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={0} sx={{ ...bentoStyle, bgcolor: "#fff" }}>
            <Typography variant="h6" sx={{ fontWeight: 1000, mb: 3 }}>
              BASE STATS
            </Typography>
            <Stack spacing={2.5}>
              {data.stats.map((s) => (
                <Box key={s.label}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    mb={0.5}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 900 }}>
                      {s.label}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 900 }}>
                      {s.value}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(s.value / 200) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": { bgcolor: s.color },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* --- Ô 4: EVOLUTION CHAIN --- */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={0} sx={{ ...bentoStyle, bgcolor: "#fff" }}>
            <Typography variant="h6" sx={{ fontWeight: 1000, mb: 3 }}>
              EVOLUTION PATH
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              {data.evolution.map((evo, index) => (
                <React.Fragment key={evo.name}>
                  <Stack alignItems="center">
                    <Avatar
                      src={evo.img}
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: "#f9f9f9",
                        p: 1,
                        border: "1px solid #eee",
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ mt: 1, fontWeight: 800 }}
                    >
                      {evo.name}
                    </Typography>
                  </Stack>
                  {index < data.evolution.length - 1 && (
                    <Typography sx={{ color: "#ccc", fontWeight: 1000 }}>
                      ➔
                    </Typography>
                  )}
                </React.Fragment>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* --- Ô 5: MOVES (SKILLS) --- */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ ...bentoStyle, bgcolor: "#fff" }}>
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
              <BoltIcon sx={{ color: "#FFD700" }} /> TOP MOVES
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {data.moves.map((move) => (
                <Chip
                  key={move}
                  label={move}
                  variant="outlined"
                  sx={{ fontWeight: 700, borderRadius: "10px" }}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* --- Ô 6: LOCATIONS (WHERE TO FIND) --- */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={{ ...bentoStyle, bgcolor: "#fff" }}>
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
              <MapIcon sx={{ color: themeColor }} /> HABITATS
            </Typography>
            <Stack spacing={1}>
              {data.locations.map((loc) => (
                <Typography
                  key={loc}
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: "text.secondary",
                    p: 1.5,
                    bgcolor: "#f9f9f9",
                    borderRadius: "12px",
                  }}
                >
                  📍 {loc}
                </Typography>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
