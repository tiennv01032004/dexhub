export interface ItemCategories {
  count: number;
  next: string | null;
  previous: string | null;
  results: ItemCategoriesSummary[];
}

export interface ItemCategoriesSummary {
  name: string;
  url: string;
}
