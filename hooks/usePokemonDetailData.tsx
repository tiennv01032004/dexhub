import {
  useGetGenerationListQuery,
  useGetPokemonDetailQuery,
  useGetPokemonSpeciesDetailQuery,
  useGetVersionGroupQuery,
} from "@/store/services/pokeApi";
import { getSpeciesName } from "@/utils/heplers";

export const usePokemonDetailData = (name: string | undefined) => {
  const { data: pokemon, isLoading: isLoadingPokemon } =
    useGetPokemonDetailQuery(name);
  const { data: species, isLoading: isLoadingSpecies } =
    useGetPokemonSpeciesDetailQuery(getSpeciesName(name));

  const { data: version, isLoading: isLoadingVersion } =
    useGetVersionGroupQuery(undefined);

  const { data: generation, isLoading: isLoadingGeneration } =
    useGetGenerationListQuery(undefined);

  const isLoading =
    isLoadingPokemon ||
    isLoadingSpecies ||
    isLoadingVersion ||
    isLoadingGeneration;

  return {
    isLoading,
    data: {
      pokemon,
      species,
      version,
      generation,
    },
  };
};
