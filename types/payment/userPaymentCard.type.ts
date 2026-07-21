import { GatewayProviders } from './payment.type';

export interface PaymentCardToken {
  provider: GatewayProviders;
  token: string;
  _id: string;
}

export interface UserPaymentCard {
  _id: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  tokens: PaymentCardToken[];
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
}
