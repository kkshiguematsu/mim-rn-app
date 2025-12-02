function getCardBrand(cardNumber: string) {
  const number = cardNumber.replace(/\D/g, '');

  if (/^4/.test(number)) return 'Visa';
  if (/^5[1-5]/.test(number)) return 'Mastercard (faixa antiga)';
  if (/^3[47]/.test(number)) return 'American Express';
  if (/^(6011|65)/.test(number)) return 'Discover';

  // Exemplos de faixas da Elo (há várias)
  if (/^(4011|4389|4576|6277)/.test(number)) return 'Elo';

  // Mastercard nova faixa — precisa de 6+ dígitos
  if (/^2(2[2-9]|[3-7])/.test(number)) return 'Mastercard (faixa nova)';

  return 'Desconhecida';
}
