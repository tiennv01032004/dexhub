"use client";
import { Box, Typography, Stack } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

interface PokemonHeaderProps {
  title: string;
}

export default function PokemonHeader({ title }: PokemonHeaderProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          height: { xs: 36, md: 40 },
          display: "flex",
          alignItems: "center",
          bgcolor: "primary.main",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            px: { xs: 1.5, md: 2 },
            width: "100%",
          }}
        >
          <AutoAwesomeIcon
            sx={{
              color: "#fff",
              fontSize: { xs: 16, md: 20 },
              mr: { xs: 1, md: 2 },
              filter: "drop-shadow(0 0 10px #fff)",
            }}
          />

          <Typography
            sx={{
              fontWeight: 900,
              fontSize: { xs: "0.75rem", md: "0.9rem" },
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: { xs: "1.5px", md: "3px" },
              fontStyle: "italic",
              textShadow: "2px 2px 0px rgba(0,0,0,0.15)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
        </Stack>
      </Box>
    </Box>
  );
}
