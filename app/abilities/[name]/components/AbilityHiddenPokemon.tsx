"use client";

import PokemonCard from "@/components/shared/PokemonCard1";
import { useGetAbilityDetailQuery } from "@/store/services/pokeApi";
import { Pokemon } from "@/types/AbilityDetail";
import { extractIdFromUrl, toShowdownId } from "@/utils/heplers";
import { CatchingPokemon } from "@mui/icons-material";
import {
  Box,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { Dex } from "@pkmn/dex";
import { useParams } from "next/navigation";

export default function AbilityHiddenPokemon() {
  const { name } = useParams();
  const { data: ability, isLoading } = useGetAbilityDetailQuery(name as string);

  if (isLoading) {
    return (
      <Paper
        sx={{ p: 4, borderRadius: "24px", border: "1px solid #E2E8F0" }}
        elevation={0}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 4 }}>
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="text" width={220} height={32} />
        </Stack>

        <Grid container spacing={2}>
          {[...Array(12)].map((_, idx) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={idx}>
              <Skeleton
                variant="rounded"
                width="100%"
                height={160}
                sx={{ borderRadius: "16px" }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  }

  const hiddenAbility =
    ability.pokemon.filter((p: Pokemon) => p.is_hidden) || [];
  const hasData = hiddenAbility.length > 0;

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: "24px",
        border: "1px solid #E2E8F0",
        bgcolor: "#fff",
        minHeight: hasData ? "auto" : "300px",
        display: "flex",
        flexDirection: "column",
      }}
      elevation={0}
    >
      <SectionTitle
        icon={<CatchingPokemon fontSize="small" />}
        title="Hidden Ability Pokemon"
        color="primary.main"
      />

      {!hasData ? (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 6,
            textAlign: "center",
            bgcolor: alpha("#f8f9fa", 0.5),
            borderRadius: "16px",
            border: "2px dashed #eee",
          }}
        >
          <CatchingPokemon
            sx={{ fontSize: 48, color: "text.disabled", mb: 2, opacity: 0.5 }}
          />
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, color: "text.secondary" }}
          >
            No Hidden Ability Pokemon
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.disabled", maxWidth: "250px", mt: 0.5 }}
          >
            This ability is never found as a hidden trait in any known Pokémon
            species.
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mb: 3, fontWeight: 500 }}
          >
            The following{" "}
            <Box
              component="span"
              sx={{ fontWeight: 800, color: "primary.main" }}
            >
              {hiddenAbility.length}
            </Box>{" "}
            Pokémon can have this as their rare Hidden Ability:
          </Typography>

          <Grid container spacing={2}>
            {hiddenAbility.map((p: Pokemon) => {
              const showdownId = toShowdownId(p.pokemon.name);
              const species = Dex.species.get(showdownId);
              species.num = parseInt(extractIdFromUrl(p.pokemon.url));

              return (
                <Grid size={{ xs: 6, sm: 4, md: 2 }} key={p.pokemon.name}>
                  <PokemonCard species={species} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}
    </Paper>
  );
}

const SectionTitle = ({
  icon,
  title,
  color = "primary.main",
}: {
  icon: React.ReactNode;
  title: string;
  color?: string;
}) => (
  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
    <Box sx={{ color }}>{icon}</Box>
    <Typography variant="h6" sx={{ fontWeight: 800, color: "#1e293b" }}>
      {title}
    </Typography>
  </Stack>
);
