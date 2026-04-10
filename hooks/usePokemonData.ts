import { useMemo, useDeferredValue } from "react";
import { ALL_POKEMON_DATA } from "@/constants";

export function usePokemonData(
  gen: string | null,
  type: string | null,
  tag: string | null,
  sortBy: string,
  page: number,
  ITEMS_PER_PAGE: number,
) {
  const deferredSortBy = useDeferredValue(sortBy);

  const filtered = useMemo(() => {
    return ALL_POKEMON_DATA.filter((p) => {
      const matchGen = !gen || p.gen === parseInt(gen);
      const matchType =
        !type || p.types.some((t) => t.toLowerCase() === type.toLowerCase());
      const matchTag =
        !tag || p.tags.some((t) => t.toLowerCase() === tag.toLowerCase());
      return matchGen && matchType && matchTag;
    });
  }, [gen, type, tag]);

  const displayList = useMemo(() => {
    const sorted = [...filtered].sort((a, b) => {
      if (deferredSortBy === "id-asc") return a.num - b.num;
      if (deferredSortBy === "id-desc") return b.num - a.num;
      if (deferredSortBy === "name-asc") return a.name.localeCompare(b.name);
      if (deferredSortBy === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });
    return sorted.slice(0, page * ITEMS_PER_PAGE);
  }, [filtered, page, deferredSortBy, ITEMS_PER_PAGE]);

  return {
    displayList,
    totalFiltered: filtered.length,
    hasMore: filtered.length > displayList.length,
    isSorting: sortBy !== deferredSortBy,
  };
}
