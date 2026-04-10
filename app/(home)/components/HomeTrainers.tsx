"use client";

import React from "react";
import { Box, Typography, Grid, alpha, Chip, Stack } from "@mui/material";
import PreviewSection from "./PreviewSection";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const TRAINERS = [
  {
    id: 1,
    name: "Cynthia",
    role: "Champion",
    region: "Sinnoh",
    // Link artwork chất lượng cao từ PokeDB
    image:
      "https://img.pokemondb.net/sprites/trainers/heartgold-soulsilver/cynthia.png",
    color: "#4A5568",
    specialty: "Mixed",
  },
  {
    id: 2,
    name: "Brock",
    role: "Gym Leader",
    region: "Kanto",
    image:
      "https://img.pokemondb.net/sprites/trainers/heartgold-soulsilver/brock.png",
    color: "#ED8936",
    specialty: "Rock",
  },
  {
    id: 3,
    name: "Lance",
    role: "Elite Four",
    region: "Johto",
    image:
      "https://img.pokemondb.net/sprites/trainers/heartgold-soulsilver/lance.png",
    color: "#E53E3E",
    specialty: "Dragon",
  },
  {
    id: 4,
    name: "Blue",
    role: "Rival",
    region: "Kanto",
    image:
      "https://img.pokemondb.net/sprites/trainers/heartgold-soulsilver/blue.png",
    color: "#4299E1",
    specialty: "Mixed",
  },
  {
    id: 5,
    name: "Giovanni",
    role: "Villain Team",
    region: "Team Rocket",
    image:
      "https://img.pokemondb.net/sprites/trainers/heartgold-soulsilver/giovanni.png",
    color: "#2D3748",
    specialty: "Ground",
  },
  {
    id: 6,
    name: "Prof. Oak",
    role: "Professor",
    region: "Kanto",
    image:
      "https://img.pokemondb.net/sprites/trainers/heartgold-soulsilver/oak.png",
    color: "#38A169",
    specialty: "Research",
  },
];

export default function HomeTrainers() {
  return (
    <Box sx={{ py: 4 }}>
      <PreviewSection
        title="Nhân Vật Tiêu Biểu"
        subtitle="Những huấn luyện viên lừng danh và các thế lực trong thế giới Pokémon"
        icon="https://img.pokemondb.net/sprites/items/substitute-doll.png"
        onViewAll={() => (window.location.href = "/trainers")}
      >
        <Grid container spacing={3}>
          {TRAINERS.map((trainer) => (
            <Grid size={4} key={trainer.id}>
              <Box
                sx={{
                  bgcolor: "#FFFFFF",
                  borderRadius: "24px",
                  p: 3,
                  border: "1px solid #EDF2F7",
                  transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: `0 20px 40px ${alpha(trainer.color, 0.12)}`,
                    transform: "translateY(-8px)",
                    borderColor: trainer.color,
                    "& .trainer-img": { transform: "scale(1.1)" },
                  },
                }}
              >
                {/* Khung chứa ảnh */}
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                    borderRadius: "20px",
                    bgcolor: alpha(trainer.color, 0.08),
                    display: "flex",
                    alignItems: "flex-end", // Trainer thường đứng trên mặt đất
                    justifyContent: "center",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Box
                    component="img"
                    src={trainer.image}
                    alt={trainer.name}
                    className="trainer-img"
                    sx={{
                      height: "85%",
                      width: "auto",
                      transition: "0.4s",
                      filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.1))",
                    }}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 900,
                      color: "#2D3748",
                      fontSize: "1.1rem",
                    }}
                  >
                    {trainer.name}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mt: 0.5, mb: 1 }}>
                    <Chip
                      label={trainer.role}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.65rem",
                        fontWeight: 900,
                        bgcolor: alpha(trainer.color, 0.1),
                        color: trainer.color,
                        borderRadius: "6px",
                        border: `1px solid ${alpha(trainer.color, 0.2)}`,
                      }}
                    />
                  </Stack>

                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#A0AEC0",
                      fontWeight: 700,
                      mb: 0.5,
                    }}
                  >
                    KHU VỰC: {trainer.region.toUpperCase()}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      color: "#4A5568",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <MilitaryTechIcon
                      sx={{ fontSize: "1rem", color: trainer.color }}
                    />
                    {trainer.specialty}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </PreviewSection>
    </Box>
  );
}
