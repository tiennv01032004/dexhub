"use client";

import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Fade,
  Grid,
  Paper,
  alpha,
  Stack,
  Typography,
  useTheme,
  Skeleton,
} from "@mui/material";
import PreviewSection from "./PreviewSection";
import Link from "next/link";
import { AutoAwesome, CatchingPokemon } from "@mui/icons-material";
import {
  useGetAbilityListQuery,
  useGetNatureListQuery,
} from "@/store/services/pokeApi";
import { useRouter } from "next/navigation";
import { Result } from "@/types/Generation";

export default function HomeMechanic() {
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const router = useRouter();

  const { data: ability, isLoading: loadingAbility } =
    useGetAbilityListQuery(undefined);
  const { data: nature, isLoading: loadingNature } =
    useGetNatureListQuery(undefined);

  if (loadingAbility || loadingNature) {
    return (
      <Box sx={{ mt: 10 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
        >
          <Skeleton width={120} height={48} />
          <Skeleton width={120} height={48} />
        </Stack>
        <Box>
          <Grid container spacing={2}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "24px",
                    border: "1px solid #f1f5f9",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
                  >
                    <Skeleton variant="text" width="60%" height={30} />
                    <Skeleton variant="circular" width={24} height={24} />
                  </Stack>
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="70%" sx={{ mb: 2 }} />
                  <Skeleton
                    variant="rounded"
                    width={80}
                    height={32}
                    sx={{ borderRadius: "12px" }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }

  const MECHANICS_TABS = [
    {
      id: 0,
      data: ability.results,
      label: "Abilities",
      path: "abilities",
      title: "Abilities",
      subtitle: "Innate powers that provide unique advantages in battle.",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ability-capsule.png",
    },
    {
      id: 1,
      data: nature.results,
      label: "Natures",
      path: "natures",
      title: "Natures",
      subtitle: "Factors that directly influence a Pokémon's stat growth.",
      icon: "https://img.pokemondb.net/sprites/items/everstone.png",
    },
  ];

  const currentTab = MECHANICS_TABS[tab];

  return (
    <Box sx={{ mt: 10 }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mb: 3,
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiTab-root": {
            fontWeight: 900,
            textTransform: "none",
            fontSize: "1rem",
          },
        }}
      >
        {MECHANICS_TABS.map((t) => (
          <Tab label={t.label} key={t.id} />
        ))}
      </Tabs>

      <Box sx={{ mt: 2 }}>
        <Fade key={tab} timeout={500}>
          <PreviewSection
            title={currentTab.title}
            subtitle={currentTab.subtitle}
            icon={currentTab.icon}
            onViewAll={() => router.push(`${currentTab.path}`)}
          >
            <Grid container spacing={2}>
              {currentTab.data.slice(0, 4).map((item: Result) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.name}>
                  <Link
                    href={`/${currentTab.path}/${item.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        height: "100%",
                        borderRadius: "24px",
                        border: "1px solid",
                        borderColor: alpha("#e2e8f0", 0.8),
                        background: "#fff",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          borderColor: "primary.main",
                          boxShadow: `0 20px 40px -12px ${alpha(theme.palette.primary.main, 0.15)}`,
                          "& .mechanic-icon": {
                            color: "primary.main",
                            transform: "rotate(45deg) scale(1.2)",
                          },
                          "& .view-btn": {
                            bgcolor: "primary.main",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ mb: 2 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            textTransform: "capitalize",
                            color: "#1e293b",
                            fontSize: "1.1rem",
                          }}
                        >
                          {item.name.replace(/-/g, " ")}
                        </Typography>
                        <CatchingPokemon
                          className="mechanic-icon"
                          sx={{
                            color: "#cbd5e1",
                            transition: "all 0.4s ease",
                          }}
                        />
                      </Stack>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#64748b",
                          lineHeight: 1.6,
                          mb: 3,
                          flexGrow: 1,
                        }}
                      >
                        Click to view detailed effects and Pokémon that can
                        possess this{" "}
                        {currentTab.label.toLowerCase().slice(0, -1)}.
                      </Typography>

                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box
                          className="view-btn"
                          sx={{
                            py: 0.8,
                            px: 2,
                            borderRadius: "12px",
                            bgcolor: "#f1f5f9",
                            transition: "0.3s",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <AutoAwesome sx={{ fontSize: 14 }} />
                          <Typography
                            sx={{ fontSize: "0.75rem", fontWeight: 700 }}
                          >
                            Details
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </PreviewSection>
        </Fade>
      </Box>
    </Box>
  );
}
