import { TailwindColor } from '@/components/shared/icon/TintedIcon/styles';
import { PaymentFlow, PaymentMethod } from '../payment/payment.type';
import { BillingModel } from '../transaction/transaction.type';

export type ChargerStatus =
  | 'ONLINE'
  | 'OFFLINE'
  | 'PREPARING'
  | 'CHARGING'
  | 'FAULTED'
  | 'UNAVAILABLE';

export type ConnectorStatus =
  | 'AVAILABLE'
  | 'PREPARING'
  | 'CHARGING'
  | 'FINISHING'
  | 'FAULTED'
  | 'UNAVAILABLE'
  | 'RESERVED';

export type ConnectorType = 'CCS1' | 'CCS2' | 'CHAdeMO' | 'Type 2' | 'GB_T' | string;

export const CONNECTOR_STATUS_MAP: Record<
  ConnectorStatus,
  { label: string; color: TailwindColor }
> = {
  AVAILABLE: { label: 'Disponível', color: 'green' },
  PREPARING: { label: 'Preparando', color: 'yellow' },
  CHARGING: { label: 'Carregando', color: 'blue' },
  FINISHING: { label: 'Finalizando', color: 'cyan' },
  FAULTED: { label: 'Com falha', color: 'red' },
  UNAVAILABLE: { label: 'Indisponível', color: 'gray' },
  RESERVED: { label: 'Reservado', color: 'purple' },
};

export interface Charger {
  _id: string;
  tenantId: string;
  organizationId: string;
  identity: string;
  name: string;
  status: ChargerStatus;
  isPubliclyVisible: boolean;
  pricePerKwh: number;
  acceptedPaymentMethods: PaymentMethod[];
  paymentFlow: PaymentFlow;
  heartbeatInterval: number;
  connectors: Connector[];
  billingConfig: BillingConfig;
  reservationConfig: ReservationConfig;
  operatingHours: OperatingHours;
  address?: Address;
  firmwareVersion: string;
  model: string;
  serialNumber: string;
  vendor: string;
  isOnline: boolean;
  lastHeartbeat: string;
  alarms: Alarm[];
  reviews: unknown[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Address {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
}

interface ReservationConfig {
  _id: string;
  isReservationEnabled: boolean;
  isPaymentOnReservation: boolean;
  reservationValue: number;
}

export interface Connector {
  _id: string;
  connectorId: number;
  status: ConnectorStatus;
  type: ConnectorType;
  maxPowerKw: number;
}

interface BillingConfig {
  _id: string;
  isPaymentEnabled: boolean;
  isCouponAccepted: boolean;
  billingModel: BillingModel;
  unitValue: number;
  idleFeeEnabled: boolean;
  activationFeeEnabled: boolean;
  activationFeeValue: number;
  minKwhForBilling: number;
  minPriceForBilling: number;
  exemptionByKwh: boolean;
  exemptionByTolerance: boolean;
}

interface OperatingHoursSlot {
  dayOfWeek?: number;
  openTime?: string;
  closeTime?: string;
}

interface OperatingHours {
  _id: string;
  timezone: string;
  isSemiPublic: boolean;
  schedule: OperatingHoursSlot[];
}

interface Alarm {
  _id: string;
  connectorId: number;
  status: ConnectorStatus;
  errorCode: string;
  info: string;
  timestamp: string; // ISO 8601
}
