export type SessionEndReason =
  | 'limit_percent'
  | 'limit_brl'
  | 'limit_kwh'
  | 'user_stopped'
  | 'error'
  | 'disconnected';

export interface HistoryLocation {
  city: string;
  address: string;
}

export interface HistoryPrice {
  value: number;
  currency: string;
  perKwh: number;
}

export interface HistoryCar {
  model: string;
  licensePlate: string;
}

export interface HistoryResponse {
  id: string;
  date: number;
  duration: number;
  maxPowerKw: number;
  batteryStart: number;
  batteryEnd: number;
  energyKwh: number;
  endReason: SessionEndReason;
  location: HistoryLocation;
  price: HistoryPrice;
  car: HistoryCar;
}
