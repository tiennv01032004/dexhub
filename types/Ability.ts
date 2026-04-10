export interface Ability {
  count: number;
  next: string | null;
  previous: string | null;
  results: AbilitySummary[];
}

export interface AbilitySummary {
  name: string;
  url: string;
}
