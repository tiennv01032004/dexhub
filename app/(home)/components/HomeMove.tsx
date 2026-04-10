import {
  Box,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import PreviewSection from "./PreviewSection";
import { createColumnHelper } from "@tanstack/react-table";
import { Move } from "@pkmn/dex";
import { useMemo } from "react";
import Link from "next/link";
import DataTable from "@/components/shared/DataTable";
import { MOVES } from "@/constants";
import { useRouter } from "next/navigation";

const ch = createColumnHelper<Move>();

export default function HomeMove() {
  const theme = useTheme();
  const router = useRouter();

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
    <Paper elevation={0} sx={{ mt: 10, p: 3 }}>
      <PreviewSection
        title="Moves"
        subtitle="Detailed database of attack power, accuracy, and tactical effects for every move."
        icon="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png"
        onViewAll={() => router.push("/moves")}
      >
        <DataTable
          data={MOVES.slice(0, 10)}
          columns={columns}
          showPagination={false}
        />
      </PreviewSection>
    </Paper>
  );
}
