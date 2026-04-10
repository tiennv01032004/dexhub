"use client";

import React from "react";
import {
  Box,
  Stack,
  MenuItem,
  FormControl,
  Select,
  useMediaQuery,
  useTheme,
  Typography,
  SelectChangeEvent,
  Skeleton,
} from "@mui/material";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  useGetPokemonDetailQuery,
  useGetPokemonSpeciesDetailQuery,
} from "@/store/services/pokeApi";
import { capitalizeName } from "@/utils/heplers";
import { Variety } from "@/types/PokemonSpeciesDetail";
import { EXCLUDED_FORMS } from "@/constants";
import { KeyboardArrowDown } from "@mui/icons-material";

export default function PokemonVarietyLinks() {
  const pathname = usePathname();
  const { name } = useParams();
  const router = useRouter();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { data: pokemon, isLoading: isLoadingPokemon } =
    useGetPokemonDetailQuery(name as string);

  const { data: species, isLoading: isLoadingSpecies } =
    useGetPokemonSpeciesDetailQuery(pokemon?.species?.name ?? "", {
      skip: !pokemon?.species?.name,
    });

  const isLoading = isLoadingPokemon || isLoadingSpecies || !species;

  if (isLoading) {
    return (
      <Box sx={{ width: "100%", mb: 3 }}>
        {isMobile ? (
          <Box sx={{ px: 0 }}>
            <Skeleton
              variant="text"
              width={80}
              height={20}
              sx={{ mb: 1, ml: 1 }}
            />
            <Skeleton
              variant="rounded"
              width="100%"
              height={40}
              sx={{ borderRadius: "12px" }}
            />
          </Box>
        ) : (
          <Stack
            direction="row"
            spacing={1}
            sx={{ borderBottom: "1px solid #d9d9d9", pb: "1px" }}
          >
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={item}
                variant="rectangular"
                width={120}
                height={42}
                sx={{ borderRadius: "10px 10px 0 0" }}
              />
            ))}
          </Stack>
        )}
      </Box>
    );
  }

  const varieties =
    species.varieties.filter(
      (v: Variety) => !EXCLUDED_FORMS.includes(v.pokemon.name),
    ) || [];

  const handleMobileChange = (event: SelectChangeEvent) => {
    const newPath = event.target.value;
    router.push(newPath);
  };

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      {isMobile ? (
        <Box sx={{ px: 0 }}>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mb: 1,
              fontWeight: 700,
              color: "text.secondary",
              textTransform: "uppercase",
              ml: 1,
            }}
          >
            Select Form
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={pathname.toLowerCase()}
              onChange={handleMobileChange}
              IconComponent={KeyboardArrowDown}
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "0.9rem",
                bgcolor: "#fff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e0e0e0",
                  borderWidth: "1.5px",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              }}
            >
              {varieties.map((v: Variety) => {
                const href = `/pokemon/${v.pokemon.name.toLowerCase()}`;
                return (
                  <MenuItem
                    key={v.pokemon.name}
                    value={href}
                    sx={{ fontWeight: 500, fontSize: "0.9rem" }}
                  >
                    {capitalizeName(v.pokemon.name)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      ) : (
        <Stack
          direction="row"
          sx={{
            borderBottom: "1px solid #d9d9d9",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {varieties.map((v: Variety) => {
            const href = `/pokemon/${v.pokemon.name.toLowerCase()}`;
            const isActive = pathname.toLowerCase() === href;

            return (
              <Link
                key={v.pokemon.name}
                href={href}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    padding: "8px 25px",
                    borderRadius: "10px 10px 0 0",
                    border: "1px solid",
                    borderColor: isActive ? "primary.main" : "#e0e0e0",
                    backgroundColor: isActive ? "primary.main" : "#fff",
                    color: isActive ? "#fff" : "text.secondary",
                    position: "relative",
                    bottom: "-1px",
                    zIndex: isActive ? 2 : 1,
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      backgroundColor: isActive ? "primary.main" : "#f5f5f5",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  {capitalizeName(v.pokemon.name)}
                </Box>
              </Link>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
