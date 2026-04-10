import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { GEN, MOVe_CATEGORY, TYPES } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function MoveFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (key: string, value: string | null) => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (
        !value ||
        ["All Categories", "All Types", "All Generations"].includes(value)
      ) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }

      router.push(`?${newParams.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const resetFilters = () => {
    router.push("/moves");
  };

  return (
    <Paper sx={sidebarStyle}>
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
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

        <Divider />
        <TextField
          fullWidth
          size="small"
          placeholder="Search move..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />

        {[
          {
            label: "TYPE",
            key: "type",
            value: searchParams.get("type") || "All Types",
            options: TYPES,
          },
          {
            label: "CATEGORY",
            key: "category",
            value: searchParams.get("category") || "All Categories",
            options: MOVe_CATEGORY,
          },
          {
            label: "GENERATION",
            key: "gen",
            value: searchParams.get("gen") || "All Generations",
            options: GEN,
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
              onChange={(e) => updateParams(filter.key, e.target.value)}
              size="small"
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
      </Stack>
    </Paper>
  );
}

const sidebarStyle = {
  p: 3,
  borderRadius: "16px",
  position: "sticky",
  top: 115,
  boxShadow: "none",
  border: "1px solid #E5E7EB",
};
