import { ReactNode } from "react";

export interface Stats {
  label: string;
  icon: ReactNode;
  value?: string;
  color: string;
}
