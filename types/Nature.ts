export interface Nature {
  count: number;
  next: string | null;
  previous: string | null;
  results: NatureSummary[];
}

export interface NatureSummary {
  name: string;
  url: string;
}
