"use client";

import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Slider,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GEN, TAGS, TYPES } from "@/constants";

const INITIAL_STATS = {
  hp: [0, 255],
  attack: [0, 255],
  defense: [0, 255],
  spatk: [0, 255],
  spdef: [0, 255],
  speed: [0, 255],
};

const STAT_FIELDS = [
  { label: "HP", key: "hp" },
  { label: "Attack", key: "attack" },
  { label: "Defense", key: "defense" },
  { label: "Sp. Atk", key: "spatk" },
  { label: "Sp. Def", key: "spdef" },
  { label: "Speed", key: "speed" },
];

export default function PokemonFilter() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [stats, setStats] = useState(INITIAL_STATS);

  const updateParams = useCallback(
    (key: string, value: string | null) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (
        !value ||
        ["All Tags", "All Types", "All Generations"].includes(value)
      ) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      newParams.delete("page");
      router.push(`?${newParams.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const resetFilters = () => {
    setStats(INITIAL_STATS);
    router.push("/pokemon");
  };

  return (
    <Stack
      spacing={3}
      sx={{
        p: 2,
        bgcolor: "#fff",
        borderRadius: "16px",
        position: "sticky",
        top: 100,
        // height: "85vh",
        overflowY: "auto",
        border: "1px solid #eee",
        overflowX: "hidden",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={800}>
          Filters
        </Typography>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Reset">
            <IconButton onClick={resetFilters}>
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
          {/* {isMobile && (
            <IconButton>
              <CloseIcon />
            </IconButton>
          )} */}
        </Stack>
      </Stack>

      {[
        {
          label: "GENERATION",
          key: "gen",
          value: searchParams.get("gen") || "All Generations",
          options: GEN,
        },
        {
          label: "RARE",
          key: "tag",
          value: searchParams.get("tag") || "All Tags",
          options: TAGS,
        },
        {
          label: "TYPE",
          key: "type",
          value: searchParams.get("type") || "All Types",
          options: TYPES,
        },
      ].map((filter) => (
        <FormControl key={filter.key} fullWidth>
          <Typography
            variant="caption"
            fontWeight={800}
            mb={1}
            color="text.disabled"
          >
            {filter.label}
          </Typography>
          <Select
            value={filter.value}
            size="small"
            onChange={(e) => updateParams(filter.key, e.target.value)}
            sx={{
              borderRadius: "10px",
              bgcolor: "#F8F9FA",
              fontWeight: 700,
              fontSize: "0.85rem",
            }}
          >
            {filter.options.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}

      <Divider />

      {/* <Box>
        <Typography
          variant="caption"
          fontWeight={800}
          mb={2}
          color="text.disabled"
          sx={{ display: "block" }}
        >
          BATTLE STATS
        </Typography>
        {STAT_FIELDS.map((s) => (
          <Box key={s.key} sx={{ mb: 1.5 }}>
            <Stack direction="row" justifyContent="space-between" mb={0.5}>
              <Typography variant="body2" fontWeight={700} fontSize="0.75rem">
                {s.label}
              </Typography>
              <Typography variant="caption" fontWeight={700} color="primary">
                {(stats as any)[s.key][0]} - {(stats as any)[s.key][1]}
              </Typography>
            </Stack>
            <Slider
              size="small"
              value={(stats as any)[s.key]}
              onChange={(_, v) =>
                setStats((p) => ({ ...p, [s.key]: v as number[] }))
              }
              min={0}
              max={255}
              sx={{ py: 1 }}
            />
          </Box>
        ))}
      </Box> */}

      {/* {isMobile && (
        <Button
          fullWidth
          variant="contained"
          sx={{ borderRadius: "12px", py: 1.5, fontWeight: 700 }}
        >
          Show Results
        </Button>
      )} */}
    </Stack>
  );
}
