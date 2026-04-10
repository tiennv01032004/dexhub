"use client";

import React, { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { SearchTwoTone } from "@mui/icons-material";
import {
  alpha,
  Box,
  InputAdornment,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  useGetPokemonListQuery,
  useGetItemListQuery,
  useGetMoveListQuery,
  useGetAbilityListQuery,
  useGetNatureListQuery,
} from "@/store/services/pokeApi";
import { Result } from "@/types/Generation";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PokemonSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const { data: pokemon } = useGetPokemonListQuery(undefined);
  const { data: item } = useGetItemListQuery(undefined);
  const { data: move } = useGetMoveListQuery(undefined);
  const { data: ability } = useGetAbilityListQuery(undefined);
  const { data: nature } = useGetNatureListQuery(undefined);

  const searchData = useMemo(() => {
    return [
      ...(pokemon?.results?.map((p: Result) => ({
        name: p.name,
        type: "pokemon",
      })) || []),
      ...(item?.results?.map((i: Result) => ({
        name: i.name,
        type: "items",
      })) || []),
      ...(move?.results?.map((m: Result) => ({
        name: m.name,
        type: "moves",
      })) || []),
      ...(ability?.results?.map((a: Result) => ({
        name: a.name,
        type: "abilities",
      })) || []),
      ...(nature?.results?.map((n: Result) => ({
        name: n.name,
        type: "natures",
      })) || []),
    ];
  }, [pokemon, item, move, nature, ability]);

  const fuse = useMemo(() => {
    return new Fuse(searchData, {
      keys: ["name"],
      threshold: 0.3,
      ignoreLocation: true,
      includeScore: true,
    });
  }, [searchData]);

  const groupedResults = useMemo(() => {
    if (query.length < 2) return {};
    const results = fuse.search(query);
    const groups: Record<string, any[]> = {};

    results.forEach(({ item }) => {
      if (!groups[item.type]) groups[item.type] = [];
      if (groups[item.type].length < 10) groups[item.type].push(item);
    });
    return groups;
  }, [query, fuse]);

  const hasResults = Object.keys(groupedResults).length > 0;

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 500, position: "relative", mx: "auto" }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search Pokémon, items..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 0)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            bgcolor: alpha("#000", 0.04),
            transition: "0.3s",
            "& fieldset": { borderColor: "transparent" },
            "&:hover fieldset": { borderColor: alpha("#ed1c24", 0.2) },
            "&.Mui-focused fieldset": { borderColor: "#ed1c24" },
            "&.Mui-focused": {
              bgcolor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoTone sx={{ color: "text.secondary", fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
      />

      {isFocused && query.length >= 2 && (
        <Paper
          elevation={8}
          sx={{
            position: "absolute",
            top: "110%",
            left: 0,
            right: 0,
            zIndex: 10,
            borderRadius: "12px",
            maxHeight: 400,
            overflow: "auto",
            p: 1,
          }}
        >
          {!hasResults ? (
            <Box p={3} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                No results found for "{query}"
              </Typography>
            </Box>
          ) : (
            Object.entries(groupedResults).map(([type, items]) => (
              <Box key={type} mb={1}>
                <Typography
                  variant="caption"
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    display: "block",
                    fontWeight: "bold",
                    color: "#ed1c24",
                    textTransform: "uppercase",
                    bgcolor: alpha("#ed1c24", 0.05),
                    borderRadius: "4px",
                  }}
                >
                  {type}
                </Typography>
                <List dense>
                  {items.map((item, index) => (
                    <ListItem
                      component="div"
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                      onClick={() => {
                        router.push(`/${item.type}/${item.name.toLowerCase()}`);
                        setQuery("");
                        setIsFocused(false);
                      }}
                      key={index}
                      sx={{
                        cursor: "pointer",
                        borderRadius: "8px",
                        "&:hover": { bgcolor: alpha("#ed1c24", 0.04) },
                      }}
                    >
                      <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{
                          sx: {
                            textTransform: "capitalize",
                            fontSize: "0.9rem",
                          },
                        }}
                      />
                      <Typography variant="caption" color="text.disabled">
                        ↵
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))
          )}
        </Paper>
      )}
    </Box>
  );
}
