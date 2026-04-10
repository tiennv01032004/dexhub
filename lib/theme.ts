"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    pokemonType: { [key: string]: string };
  }
  interface PaletteOptions {
    pokemonType?: { [key: string]: string };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#DC0A2D",
      dark: "#B00824",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#28AAFD",
      light: "#53BBFE",
      dark: "#1E7FC0",
    },
    background: {
      default: "#F2F2F2",
      paper: "#FFFFFF",
    },

    pokemonType: {
      fire: "#f42",
      water: "#6890F0",
      grass: "#7c5",
      electric: "#F8D030",
      normal: "#aa9",
      flying: "#A890F0",
      ground: "#db5",
      bug: "#A8B820",
      steel: "#aab",
      ice: "#98D8D8",
      dark: "#754",
      fairy: "#e9e",
      dragon: "#7038F8",
      psychic: "#F85888",
      ghost: "#705898",
      rock: "#B8A038",
      poison: "#a59",
      fighting: "#b54",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: "2rem", fontWeight: 700 },
    body1: { fontSize: "0.938rem" },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        },
      },
    },
  },
});
