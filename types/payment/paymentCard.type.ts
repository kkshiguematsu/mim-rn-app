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

export type PaymentCardType = {
  userName: string;
  expiredDate: string;
  cvvCode: string;
  code: string;
  flag: FlagCard;
};
