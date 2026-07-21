import { TintedBadgeProps } from '@/components/shared/badge/TintedBadge';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react-native';

export type SessionEndReason =
  | 'limit_percent'
  | 'limit_brl'
  | 'limit_kwh'
  | 'user_stopped'
  | 'error'
  | 'disconnected';

export const END_REASON_BADGE: Record<SessionEndReason, TintedBadgeProps> = {
  limit_percent: { label: 'Completo', color: 'green', icon: CheckCircle },
  limit_brl: { label: 'Limite R$', color: 'blue', icon: CheckCircle },
  limit_kwh: { label: 'Limite kWh', color: 'blue', icon: CheckCircle },
  user_stopped: { label: 'Interrompido', color: 'amber', icon: AlertTriangle },
  error: { label: 'Erro', color: 'red', icon: XCircle },
  disconnected: { label: 'Desconectado', color: 'red', icon: XCircle },
};

export interface SessionLocation {
  city: string;
  address: string;
}

export interface SessionPrice {
  value: number;
  currency: string;
  perKwh: number;
}

export interface SessionVehicle {
  model: string;
  licensePlate: string;
}

export interface Session {
  id: string;
  date: number;
  duration: number;
  maxPowerKw: number;
  batteryStart: number;
  batteryEnd: number;
  energyKwh: number;
  endReason: SessionEndReason;
  location: SessionLocation;
  price: SessionPrice;
  car: SessionVehicle;
}
