export interface Status {
  count: number;
  next: string | null;
  previous: string | null;
  results: StatusSummary[];
}

export interface StatusSummary {
  name: string;
  url: string;
}
