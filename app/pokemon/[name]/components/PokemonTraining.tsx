import {
  Box,
  Paper,
  List,
  ListItem,
  Typography,
  Skeleton,
} from "@mui/material";
import PokemonHeader from "./PokemonHeader";
import { useParams } from "next/navigation";
import {
  useGetPokemonDetailQuery,
  useGetPokemonSpeciesDetailQuery,
} from "@/store/services/pokeApi";
import { Stat3 } from "@/types/PokemonDetail";
import { capitalizeName } from "@/utils/heplers";

export default function PokemonTraining() {
  const { name } = useParams();

  const {
    data: pokemon,
    isLoading: isLoadingPokemon,
    ev_yield,
  } = useGetPokemonDetailQuery(name as string, {
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      data,
      ev_yield: data?.stats
        .filter((s: Stat3) => s.effort > 0)
        .map((s: Stat3) => `${s.effort} ${capitalizeName(s.stat.name)}`)
        .join(", "),
    }),
  });

  const { data: species, isLoading: isLoadingSpecies } =
    useGetPokemonSpeciesDetailQuery(pokemon?.species?.name ?? "", {
      skip: !pokemon?.species?.name,
    });

  const isLoading =
    isLoadingPokemon || isLoadingSpecies || !pokemon || !species;

  const labelStyle = {
    width: "160px",
    color: "#4a4a4a",
    fontWeight: 500,
    flexShrink: 0,
    fontSize: "0.875rem",
  };

  const valueStyle = {
    fontSize: "0.875rem",
    color: "#000",
  };

  if (isLoading) {
    return (
      <Paper
        elevation={0}
        sx={{
          height: "100%",
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          bgcolor: "#fff",
        }}
      >
        <PokemonHeader title="Training" />
        <List disablePadding>
          {[120, 40, 40, 40, 100].map((width, index) => (
            <ListItem
              key={index}
              divider={index !== 4}
              sx={{ py: 2, alignItems: "flex-start" }}
            >
              <Skeleton
                variant="text"
                width={100}
                height={20}
                sx={{ mr: 4, transform: "none" }}
              />
              <Skeleton
                variant="text"
                width={width}
                height={20}
                sx={{ transform: "none" }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
      }}
    >
      <PokemonHeader title="Training" />

      <List disablePadding>
        <ListItem divider sx={{ py: 1.5, alignItems: "flex-start" }}>
          <Typography sx={labelStyle}>EV yield:</Typography>
          <Typography sx={{ ...valueStyle, fontWeight: 600 }}>
            {ev_yield || "No EV yield data"}
          </Typography>
        </ListItem>

        <ListItem divider sx={{ py: 1.5, alignItems: "flex-start" }}>
          <Typography sx={labelStyle}>Catch rate:</Typography>
          <Typography sx={valueStyle}>{species.capture_rate || 0}</Typography>
        </ListItem>

        <ListItem divider sx={{ py: 1.5, alignItems: "flex-start" }}>
          <Typography sx={labelStyle}>Base Friendship:</Typography>
          <Typography sx={valueStyle}>
            {species.base_happiness ?? "N/A"}
          </Typography>
        </ListItem>

        <ListItem divider sx={{ py: 1.5, alignItems: "flex-start" }}>
          <Typography sx={labelStyle}>Base Exp.:</Typography>
          <Typography sx={valueStyle}>
            {pokemon.base_experience || 0}
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1.5, alignItems: "flex-start" }}>
          <Typography sx={labelStyle}>Growth Rate:</Typography>
          <Typography
            sx={{
              ...valueStyle,
              color: "primary.main",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {species.growth_rate?.name?.replace(/-/g, " ") || "Unknown"}
          </Typography>
        </ListItem>
      </List>
    </Paper>
  );
}
