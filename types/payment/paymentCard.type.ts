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
  user_name: string;
  expired_date: string;
  vcc_code: string;
  code: string;
  flag: FlagCard;
};
