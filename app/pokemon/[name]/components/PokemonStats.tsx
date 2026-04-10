"use client";

import {
  Box,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import PokemonHeader from "./PokemonHeader";
import { Stat } from "@/types/PokemonDetail";
import { calculateStatRange, getStatColor } from "@/utils/heplers";
import { useGetPokemonDetailQuery } from "@/store/services/pokeApi";
import { useParams } from "next/navigation";

export default function PokemonStats() {
  const { name } = useParams();
  const { data: pokemon, isLoading } = useGetPokemonDetailQuery(name as string);

  if (isLoading || !pokemon) {
    return (
      <Paper
        elevation={0}
        sx={{
          height: "100%",
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          bgcolor: "#fff",
        }}
      >
        <PokemonHeader title="Base Stats" />
        <Box sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mb: 1, borderBottom: "1px solid #eee", pb: 0.5 }}
            >
              <Box sx={{ flex: 1 }}>
                <Skeleton width="40%" />
              </Box>
              <Box sx={{ width: 40 }}>
                <Skeleton width="100%" />
              </Box>
              <Box sx={{ flex: 2 }} />
              <Box sx={{ width: 40 }}>
                <Skeleton width="100%" />
              </Box>
              <Box sx={{ width: 40 }}>
                <Skeleton width="100%" />
              </Box>
            </Stack>
            {[...Array(6)].map((_, i) => (
              <Stack key={i} direction="row" spacing={2} alignItems="center">
                <Box sx={{ flex: 1 }}>
                  <Skeleton width="70%" height={20} />
                </Box>
                <Box sx={{ width: 40 }}>
                  <Skeleton width="100%" height={20} />
                </Box>
                <Box sx={{ flex: 2 }}>
                  <Skeleton
                    variant="rounded"
                    height={10}
                    sx={{ borderRadius: 3 }}
                  />
                </Box>
                <Box sx={{ width: 40 }}>
                  <Skeleton width="100%" height={20} />
                </Box>
                <Box sx={{ width: 40 }}>
                  <Skeleton width="100%" height={20} />
                </Box>
              </Stack>
            ))}
            <Box sx={{ pt: 2, borderTop: "1px dashed #ccc", mt: 1 }}>
              <Stack direction="row" justifyContent="space-between">
                <Skeleton width={80} height={35} />
                <Skeleton width={50} height={35} />
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Paper>
    );
  }

  const totalStats = pokemon.stats.reduce(
    (acc: number, item: Stat) => acc + item.base_stat,
    0,
  );

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
      }}
    >
      <PokemonHeader title="Base Stats" />
      <Box sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mb: 1, borderBottom: "1px solid #eee", pb: 0.5 }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ fontWeight: 600 }}
              >
                STAT
              </Typography>
            </Box>
            <Box sx={{ width: 40, textAlign: "right" }}>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ fontWeight: 600 }}
              >
                BASE
              </Typography>
            </Box>
            <Box sx={{ flex: 2 }} />
            <Box sx={{ width: 40, textAlign: "right" }}>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ fontWeight: 600 }}
              >
                MIN
              </Typography>
            </Box>
            <Box sx={{ width: 40, textAlign: "right" }}>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ fontWeight: 600 }}
              >
                MAX
              </Typography>
            </Box>
          </Stack>

          {pokemon.stats.map((s: Stat) => {
            const { min, max } = calculateStatRange(s.stat.name, s.base_stat);
            return (
              <Stack
                key={s.stat.name}
                direction="row"
                spacing={{ xs: 1, md: 2 }}
                alignItems="center"
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, flex: 1, textTransform: "uppercase" }}
                >
                  {s.stat.name === "special-attack"
                    ? "sp. atk"
                    : s.stat.name === "special-defense"
                      ? "sp. def"
                      : s.stat.name.replace("special-", "Sp. ")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, width: 40, textAlign: "right" }}
                >
                  {s.base_stat}
                </Typography>
                <Box sx={{ flex: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(s.base_stat / 250) * 100}
                    sx={{
                      height: 10,
                      borderRadius: 3,
                      bgcolor: "#eee",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: getStatColor(s.base_stat),
                      },
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{ width: 40, textAlign: "right", color: "#666" }}
                >
                  {min}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ width: 40, textAlign: "right", color: "#666" }}
                >
                  {max}
                </Typography>
              </Stack>
            );
          })}

          <Box sx={{ pt: 2, borderTop: "1px dashed #ccc", mt: 1 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                TOTAL
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 900, color: "error.main" }}
              >
                {totalStats}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}
