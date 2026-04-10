"use client";
import React, { useEffect, useMemo, useRef } from "react";
import {
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import { useGetItemCategoryListQuery } from "@/store/services/pokeApi";
import { Result } from "@/types/Generation";
import { capitalizeName } from "@/utils/heplers";
import { useRouter, useSearchParams } from "next/navigation";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function ItemFilter() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParams = searchParams.get("category") || "all-category";
  const activeItemRef = useRef<HTMLDivElement>(null);

  const { data: itemCategories } = useGetItemCategoryListQuery(undefined);

  const categories = useMemo(() => {
    return [{ name: "all-category" }, ...(itemCategories?.results || [])];
  }, [itemCategories]);

  const handleSelected = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "all-category") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    router.push(`/items?${params.toString()}`);
  };

  useEffect(() => {
    if (!isMobile && activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [categoryParams, isMobile, itemCategories]);

  if (isMobile) {
    return (
      <Box sx={{ mb: 3, px: 1 }}>
        <FormControl fullWidth size="small">
          <InputLabel
            id="category-select-label"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <FilterListIcon fontSize="small" /> Category
          </InputLabel>
          <Select
            labelId="category-select-label"
            value={categoryParams}
            label="Category"
            onChange={(e) => handleSelected(e.target.value)}
            sx={{
              borderRadius: "12px",
              bgcolor: "white",
              fontWeight: 600,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#eceff1",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 350, borderRadius: "12px" },
              },
            }}
          >
            {categories.map((item: Result) => (
              <MenuItem key={item.name} value={item.name.toLowerCase()}>
                {capitalizeName(item.name)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "20px",
        border: "1px solid #eceff1",
        position: "sticky",
        top: 100,
        bgcolor: "white",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={800}>
          Filters
        </Typography>
        <Tooltip title="Reset Filters">
          <IconButton onClick={() => router.push("/items")} size="small">
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <List sx={{ p: 0, maxHeight: "60vh", overflow: "auto" }}>
        {categories.map((item: Result) => {
          const isSelected = item.name.toLowerCase() === categoryParams;

          return (
            <ListItem
              component="div"
              key={item.name}
              disablePadding
              sx={{ mb: 0.5 }}
              ref={isSelected ? activeItemRef : null}
            >
              <ListItemButton
                selected={isSelected}
                onClick={() => handleSelected(item.name)}
                sx={{
                  borderRadius: "10px",
                  "&.Mui-selected": {
                    bgcolor: "#ed1c2410",
                    color: "#ed1c24",
                    "& .MuiTypography-root": { fontWeight: 700 },
                    "&:hover": { bgcolor: "#ed1c2420" },
                  },
                }}
              >
                <ListItemText
                  primary={capitalizeName(item.name)}
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
