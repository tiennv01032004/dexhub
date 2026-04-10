"use client";

import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  alpha,
  Grid,
  Skeleton,
  useTheme,
} from "@mui/material";
import { CatchingPokemon, AutoAwesome } from "@mui/icons-material";
import { useGetNatureListQuery } from "@/store/services/pokeApi";
import Link from "next/link";
import { Result } from "@/types/Generation";
import Banner from "@/components/layout/Banner";

export default function NaturesPage() {
  const theme = useTheme();
  const { data: natures, isLoading } = useGetNatureListQuery(undefined);

  if (isLoading) {
    return (
      <Box sx={{ backgroundColor: "background.default" }}>
        <Banner banner="natures" />

        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {Array.from({ length: 16 }).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Paper
                  sx={{ p: 2, borderRadius: "16px", border: "1px solid #eee" }}
                >
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
      <Banner banner="natures" />
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Grid container spacing={3}>
          {natures.results.map((nature: Result) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={nature.name}>
              <Link
                href={`/natures/${nature.name}`}
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
                      "& .ability-icon": {
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
                      }}
                    >
                      {nature.name.replace(/-/g, " ")}
                    </Typography>
                    <CatchingPokemon
                      className="ability-icon"
                      sx={{ color: "#cbd5e1", transition: "all 0.4s ease" }}
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
                    Click to view detail effect and pokemon that can have this
                    ability
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
                      <Typography sx={{ fontSize: "0.75rem", fontWeight: 700 }}>
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
