import { POKEAPI_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokeApi = createApi({
  reducerPath: "pokeApi",
  baseQuery: fetchBaseQuery({ baseUrl: POKEAPI_URL }),
  endpoints: (builder) => ({
    // --- LIST ENDPOINTS ---
    getPokemonSpeciesList: builder.query({
      query: () => "pokemon-species",
    }),

    getPokemonList: builder.query({
      query: () => "pokemon?limit=3000",
    }),

    getMoveList: builder.query({
      query: () => "move?limit=3000",
    }),

    getItemList: builder.query({
      query: () => "item?limit=3000",
    }),

    getMoveCategoryList: builder.query({
      query: () => "move-category",
    }),

    getGenerationList: builder.query({
      query: () => "generation",
    }),

    getTypeList: builder.query({
      query: () => "type",
    }),

    getItemCategoryList: builder.query({
      query: () => "item-category?limit=100",
    }),

    getAbilityList: builder.query({
      query: () => "ability?limit=3000",
    }),
    getNatureList: builder.query({
      query: () => "nature?limit=3000",
    }),
    getStatusEffectList: builder.query({
      query: () => "move-ailment?offset=2",
    }),

    getVersionGroup: builder.query({
      query: () => "version-group?limit=100",
    }),

    getRegionList: builder.query({
      query: () => "region?limit=100",
    }),

    // --- DETAIL ENDPOINTS ---
    getPokemonSpeciesDetail: builder.query({
      query: (id) => `pokemon-species/${id}`,
    }),

    getPokemonDetail: builder.query({
      query: (id) => `pokemon/${id}`,
    }),

    getGenerationDetail: builder.query({
      query: (id) => `generation/${id}`,
    }),

    getItemCategoryDetail: builder.query({
      query: (id) => `item-category/${id}`,
    }),

    getMoveDetail: builder.query({
      query: (id) => `move/${id}`,
    }),

    getAbilityDetail: builder.query({
      query: (id) => `ability/${id}`,
    }),

    getNatureDetail: builder.query({
      query: (id) => `nature/${id}`,
    }),

    getMoveCategoryDetail: builder.query({
      query: (id) => `move-category/${id}`,
    }),

    getTypeDetail: builder.query({
      query: (id) => `type/${id}`,
    }),

    getEvolutionChainDetail: builder.query({
      query: (id) => `evolution-chain/${id}`,
    }),

    getPokemonEncounters: builder.query({
      query: (id) => `pokemon/${id}/encounters`,
    }),

    getItemDetail: builder.query({
      query: (id) => `/item/${id}`,
    }),
  }),
});

export const {
  useGetPokemonSpeciesListQuery,
  useGetMoveListQuery,
  useGetGenerationListQuery,
  useGetTypeListQuery,
  useGetPokemonSpeciesDetailQuery,
  useGetGenerationDetailQuery,
  useGetItemCategoryListQuery,
  useGetItemCategoryDetailQuery,
  useGetAbilityListQuery,
  useGetNatureListQuery,
  useGetStatusEffectListQuery,
  useGetMoveDetailQuery,
  useGetAbilityDetailQuery,
  useGetNatureDetailQuery,
  useGetMoveCategoryListQuery,
  useGetMoveCategoryDetailQuery,
  useGetPokemonDetailQuery,
  useGetVersionGroupQuery,
  useGetTypeDetailQuery,
  useGetEvolutionChainDetailQuery,
  useGetPokemonListQuery,
  useGetPokemonEncountersQuery,
  useGetItemListQuery,
  useGetItemDetailQuery,
  useGetRegionListQuery,
} = pokeApi;
