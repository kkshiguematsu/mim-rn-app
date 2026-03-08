export interface MonthlyStatItem {
  value: string;
  unit?: string;
  label: string;
  trend: string;
}

export interface MonthlyType {
  month: string;
  stats: MonthlyStatItem[];
}
