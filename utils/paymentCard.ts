import { FlagCard } from '@/types/payment/paymentCard.type';

export const getCardBrand = (cardNumber: string): FlagCard | undefined => {
  const number = cardNumber.replace(/\D/g, '');

  if (/^(4011|4389|4576|6277)/.test(number)) return 'elo';
  if (/^4/.test(number)) return 'visa';
  if (/^5[1-5]/.test(number)) return 'mastercard';
  if (/^(6011|65)/.test(number)) return 'discover';
  if (/^2(2[2-9]|[3-7])/.test(number)) return 'mastercard';

  return undefined;
};

export const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
