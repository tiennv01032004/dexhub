"use client";

import React, { useMemo } from "react";
import { Box, Typography, Paper, Chip, Stack, Skeleton } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useParams } from "next/navigation";
import { useGetPokemonEncountersQuery } from "@/store/services/pokeApi";
import { Encounter, VersionDetail } from "@/types/Encounter";
import PokemonHeader from "./PokemonHeader";
import { capitalizeName } from "@/utils/heplers";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "@/components/shared/DataTable";

const ch = createColumnHelper<any>();

export default function PokemonLocation() {
  const { name } = useParams();

  const { data: encounters, isLoading } = useGetPokemonEncountersQuery(
    name as string,
    { skip: !name },
  );

  const flatEncounters = useMemo(() => {
    if (!encounters || encounters.length === 0) return [];
    const list: any[] = [];
    encounters.forEach((item: Encounter) => {
      item.version_details.forEach((details: VersionDetail) => {
        const detail = details.encounter_details[0];
        list.push({
          location: item.location_area.name,
          version: details.version.name,
          method: detail.method.name,
          chance: detail.chance,
          level: {
            max: detail.max_level,
            min: detail.min_level,
          },
        });
      });
    });
    return list.sort((a, b) => a.version.localeCompare(b.version));
  }, [encounters]);

  const columns = useMemo(
    () => [
      ch.accessor("version", {
        header: "VERSION",
        cell: (info) => (
          <Chip
            label={info.getValue().toUpperCase()}
            size="small"
            variant="outlined"
            color="primary"
            sx={{
              fontWeight: 800,
              borderRadius: "4px",
              fontSize: "0.65rem",
              height: "20px",
            }}
          />
        ),
      }),
      ch.accessor("location", {
        header: "LOCATION AREA",
        cell: (info) => (
          <Stack direction="row" spacing={1} alignItems="center">
            <MapIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, textTransform: "capitalize" }}
            >
              {capitalizeName(info.getValue())}
            </Typography>
          </Stack>
        ),
      }),
      ch.accessor("method", {
        header: "METHOD",
        cell: (info) => (
          <Typography
            variant="caption"
            sx={{
              bgcolor: "#f5f5f5",
              px: 1,
              py: 0.4,
              borderRadius: "4px",
              border: "1px solid #e0e0e0",
            }}
          >
            {info.getValue()}
          </Typography>
        ),
      }),
      ch.accessor("level", {
        header: "LEVEL",
        cell: (info) => (
          <Typography variant="body2">
            {info.getValue().min === info.getValue().max
              ? info.getValue().min
              : `${info.getValue().min}-${info.getValue().max}`}
          </Typography>
        ),
      }),
      ch.accessor("chance", {
        header: "CHANCE",
        cell: (info) => (
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "success.main" }}
          >
            {info.getValue()}%
          </Typography>
        ),
      }),
    ],
    [],
  );

  if (isLoading) {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          border: "1px solid #eee",
          overflow: "hidden",
        }}
      >
        <PokemonHeader title="Where to find" />
        <Box sx={{ p: 2 }}>
          {[1, 2, 3, 4, 5].map((row) => (
            <Stack
              key={row}
              direction="row"
              spacing={2}
              sx={{ py: 1.5, borderBottom: "1px solid #eee" }}
              alignItems="center"
            >
              <Skeleton variant="rounded" width="20%" height={20} />
              <Skeleton variant="text" width="20%" height={20} />
              <Skeleton variant="rounded" width="20%" height={20} />
              <Skeleton variant="text" width="20%" height={20} />
              <Skeleton variant="text" width="20%" height={20} />
            </Stack>
          ))}
        </Box>
      </Paper>
    );
  }

  if (flatEncounters.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
        }}
      >
        <PokemonHeader title="Where to find" />
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              py: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              bgcolor: "#fafafa",
              borderRadius: "12px",
              border: "1px dashed #ccc",
            }}
          >
            <SearchOffIcon
              sx={{ fontSize: 48, color: "text.disabled", mb: 1 }}
            />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "text.secondary" }}
            >
              No Wild Locations Found
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: "380px", mt: 0.5, px: 2, lineHeight: 1.6 }}
            >
              This Pokémon cannot be caught in the wild. It may be a starter, a
              gift, requires evolution, or is available only via event.
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "600px",
      }}
    >
      <PokemonHeader title="Where to find" />
      <Box sx={{ flex: 1, overflow: "auto", width: "100%" }}>
        <DataTable
          data={flatEncounters}
          showPagination={false}
          columns={columns}
        />
      </Box>
    </Paper>
  );
}
