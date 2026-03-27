export type ConnectorType = 'CCS2' | 'CHAdeMO' | 'Type 2' | 'Tesla';

export type VehicleColor = 'black' | 'white' | 'silver' | 'red' | 'blue' | 'gray';

export interface VehicleType {
  id: string;
  brand: string;
  model: string;
  plate: string;
  year: number;
  connector: ConnectorType;
  batteryCapacityKwh: number;
  maxPowerKw: number;
  rangeKm: number;
  color: VehicleColor;
  nickname?: string;
  batteryPct: number;
  lastSessionDate: string;
  lastSessionKwh: number;
  createdAt: string;
}

export interface VehicleFormData {
  brand: string;
  model: string;
  plate: string;
  year: number;
  connector: ConnectorType | null;
  batteryCapacityKwh: string;
  maxPowerKw: string;
  color: VehicleColor;
  nickname: string;
}

export const INITIAL_FORM_DATA: VehicleFormData = {
  brand: '',
  model: '',
  plate: '',
  year: new Date().getFullYear(),
  connector: null,
  batteryCapacityKwh: '',
  maxPowerKw: '',
  color: 'black',
  nickname: '',
};

export const CONNECTOR_OPTIONS: ConnectorType[] = ['CCS2', 'CHAdeMO', 'Type 2', 'Tesla'];

export const VEHICLE_BRANDS = [
  'Audi',
  'BMW',
  'BYD',
  'Chevrolet',
  'Fiat',
  'Ford',
  'Hyundai',
  'Kia',
  'Mercedes',
  'Peugeot',
  'Renault',
  'Tesla',
  'Volkswagen',
  'Volvo',
  'Outro',
];

export const VEHICLE_COLORS: { id: VehicleColor; hex: string; label: string }[] = [
  { id: 'black', hex: '#111110', label: 'Preto' },
  { id: 'white', hex: '#f5f5f3', label: 'Branco' },
  { id: 'silver', hex: '#9ca3af', label: 'Prata' },
  { id: 'red', hex: '#c0392b', label: 'Vermelho' },
  { id: 'blue', hex: '#2563eb', label: 'Azul' },
  { id: 'gray', hex: '#6b7280', label: 'Cinza' },
];
