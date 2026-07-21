import { Transaction } from '@/types/transaction/transaction.type';
import { UserProfile } from '@/types/user/user.type';

export interface MonthlyStatItem {
  value: number | string;
  unit?: string;
  label: string;
  trend?: string;
}

export interface MonthlyType {
  month: string;
  stats: MonthlyStatItem[];
}

export interface MonthlyStatsResponse {
  profile: UserProfile;
  totalSpent: number;
  totalEnergyConsumed: number;
  totalSessions: number;
  recentSessions: Transaction[];
}
