"use client";

import {
  Grid,
  Typography,
  Box,
  Stack,
  Divider,
  MenuItem,
  Select,
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  alpha,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PokemonCard from "@/components/shared/PokemonCard1";
import { usePokemonData } from "@/hooks/usePokemonData";

const ITEMS_PER_PAGE = 40;

export default function PokemonList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const gen = searchParams.get("gen");
  const type = searchParams.get("type");
  const tag = searchParams.get("tag");
  const isShiny = searchParams.get("shiny") === "true";
  const sortBy = searchParams.get("sort_by") || "id-asc";
  const page = Number(searchParams.get("page")) || 1;

  const [isSorting, setIsSorting] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const { displayList, totalFiltered, hasMore } = usePokemonData(
    gen,
    type,
    tag,
    sortBy,
    page,
    ITEMS_PER_PAGE,
  );

  const updateParams = (
    updates: Record<string, string | null>,
    scroll = false,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) params.delete(key);
      else params.set(key, value);
    });
    router.push(`?${params.toString()}`, { scroll });
  };

  useEffect(() => {
    setIsSorting(false);
    setLoadingMore(false);
  }, [sortBy, gen, type, page]);

  const handleSortChange = (value: string) => {
    setIsSorting(true);
    updateParams({ sort_by: value, page: "1" }, true);
  };

  return (
    <Box sx={{ width: "100%", p: { xs: 1.5, sm: 2, md: 3 }, bgcolor: "#fff" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 4,
              height: 16,
              bgcolor: "primary.main",
              borderRadius: 4,
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: 700 }}
          >
            Showing {displayList.length} of {totalFiltered} Pokémon
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{
            width: { xs: "100%", sm: "auto" },
            justifyContent: { xs: "space-between", sm: "flex-end" },
          }}
        >
          <Box
            sx={{
              ...filterControlStyle,
              display: "flex",
              alignItems: "center",
              px: 1.5,
              flex: { xs: 1, sm: "none" },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: "text.disabled",
                display: { xs: "none", md: "block" },
                whiteSpace: "nowrap",
                mr: 1,
              }}
            >
              SORT BY
            </Typography>

            <Select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              size="small"
              variant="standard"
              disableUnderline
              sx={{
                fontSize: "0.75rem",
                fontWeight: 800,
                width: "100%",
                "& .MuiSelect-select": {
                  py: 0.5,
                  pr: "20px !important",
                },
              }}
            >
              <MenuItem value="id-asc" sx={menuItemStyle}>
                Lowest Number
              </MenuItem>
              <MenuItem value="id-desc" sx={menuItemStyle}>
                Highest Number
              </MenuItem>
              <MenuItem value="name-asc" sx={menuItemStyle}>
                A - Z
              </MenuItem>
              <MenuItem value="name-desc" sx={menuItemStyle}>
                Z - A
              </MenuItem>
            </Select>
          </Box>

          {/* SHINY SWITCH */}
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={isShiny}
                onChange={(e) => {
                  updateParams(
                    { shiny: e.target.checked ? "true" : null },
                    false,
                  );
                }}
              />
            }
            label={
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <AutoAwesomeIcon
                  sx={{ fontSize: 16, color: isShiny ? "red" : "#BDC3C7" }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    ...labelStyle,
                    color: isShiny ? "primary.main" : "text.disabled",
                    display: { xs: "none", xsm: "block" },
                  }}
                >
                  SHINY
                </Typography>
              </Stack>
            }
            sx={{
              ...filterControlStyle,
              padding: "2px 8px",
              margin: 0,
              bgcolor: isShiny
                ? (theme) => alpha(theme.palette.primary.main, 0.1)
                : "#F8F9FA",
            }}
          />
        </Stack>
      </Stack>

      <Divider sx={{ mb: 4, opacity: 0.6 }} />

      <Box sx={{ position: "relative", minHeight: "400px" }}>
        <Grid
          container
          spacing={{ xs: 1.5, sm: 2, md: 3 }}
          sx={{ opacity: isSorting ? 0.3 : 1, transition: "0.3s" }}
        >
          {displayList.map((p, index) => (
            <Grid
              key={`${p.id}-${index}`}
              size={{ xs: 6, sm: 4, md: 3, lg: 3 }}
              sx={gridItemStyle(index, page)}
            >
              <PokemonCard species={p} isShiny={isShiny} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {hasMore && (
        <Stack alignItems="center" sx={{ mt: { xs: 4, md: 8 }, mb: 4 }}>
          <Button
            variant="outlined"
            disabled={loadingMore || isSorting}
            onClick={() => {
              setLoadingMore(true);
              updateParams({ page: (page + 1).toString() });
            }}
            sx={loadMoreButtonStyle}
          >
            {loadingMore ? <CircularProgress size={20} /> : "Load More Pokémon"}
          </Button>
        </Stack>
      )}
    </Box>
  );
}

const labelStyle = { fontWeight: 800, letterSpacing: "0.02em" };

const menuItemStyle = { fontSize: "0.75rem", fontWeight: 700 };

const filterControlStyle = {
  margin: 0,
  padding: "4px 12px",
  borderRadius: "10px",
  bgcolor: "#F8F9FA",
  border: "1px solid #eee",
  transition: "all 0.2s",
  "&:hover": { borderColor: "primary.main" },
  "& .MuiFormControlLabel-label": { ml: 0.5 },
};

const gridItemStyle = (index: number, page: number) => ({
  display: "flex",
  justifyContent: "center",
  animation:
    index >= (page - 1) * ITEMS_PER_PAGE
      ? "fadeInUp 0.4s ease forwards"
      : "none",
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

const loadMoreButtonStyle = {
  px: { xs: 4, md: 6 },
  py: 1.5,
  borderRadius: "14px",
  fontWeight: 800,
  textTransform: "none",
  minWidth: { xs: "100%", sm: 220 },
};
