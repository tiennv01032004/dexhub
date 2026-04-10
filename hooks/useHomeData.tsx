import {
  useGetPokemonSpeciesListQuery,
  useGetMoveListQuery,
  useGetGenerationListQuery,
  useGetTypeListQuery,
  useGetItemCategoryListQuery,
  useGetMoveCategoryListQuery,
  useGetAbilityListQuery,
  useGetStatusEffectListQuery,
  useGetNatureListQuery,
} from "@/store/services/pokeApi";

export const useHomeData = () => {
  const { data: pokemonData, isLoading: isLoadingPokemon } =
    useGetPokemonSpeciesListQuery(undefined);

  const { data: moveData, isLoading: isLoadingMove } =
    useGetMoveListQuery(undefined);

  const { data: generationData, isLoading: isLoadingGeneration } =
    useGetGenerationListQuery(undefined);

  const { data: typeData, isLoading: isLoadingType } =
    useGetTypeListQuery(undefined);

  const { data: itemCategoriesData, isLoading: isLoadingItemCategories } =
    useGetItemCategoryListQuery(undefined);

  const { data: moveCategoriesData, isLoading: isLoadingMoveCategories } =
    useGetMoveCategoryListQuery(undefined);

  const { data: abilityData, isLoading: isLoadingAbility } =
    useGetAbilityListQuery(undefined);

  const { data: statusData, isLoading: isLoadingStatus } =
    useGetStatusEffectListQuery(undefined);

  const { data: natureData, isLoading: isLoadingNature } =
    useGetNatureListQuery(undefined);

  const isLoading =
    isLoadingPokemon ||
    isLoadingMove ||
    isLoadingGeneration ||
    isLoadingType ||
    isLoadingItemCategories ||
    isLoadingMoveCategories ||
    isLoadingAbility ||
    isLoadingNature ||
    isLoadingStatus;

  return {
    stats: {
      pokemon: pokemonData?.count || 0,
      move: moveData?.count || 0,
      generation: generationData?.count || 0,
      type: typeData?.count || 0,
      itemCategories: itemCategoriesData?.count || 0,
      moveCategoriesData: moveCategoriesData?.count || 0,
      abilityData: abilityData?.count || 0,
      statusData: statusData?.count || 0,
      natureData: natureData?.count || 0,
    },
    raw: {
      pokemon: pokemonData?.results,
      itemCategories: itemCategoriesData?.results,
      moveCategories: moveCategoriesData?.results,
      ability: abilityData?.results,
      nature: natureData?.results,
      status: statusData?.results,
    },
    isLoading,
  };
};
