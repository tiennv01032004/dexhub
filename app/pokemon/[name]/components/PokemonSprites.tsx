"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  ImageList,
  ImageListItem,
  Typography,
  Divider,
  MenuItem,
  FormControl,
  Select,
  useMediaQuery,
  useTheme,
  alpha,
  Skeleton,
  Stack,
} from "@mui/material";
import {
  KeyboardArrowDown,
  AutoAwesome,
  PhotoLibrary,
} from "@mui/icons-material";
import { useParams } from "next/navigation";
import { useGetPokemonDetailQuery } from "@/store/services/pokeApi";
import PokemonHeader from "./PokemonHeader";

interface SpriteItem {
  img: string;
  label: string;
  rawKey: string;
}

export default function PokemonSprites() {
  const [tabValue, setTabValue] = useState(0);
  const { name } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: pokemon, isLoading } = useGetPokemonDetailQuery(name as string);

  const crawlAllSprites = (obj: any, path = ""): SpriteItem[] => {
    let result: SpriteItem[] = [];
    if (!obj) return result;
    for (const key in obj) {
      const value = obj[key];
      const currentPath = path ? `${path} ${key}` : key;
      if (typeof value === "string" && value.startsWith("http")) {
        result.push({
          img: value,
          rawKey: currentPath,
          label: currentPath
            .replace(/versions|other|generation|animated/g, "")
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .trim(),
        });
      } else if (typeof value === "object" && value !== null) {
        result = result.concat(crawlAllSprites(value, currentPath));
      }
    }
    return result;
  };

  const groupedSprites = useMemo(() => {
    if (!pokemon?.sprites) return {};
    const all = crawlAllSprites(pokemon.sprites);
    const groups: Record<
      string,
      { normal: SpriteItem[]; shiny: SpriteItem[] }
    > = {
      "Modern Assets": { normal: [], shiny: [] },
    };

    all.forEach((sprite) => {
      const isShiny = sprite.rawKey.toLowerCase().includes("shiny");
      const genMatch = sprite.rawKey.match(/generation-([ivx]+)/i);
      const genName = genMatch
        ? `Gen ${genMatch[1].toUpperCase()}`
        : "Modern Assets";

      if (!groups[genName]) groups[genName] = { normal: [], shiny: [] };
      if (isShiny) groups[genName].shiny.push(sprite);
      else groups[genName].normal.push(sprite);
    });

    return Object.fromEntries(
      Object.entries(groups).filter(
        ([_, val]) => val.normal.length > 0 || val.shiny.length > 0,
      ),
    );
  }, [pokemon]);

  const tabLabels = useMemo(
    () => Object.keys(groupedSprites),
    [groupedSprites],
  );

  const renderSection = (title: string, data: SpriteItem[], isShiny: boolean) =>
    data.length > 0 && (
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mb: 2.5, px: 1 }}
        >
          {isShiny ? (
            <AutoAwesome sx={{ color: "#f57c00", fontSize: 18 }} />
          ) : (
            <PhotoLibrary sx={{ color: "text.secondary", fontSize: 18 }} />
          )}
          <Typography
            variant="overline"
            sx={{
              fontWeight: 900,
              color: isShiny ? "#f57c00" : "text.secondary",
              letterSpacing: 1.2,
              fontSize: "0.75rem",
            }}
          >
            {title} ({data.length})
          </Typography>
        </Stack>

        <ImageList
          cols={isMobile ? 2 : 4}
          gap={16}
          sx={{ m: 0, overflow: "visible" }}
        >
          {data.map((item, index) => (
            <ImageListItem
              key={`${item.rawKey}-${index}`}
              sx={{
                bgcolor: alpha(isShiny ? "#fff3e0" : "#f8f9fa", 0.4),
                borderRadius: "24px",
                border: "1px solid",
                borderColor: alpha(isShiny ? "#f57c00" : "#000", 0.05),
                transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "scale(1.02)",
                  bgcolor: "#fff",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  borderColor: isShiny ? "#f57c00" : "primary.main",
                  zIndex: 2,
                },
              }}
            >
              <Box
                sx={{
                  height: isMobile ? 120 : 160,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                }}
              >
                <Box
                  component="img"
                  src={item.img}
                  alt={item.label}
                  loading="lazy"
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                    imageRendering: item.rawKey.includes("versions")
                      ? "pixelated"
                      : "auto",
                    filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.05))",
                  }}
                />
              </Box>
              <Box
                sx={{
                  p: 1.5,
                  textAlign: "center",
                  borderTop: "1px solid rgba(0,0,0,0.03)",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "text.secondary",
                    textTransform: "capitalize",
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.label.replace("shiny", "").trim() || "Default"}
                </Typography>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    );

  return (
    <Paper elevation={0}>
      <PokemonHeader title="Sprites Gallery" />

      <Box sx={{ borderBottom: "1px solid #eee", bgcolor: "#fff", px: 2 }}>
        {isLoading ? (
          <Stack direction="row" spacing={2} py={2}>
            <Skeleton
              variant="rounded"
              width={80}
              height={32}
              sx={{ borderRadius: "8px" }}
            />
            <Skeleton
              variant="rounded"
              width={80}
              height={32}
              sx={{ borderRadius: "8px" }}
            />
          </Stack>
        ) : isMobile ? (
          <Box py={2}>
            <FormControl fullWidth size="small">
              <Select
                value={tabValue}
                onChange={(e) => setTabValue(e.target.value as number)}
                IconComponent={KeyboardArrowDown}
                sx={{
                  borderRadius: "12px",
                  fontWeight: 800,
                  bgcolor: "#f8f9fa",
                }}
              >
                {tabLabels.map((label, index) => (
                  <MenuItem key={label} value={index} sx={{ fontWeight: 700 }}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Tabs
            value={tabValue}
            onChange={(_, v) => setTabValue(v)}
            variant="scrollable"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 800,
                fontSize: "0.75rem",
                minHeight: 60,
              },
              "& .MuiTabs-indicator": { height: 3, borderRadius: "3px" },
            }}
          >
            {tabLabels.map((label) => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
        )}
      </Box>

      <Box sx={{ p: isMobile ? 2 : 3, minHeight: 400, bgcolor: "#fcfcfc" }}>
        {isLoading ? (
          <ImageList cols={isMobile ? 2 : 4} gap={16}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={180}
                sx={{ borderRadius: "24px" }}
              />
            ))}
          </ImageList>
        ) : tabLabels.length > 0 ? (
          <>
            {renderSection(
              "Standard Forms",
              groupedSprites[tabLabels[tabValue]].normal,
              false,
            )}
            {groupedSprites[tabLabels[tabValue]].shiny.length > 0 && (
              <Divider sx={{ my: 4, borderStyle: "dashed" }} />
            )}
            {renderSection(
              "Shiny Variants",
              groupedSprites[tabLabels[tabValue]].shiny,
              true,
            )}
          </>
        ) : (
          <Typography
            variant="body2"
            color="text.disabled"
            align="center"
            py={10}
          >
            No sprites found for this generation.
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
