"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Skeleton,
  Stack,
  alpha,
} from "@mui/material";
import { CatchingPokemon, AutoAwesome } from "@mui/icons-material";
import Link from "next/link";
import { useGetAbilityListQuery } from "@/store/services/pokeApi";
import { AbilityDetail } from "@/types/AbilityDetail";
import { useEffect, useState } from "react";
import { client } from "@/lib/contentful";
import Banner from "@/components/layout/Banner";

export default function AbilitiesPage() {
  const { data: abilities, isLoading } = useGetAbilityListQuery(undefined);

  // const [banner, setBanner] = useState<any>(null);

  // useEffect(() => {
  //   const fetchBanner = async () => {
  //     const response = await client.getEntries({
  //       content_type: "banner",
  //       "fields.title": "abilities",
  //     });
  //     if (response.items.length > 0) setBanner(response.items[0]);
  //   };

  //   fetchBanner();
  // }, []);

  if (isLoading || !abilities) {
    return (
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Banner banner="abilities" />
        <Container maxWidth="lg">
          <Box>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {Array.from({ length: 16 }).map((_, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Paper sx={{ p: 3, borderRadius: "24px" }}>
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={30}
                      sx={{ mb: 1 }}
                    />
                    <Skeleton variant="text" width="90%" height={20} />
                    <Skeleton variant="text" width="40%" height={20} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Banner banner="abilities" />
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {abilities.results.map((ability: AbilityDetail) => (
            <Grid key={ability.name} size={{ xs: 12, sm: 6, md: 4 }}>
              <Link
                href={`/abilities/${ability.name}`}
                style={{
                  textDecoration: "none",
                  display: "block",
                  height: "100%",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    height: "100%",
                    borderRadius: "24px",
                    border: "1px solid",
                    borderColor: alpha("#e2e8f0", 0.8),
                    background: "#fff",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    flexDirection: "column",
                    "@media (hover: hover)": {
                      "&:hover": {
                        transform: "translateY(-8px)",
                        borderColor: "primary.main",
                        boxShadow: (theme) =>
                          `0 20px 40px -12px ${alpha(theme.palette.primary.main, 0.15)}`,
                        "& .ability-icon": {
                          color: "primary.main",
                          transform: "rotate(45deg) scale(1.1)",
                        },
                        "& .view-btn": {
                          bgcolor: "primary.main",
                          color: "#fff",
                        },
                      },
                    },
                    "&:active": {
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.02),
                      transform: "scale(0.98)",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{ mb: 1.5 }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 800,
                        textTransform: "capitalize",
                        color: "#1e293b",
                        fontSize: { xs: "1rem", md: "1.1rem" },
                        pr: 2,
                      }}
                    >
                      {ability.name.replace(/-/g, " ")}
                    </Typography>
                    <CatchingPokemon
                      className="ability-icon"
                      sx={{
                        color: "#cbd5e1",
                        transition: "all 0.3s ease",
                        fontSize: { xs: 20, md: 24 },
                      }}
                    />
                  </Stack>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.5,
                      mb: 2.5,
                      flexGrow: 1,
                      fontSize: { xs: "0.8rem", md: "0.875rem" },
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    Detailed effects and Pokémon compatible with this ability.
                  </Typography>

                  <Stack direction="row" alignItems="center">
                    <Box
                      className="view-btn"
                      sx={{
                        py: 0.6,
                        px: 1.5,
                        borderRadius: "10px",
                        bgcolor: "#f1f5f9",
                        transition: "0.2s",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                      }}
                    >
                      <AutoAwesome sx={{ fontSize: 12 }} />
                      <Typography sx={{ fontSize: "0.7rem", fontWeight: 700 }}>
                        Details
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
