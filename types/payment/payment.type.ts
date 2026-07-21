export type FlagCard =
  | 'alipay'
  | 'amex'
  | 'code'
  | 'cvv'
  | 'diners'
  | 'discover'
  | 'elo'
  | 'generic'
  | 'hiper'
  | 'hipercard'
  | 'jcb'
  | 'maestro'
  | 'mastercard'
  | 'master'
  | 'mir'
  | 'paypal'
  | 'unionpay'
  | 'visa';

export type PaymentFlow = 'POST_PAID' | 'PRE_PAID';

export type PaymentMethod = 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FREE_PAID' | 'FAILED' | 'REFUNDED';

export type GatewayProviders = 'MERCADOPAGO' | 'STRIPE' | 'PAGARME' | string;

export type PaymentCardType = {
  userName: string;
  expiredDate: string;
  cvvCode: string;
  code: string;
  flag: FlagCard;
};
