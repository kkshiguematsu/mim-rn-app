export type SessionEndReason =
  | 'limit_percent'
  | 'limit_brl'
  | 'limit_kwh'
  | 'user_stopped'
  | 'error'
  | 'disconnected';

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
