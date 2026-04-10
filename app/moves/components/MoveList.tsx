"use client";

import DataTable from "@/components/shared/DataTable";
import { MOVES } from "@/constants";
import { Stack, Typography, Box, Tooltip, useTheme } from "@mui/material";
import { Dex, Move } from "@pkmn/dex";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const ch = createColumnHelper<Move>();

export default function MoveList() {
  const searchParams = useSearchParams();
  const theme = useTheme();

  const columnFilters = useMemo(() => {
    const filters = [];
    const type = searchParams.get("type");
    const gen = searchParams.get("gen");
    const category = searchParams.get("category");

    if (type && type !== "all")
      filters.push({
        id: "type",
        value: type.charAt(0).toUpperCase() + type.slice(1),
      });
    if (gen && !isNaN(parseInt(gen)))
      filters.push({ id: "gen", value: parseInt(gen) });
    if (category && category !== "all")
      filters.push({
        id: "category",
        value: category.charAt(0).toUpperCase() + category.slice(1),
      });

    return filters;
  }, [searchParams]);

  const columns = useMemo(
    () => [
      ch.accessor("name", {
        header: "MOVE",
        cell: (info) => (
          <Stack spacing={0.5}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "0.85rem", sm: "0.95rem" },
                textTransform: "capitalize",
                whiteSpace: "nowrap",
              }}
            >
              <Link
                href={`/moves/${info
                  .getValue()
                  .toLowerCase()
                  .replace(/[,.\s]+/g, "-")}`}
              >
                {info.getValue()}
              </Link>
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "0.7rem",
                fontStyle: "italic",
                display: { xs: "none", sm: "block" },
              }}
            >
              {info.row.original.shortDesc}
            </Typography>
          </Stack>
        ),
      }),

      ch.accessor("type", {
        header: "TYPE",
        filterFn: "equals",
        cell: (info) => (
          <Box
            sx={{
              bgcolor: theme.palette.pokemonType[info.getValue().toLowerCase()],
              color: "#fff",
              textAlign: "center",
              borderRadius: "6px",
              py: 0.5,
              px: { xs: 1, sm: 1.5 },
              fontSize: "0.65rem",
              fontWeight: 900,
              display: "inline-block",
              minWidth: { xs: "65px", sm: "75px" },
            }}
          >
            {info.getValue().toUpperCase()}
          </Box>
        ),
      }),

      ch.accessor("category", {
        header: "CAT",
        cell: (info) => (
          <Box sx={{ display: "flex", justifyContent: "start" }}>
            <Tooltip title={info.getValue()} arrow>
              <Box
                component="img"
                src={`https://img.pokemondb.net/images/icons/move-${info.getValue().toLowerCase()}.png`}
                sx={{ width: 24, height: 24 }}
              />
            </Tooltip>
          </Box>
        ),
      }),

      ch.accessor("basePower", {
        header: "POW",
        cell: (info) => (
          <Typography sx={{ fontWeight: 800, fontSize: "0.85rem" }}>
            {info.getValue() <= 1 ? "--" : info.getValue()}
          </Typography>
        ),
      }),

      ch.accessor("accuracy", {
        header: "ACC",
        cell: (info) => (
          <Typography sx={{ fontWeight: 800, fontSize: "0.85rem" }}>
            {info.getValue() === true ? "--" : info.getValue()}
          </Typography>
        ),
      }),

      ch.accessor("pp", {
        header: "PP",
        cell: (info) => (
          <Typography sx={{ fontWeight: 800, fontSize: "0.85rem" }}>
            {info.getValue()}
          </Typography>
        ),
      }),

      ch.accessor("gen", { id: "gen", filterFn: "equals" }),
    ],
    [theme],
  );

  return (
    <DataTable
      data={MOVES}
      columns={columns}
      columnFilters={columnFilters}
      resetTrigger={searchParams.toString()}
    />
  );
}
