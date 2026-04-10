import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import PokemonHeader from "./PokemonHeader";
import { useParams } from "next/navigation";
import {
  useGetGenerationDetailQuery,
  useGetGenerationListQuery,
  useGetPokemonDetailQuery,
} from "@/store/services/pokeApi";
import {
  capitalizeName,
  extractIdFromUrl,
  toShowdownId,
} from "@/utils/heplers";
import { Mfe, VersionGroupDetail } from "@/types/PokemonDetail";
import Masonry from "@mui/lab/Masonry";
import { Result } from "@/types/Generation";
import DataTable from "@/components/shared/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Dex, Move } from "@pkmn/dex";
import PreviewSection from "@/app/(home)/components/PreviewSection";
import { MOVE_LEARN_METHOD_CONFIG } from "@/constants";
import { VersionGroup } from "@/types/GenerationDetail";
import Link from "next/link";

const ch = createColumnHelper<Move>();

export default function PokemonMoveVersion() {
  const { name } = useParams();

  const { data: generation } = useGetGenerationListQuery(undefined);

  const [gen, setGen] = useState("");
  const [version, setVersion] = useState("");

  const theme = useTheme();

  useEffect(() => {
    if (generation?.results?.length && !gen) {
      setTimeout(() => {
        setGen(extractIdFromUrl(generation.results[0].url));
      }, 0);
    }
  }, [generation, gen]);

  const { data: list } = useGetGenerationDetailQuery(gen, { skip: !gen });

  useEffect(() => {
    if (list?.version_groups?.length) {
      setTimeout(() => {
        setVersion(list.version_groups[0].name);
      }, 0);
    }
  }, [list]);

  const { moves } = useGetPokemonDetailQuery(name, {
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      data,
      moves: (() => {
        const hmList = [
          "cut",
          "fly",
          "surf",
          "strength",
          "flash",
          "rock-smash",
          "waterfall",
          "dive",
        ];

        const filtered =
          data?.moves.flatMap((m: Mfe) => {
            const matchingDetails = m.version_group_details.filter(
              (v: VersionGroupDetail) => v.version_group.name === version,
            );

            return matchingDetails.map((detail) => ({
              ...m.move,
              ...detail,
            }));
          }) || [];

        if (filtered.length === 0) return [];

        return {
          level_up: [
            ...new Set(
              filtered
                .filter(
                  (m: VersionGroupDetail) =>
                    m.move_learn_method.name === "level-up",
                )
                .map((m: VersionGroup) => Dex.moves.get(m.name)),
            ),
          ],

          tm: filtered
            .filter(
              (m: any) =>
                m.move_learn_method.name === "machine" &&
                !hmList.includes(m.name),
            )
            .map((m: VersionGroup) => Dex.moves.get(m.name)),
          hm: filtered
            .filter(
              (m: any) =>
                m.move_learn_method.name === "machine" &&
                hmList.includes(m.name),
            )
            .map((m: VersionGroup) => Dex.moves.get(m.name)),

          tutor: filtered
            .filter(
              (m: VersionGroupDetail) => m.move_learn_method.name === "tutor",
            )
            .map((m: VersionGroup) => Dex.moves.get(m.name)),
          egg: filtered
            .filter(
              (m: VersionGroupDetail) => m.move_learn_method.name === "egg",
            )
            .map((m: VersionGroup) => Dex.moves.get(m.name)),
        };
      })(),
    }),
  });

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
          </Stack>
        ),
      }),

      ch.accessor("type", {
        header: "TYPE",
        filterFn: "equals",
        cell: (info) => {
          return (
            <Box
              sx={{
                bgcolor:
                  theme.palette.pokemonType[info.getValue().toLowerCase()],
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
          );
        },
      }),

      ch.accessor("category", {
        header: "CAT",
        cell: (info) => (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
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
          <Typography
            sx={{ fontWeight: 800, textAlign: "center", fontSize: "0.85rem" }}
          >
            {info.getValue() <= 1 ? "--" : info.getValue()}
          </Typography>
        ),
      }),

      ch.accessor("accuracy", {
        header: "ACC",
        cell: (info) => (
          <Typography
            sx={{ fontWeight: 800, textAlign: "center", fontSize: "0.85rem" }}
          >
            {info.getValue() === true ? "--" : info.getValue()}
          </Typography>
        ),
      }),
    ],
    [theme],
  );

  console.log(moves);

  return (
    <Paper elevation={0}>
      <PokemonHeader title="Pokémon Moves by Game Version" />

      <Box>
        <Stack direction="row" spacing={2} sx={{ p: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel sx={{ fontWeight: 600 }}>Generation</InputLabel>
            <Select
              label="Generation"
              value={gen}
              onChange={(e) => {
                setGen(e.target.value);
                setVersion("");
              }}
              input={<OutlinedInput label="Generation" />}
              sx={{ borderRadius: "8px", bgcolor: "white", fontWeight: 700 }}
            >
              {generation?.results?.map((g: Result, index: number) => (
                <MenuItem value={extractIdFromUrl(g.url)} key={g.name}>
                  Generation {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel sx={{ fontWeight: 600 }}>Version Group</InputLabel>
            <Select
              label="Version Group"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              input={<OutlinedInput label="Version Group" />}
              sx={{ borderRadius: "8px", bgcolor: "white", fontWeight: 700 }}
            >
              {list?.version_groups?.map((v: Result) => (
                <MenuItem value={v.name} key={v.name}>
                  {v.name.replace(/-/g, " ")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {Object.values(moves).length > 0 ? (
          <Masonry
            columns={{ xs: 1, md: 2 }}
            spacing={2}
            sx={{ m: 0, width: "100%", p: 1 }}
          >
            {Array.from({ length: Object.entries(moves).length }).map(
              (_, index) =>
                Object.values(moves)[index].length > 0 && (
                  <PreviewSection
                    key={index}
                    title={Object.values(MOVE_LEARN_METHOD_CONFIG)[index].title}
                    subtitle={Object.values(MOVE_LEARN_METHOD_CONFIG)[
                      index
                    ].subtitle(capitalizeName(name as string), version)}
                  >
                    <DataTable
                      data={Object.values(moves)[index]}
                      columns={columns}
                      showPagination={false}
                    />
                  </PreviewSection>
                ),
            )}
          </Masonry>
        ) : !version ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 10,
              gap: 2,
              height: "300px",
            }}
          >
            <CircularProgress size={40} thickness={4} />
            <Typography variant="body2" color="text.secondary">
              Updating move sets...
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              p: 6,
              mx: "auto",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 800, color: "text.primary", mb: 1 }}
            >
              No Unique Moves Found
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.6 }}
            >
              This Pokémon cannot learn any specific moves in{" "}
              <strong>{version.replace(/-/g, " ")}</strong>, or its move set is{" "}
              <strong>identical to the base form</strong> (
              <span style={{ color: "primary.main", fontWeight: 600 }}>
                {Dex.species.get(toShowdownId(name as string)).baseSpecies}
              </span>
              ).
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
