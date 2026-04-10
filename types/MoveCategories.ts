export interface MoveCategories {
  count: number;
  next: string | null;
  previous: string | null;
  results: MoveCategoriesSummary[];
}

export interface MoveCategoriesSummary {
  name: string;
  url: string;
}
