import {
  Chip,
  Paper,
  Stack,
  Typography,
  List,
  ListItem,
  Skeleton,
} from "@mui/material";
import PokemonHeader from "./PokemonHeader";
import {
  useGetPokemonDetailQuery,
  useGetPokemonSpeciesDetailQuery,
} from "@/store/services/pokeApi";
import { useParams } from "next/navigation";
import { Ability3, Type } from "@/types/PokemonDetail";
import { Genera } from "@/types/PokemonSpeciesDetail";
import { capitalizeName } from "@/utils/heplers";

export default function PokemonInfo() {
  const { name } = useParams();

  const {
    data: pokemon,
    hiddenAbility,
    normalAbility,
    isLoading: isLoadingPokemon,
  } = useGetPokemonDetailQuery(name as string, {
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      data,
      hiddenAbility: data?.abilities.filter((a: Ability3) => a.is_hidden),
      normalAbility: data?.abilities.filter((a: Ability3) => !a.is_hidden),
    }),
  });

  const { genus, isLoading: isLoadingSpecies } =
    useGetPokemonSpeciesDetailQuery(pokemon?.species?.name ?? "", {
      skip: !pokemon?.species?.name,
      selectFromResult: ({ data, isLoading }) => ({
        isLoading,
        genus: data?.genera.find((g: Genera) => g.language.name === "en")
          ?.genus,
      }),
    });

  const isLoading = isLoadingPokemon || isLoadingSpecies || !pokemon;

  const labelStyle = {
    width: "140px",
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
        <PokemonHeader title="Pokedex Data" />
        <List disablePadding>
          {[...Array(5)].map((_, index) => (
            <ListItem key={index} divider sx={{ py: 1.5 }}>
              <Skeleton
                variant="text"
                width={100}
                height={20}
                sx={{ mr: 4, transform: "none" }}
              />
              {index === 1 ? (
                <Stack direction="row" spacing={1}>
                  <Skeleton variant="rounded" width={55} height={24} />
                  <Skeleton variant="rounded" width={55} height={24} />
                </Stack>
              ) : (
                <Skeleton
                  variant="text"
                  width={80}
                  height={20}
                  sx={{ transform: "none" }}
                />
              )}
            </ListItem>
          ))}
          <ListItem sx={{ py: 1.5, alignItems: "flex-start" }}>
            <Skeleton
              variant="text"
              width={100}
              height={20}
              sx={{ mr: 4, transform: "none" }}
            />
            <Stack spacing={1} sx={{ flexGrow: 1 }}>
              <Skeleton
                variant="text"
                width="60%"
                height={20}
                sx={{ transform: "none" }}
              />
              <Skeleton
                variant="text"
                width="40%"
                height={16}
                sx={{ transform: "none" }}
              />
            </Stack>
          </ListItem>
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
      <PokemonHeader title="Pokedex Data" />

      <List disablePadding>
        <ListItem divider sx={{ py: 1.5 }}>
          <Typography sx={labelStyle}>National ID:</Typography>
          <Typography
            sx={{ ...valueStyle, fontWeight: 700, color: "primary.main" }}
          >
            #{pokemon.id}
          </Typography>
        </ListItem>

        <ListItem divider sx={{ py: 1.5 }}>
          <Typography sx={labelStyle}>Type:</Typography>
          <Stack direction="row" spacing={1}>
            {pokemon.types.map((t: Type) => (
              <Chip
                key={t.slot}
                label={t.type.name}
                size="small"
                sx={{
                  bgcolor: (theme) => theme.palette.pokemonType[t.type.name],
                  color: "white",
                  fontWeight: 700,
                  borderRadius: "4px",
                  textTransform: "uppercase",
                }}
              />
            ))}
          </Stack>
        </ListItem>

        <ListItem divider sx={{ py: 1.5 }}>
          <Typography sx={labelStyle}>Species:</Typography>
          <Typography sx={valueStyle}>{genus || "Unknown"}</Typography>
        </ListItem>

        <ListItem divider sx={{ py: 1.5 }}>
          <Typography sx={labelStyle}>Height:</Typography>
          <Typography sx={valueStyle}>{pokemon.height / 10} m</Typography>
        </ListItem>

        <ListItem divider sx={{ py: 1.5 }}>
          <Typography sx={labelStyle}>Weight:</Typography>
          <Typography sx={valueStyle}>{pokemon.weight / 10} kg</Typography>
        </ListItem>

        <ListItem sx={{ py: 1.5, alignItems: "flex-start" }}>
          <Typography sx={labelStyle}>Abilities:</Typography>
          <Stack spacing={0.5}>
            {normalAbility?.map((a: Ability3, index: number) => (
              <Typography
                sx={{ ...valueStyle, fontWeight: 600 }}
                key={a.ability.name}
              >
                {index + 1}. {capitalizeName(a.ability.name)}
              </Typography>
            ))}
            {hiddenAbility?.map((a: Ability3) => (
              <Typography
                key={a.ability.name}
                variant="caption"
                sx={{
                  color: "primary.main",
                  fontStyle: "italic",
                  display: "block",
                  fontWeight: 500,
                }}
              >
                {capitalizeName(a.ability.name)} (hidden ability)
              </Typography>
            ))}
          </Stack>
        </ListItem>
      </List>
    </Paper>
  );
}
