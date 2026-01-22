export interface HistoryResponse {
  date: number;
  id: string;
  duration: number;
  max_power: string;
  batteryPercent: number;
  kwh: number;
  location: {
    city: string;
    address: string;
  };
  price: {
    value: number;
    token: string;
  };
  car: {
    model: string;
    license_plate: string;
  };
}

export type periodFiltersType = 'todos' | 'dia' | 'semana' | 'mês' | 'ano';
