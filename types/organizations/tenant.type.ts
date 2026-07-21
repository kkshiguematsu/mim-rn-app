import { GatewayProviders } from '../payment/payment.type';

export interface PaymentGatewayConfig {
  provider: GatewayProviders;
  encryptedSecretKey: string;
  publicKey: string;
  isActive: boolean;
  isDefault: boolean;
  iv: string;
}

export interface BillingConfig {
  gatewayProvider: GatewayProviders;
}

export interface Tenant {
  _id: string;
  name: string;
  cnpj: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  billingConfig: BillingConfig;
  logoUrl: string;
  primaryColor: string;
  paymentGateways: PaymentGatewayConfig[];
}
