import PokemonCard from "@/components/shared/PokemonCard1";
import { HeldByPokemon, VersionDetail } from "@/types/ItemDetail";
import { extractIdFromUrl, toShowdownId } from "@/utils/heplers";
import { alpha, Box, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { Dex } from "@pkmn/dex";

import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { useParams } from "next/navigation";
import { useGetItemDetailQuery } from "@/store/services/pokeApi";

export default function ItemPokemon() {
  const { name } = useParams();
  const { data: item, isLoading } = useGetItemDetailQuery(name);

  if (isLoading || !item) {
    return (
      <Paper
        sx={{ p: 4, borderRadius: "24px", border: "1px solid #E2E8F0" }}
        elevation={0}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width={200} height={24} />
        </Box>

        <Stack spacing={3}>
          {[...Array(3)].map((_, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { md: "center" },
                gap: 2,
                pb: 2,
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <Box sx={{ minWidth: "220px" }}>
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={80}
                  sx={{ borderRadius: "12px" }}
                />
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                {[...Array(4)].map((_, tagIdx) => (
                  <Skeleton
                    key={tagIdx}
                    variant="rounded"
                    width={80}
                    height={28}
                    sx={{ borderRadius: "20px" }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{ p: 4, borderRadius: "24px", border: "1px solid #E2E8F0" }}
      elevation={0}
    >
      <Typography
        variant="subtitle1"
        fontWeight={800}
        mb={2}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <CatchingPokemonIcon sx={{ color: "primary.main" }} /> Wild Pokémon
        Availability
      </Typography>

      <Stack spacing={3}>
        {item.held_by_pokemon.length > 0 ? (
          item.held_by_pokemon.map((p: HeldByPokemon) => {
            const species = Dex.species.get(toShowdownId(p.pokemon.name));
            species.num = parseInt(extractIdFromUrl(p.pokemon.url));

            return (
              <Box
                key={p.pokemon.name}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { md: "center" },
                  gap: 2,
                  pb: 2,
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <Box sx={{ minWidth: "220px" }}>
                  <PokemonCard species={species} />
                </Box>

                {/* Version Tags Stream (Dòng chảy phiên bản) */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                  {p.version_details.map(
                    (detail: VersionDetail, idx: number) => {
                      const isRare = detail.rarity > 5;
                      return (
                        <Box
                          key={idx}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "20px",
                            bgcolor: isRare
                              ? alpha("#2e7d32", 0.1)
                              : alpha("#d32f2f", 0.1),
                            border: "1px solid",
                            borderColor: isRare
                              ? alpha("#2e7d32", 0.2)
                              : alpha("#d32f2f", 0.2),
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              textTransform: "capitalize",
                              fontWeight: 700,
                              fontSize: "0.7rem",
                              color: isRare ? "success.dark" : "primary.main",
                            }}
                          >
                            {detail.version.name.replace("-", " ")}
                          </Typography>

                          <Box
                            sx={{
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              bgcolor: isRare ? "success.main" : "primary.main",
                            }}
                          />

                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 900,
                              fontSize: "0.75rem",
                              color: isRare ? "success.main" : "primary.main",
                            }}
                          >
                            {detail.rarity}%
                          </Typography>
                        </Box>
                      );
                    },
                  )}
                </Box>
              </Box>
            );
          })
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            py={4}
            sx={{ fontStyle: "italic" }}
          >
            No Pokémon carrier data found for this item.
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}
