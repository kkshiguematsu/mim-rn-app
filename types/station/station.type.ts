export interface StationType {
  name: string;
  distanceKm: number;
  available: number;
  total: number;
  etaMin?: number;
  queueMin?: number;
  pricePerKwh: number;
  compatible: boolean;
  status: 'free' | 'busy' | 'full';
}
