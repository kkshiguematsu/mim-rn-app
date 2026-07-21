export interface VEHICLE_COLOR {
  id: string;
  hex: string;
  label: string;
}

export const VEHICLE_COLORS: VEHICLE_COLOR[] = [
  { id: 'black', hex: '#000000', label: 'Black' },
  { id: 'white', hex: '#ffffff', label: 'White' },
  { id: 'blue', hex: '#3b82f6', label: 'Blue' },
  { id: 'red', hex: '#ef4444', label: 'Red' },
  { id: 'silver', hex: '#c0c0c0', label: 'Silver' },
  { id: 'yellow', hex: '#eab308', label: 'Yellow' },

  { id: 'gray', hex: '#6b7280', label: 'Gray' },
  { id: 'slate', hex: '#64748b', label: 'Slate' },
  { id: 'zinc', hex: '#71717a', label: 'Zinc' },
  { id: 'neutral', hex: '#737373', label: 'Neutral' },
  { id: 'stone', hex: '#78716c', label: 'Stone' },

  { id: 'orange', hex: '#f97316', label: 'Orange' },
  { id: 'amber', hex: '#f59e0b', label: 'Amber' },
  { id: 'lime', hex: '#84cc16', label: 'Lime' },
  { id: 'green', hex: '#22c55e', label: 'Green' },
  { id: 'emerald', hex: '#10b981', label: 'Emerald' },
  { id: 'teal', hex: '#14b8a6', label: 'Teal' },
  { id: 'cyan', hex: '#06b6d4', label: 'Cyan' },
  { id: 'sky', hex: '#0ea5e9', label: 'Sky' },
  { id: 'indigo', hex: '#6366f1', label: 'Indigo' },
  { id: 'violet', hex: '#8b5cf6', label: 'Violet' },
  { id: 'purple', hex: '#a855f7', label: 'Purple' },
  { id: 'fuchsia', hex: '#d946ef', label: 'Fuchsia' },
  { id: 'pink', hex: '#ec4899', label: 'Pink' },
  { id: 'rose', hex: '#f43f5e', label: 'Rose' },
];

export type ConnectorType = 'CCS2' | 'CHAdeMO' | 'Type 2' | 'Tesla';

export const CONNECTOR_OPTIONS: ConnectorType[] = ['CCS2', 'CHAdeMO', 'Type 2', 'Tesla'];

export interface VehicleConnector {
  type: ConnectorType | null;
  maxChargingPowerKw: number | null;
}

export interface VehicleCatalog {
  _id: string;
  brand: string;
  model: string;
  year: number;
  connectors: VehicleConnector[];
  batteryCapacityKwh?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  photoUrl?: string;
}

export interface Vehicle {
  _id: string;
  catalogId: VehicleCatalog;
  licensePlate?: string;
  ownerType?: string;
  ownerId?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserVehicle {
  userVehicleId: string;
  vehicle: Vehicle;
  rules?: Record<string, any>;
  isOwner?: boolean;
}
