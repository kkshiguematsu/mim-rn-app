import { Charger } from '../charger/charger.type';
import { PaymentStatus } from '../payment/payment.type';
import { User } from '../user/user.type';

export type BillingModel = 'KWH' | 'TIME' | 'FIXED';

export type TransactionStatus = 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'FAULTED' | 'ERROR';

export interface Transaction {
  _id: string;
  tenantId: string;
  chargerId: Charger;

  rfidTag?: string;
  userId?: User;

  vehiclePlate?: string;
  meterStart: number;
  meterStop?: number;
  status: TransactionStatus;
  startedAt: string;
  stoppedAt?: string;
  limitKwh?: number;
  currency?: string;
  paymentStatus: PaymentStatus;
  totalCost?: number;
  prePaidAmount?: number;
  ocppTransactionId?: number;
  currentPower?: number;
  currentSoC?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ActiveTransaction extends Transaction {}
