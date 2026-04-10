"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Divider,
  Chip,
  Fade,
  Snackbar,
  Alert,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useParams } from "next/navigation";
import { Dex, Move } from "@pkmn/dex";
import { getTypeIcon } from "@/utils/heplers";
import PokemonHeader from "./PokemonHeader";
import { useGetPokemonDetailQuery } from "@/store/services/pokeApi";

export default function PokemonMoveSuggest() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { name } = useParams();

  const callApi = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/move-suggest", {
        method: "POST",
        body: JSON.stringify({
          pokemonName: name?.includes("-gmax")
            ? name.toString().replace("-gmax", "")
            : name,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.error || "An error occurred, please try again.");
        return;
      }

      setData(result);
    } catch (err) {
      setErrorMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callApi();
  }, [name]);

  const handleMoveDetail = (name: string) => {
    location.href = `/moves/${name.toLowerCase().replace(/[,.\s]+/g, "-")}`;
  };

  return (
    <Paper elevation={0}>
      <PokemonHeader title="Suggested Move" />

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="warning"
          variant="filled"
          sx={{ width: "100%", borderRadius: "12px" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <Box sx={{ p: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={callApi}
            disabled={loading}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              px: 3,
            }}
          >
            Refresh Build
          </Button>
        </Stack>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <CircularProgress size={50} thickness={5} />
            <Typography
              sx={{
                mt: 2,
                fontWeight: 700,
                color: "#90a4ae",
                letterSpacing: 1,
              }}
            >
              Loading...
            </Typography>
          </Box>
        ) : (
          <Fade in={!loading}>
            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
              gap={3}
            >
              {data?.builds?.slice(0, 3).map((build: any, bIdx: number) => (
                <Box
                  key={bIdx}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "rgba(255,255,255,0.6)",
                    borderRadius: "20px",
                    p: 2,
                    transition: "0.3s",
                    "&:hover": {
                      bgcolor: "#fff",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <Divider sx={{ mb: 3 }}>
                    <Chip
                      label={build.name}
                      sx={{
                        fontWeight: 900,
                        px: 2,
                        background: "black",
                        color: "#fff",
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                        letterSpacing: 1,
                        height: "28px",
                      }}
                    />
                  </Divider>

                  <Stack spacing={2}>
                    {build.moves.map((moveItem: any, mIdx: number) => {
                      const moveName =
                        typeof moveItem === "string" ? moveItem : moveItem.name;
                      const moveDetail = Dex.moves.get(moveName);
                      const typeColor =
                        (moveDetail as Move).type?.toLowerCase() || "normal";

                      return (
                        <Paper
                          key={mIdx}
                          elevation={0}
                          sx={{
                            p: "2px",
                            borderRadius: "12px",
                            border: "1px solid rgba(0,0,0,0.2)",
                            transition: "transform 0.2s",
                            cursor: "pointer",
                            "&:hover": {
                              transform: "scale(1.02)",
                              borderColor: "rgba(0,0,0,0.5)",
                            },
                          }}
                          onClick={() => handleMoveDetail(moveDetail.name)}
                        >
                          <Box
                            sx={{
                              p: 1,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: "8px",
                                bgcolor: (theme) =>
                                  theme.palette.pokemonType[typeColor],
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mr: 1.5,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                              }}
                            >
                              <Box
                                component="img"
                                src={getTypeIcon(typeColor)}
                                sx={{ width: 16 }}
                              />
                            </Box>

                            <Box sx={{ flexGrow: 1 }}>
                              <Typography
                                sx={{
                                  fontSize: "0.8rem",
                                  fontWeight: 800,
                                  color: "#2c3e50",
                                  lineHeight: 1.2,
                                }}
                              >
                                {moveDetail.name}
                              </Typography>
                            </Box>

                            <Box sx={{ textAlign: "right" }}>
                              <Typography
                                sx={{
                                  fontSize: "0.7rem",
                                  fontWeight: 900,
                                  color: "#34495e",
                                }}
                              >
                                {moveDetail.pp}/{moveDetail.pp}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      );
                    })}
                  </Stack>
                </Box>
              ))}
            </Box>
          </Fade>
        )}
      </Box>
    </Paper>
  );
}
