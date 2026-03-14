export function formatDateToDMY(timestamp: number): string {
  const dateObject = new Date(timestamp);

  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObject);
}

export const formatDateInput = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  const limited = numbers.slice(0, 8);

  let formatted = limited;
  if (limited.length >= 5) {
    formatted = `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4, 8)}`;
  } else if (limited.length >= 3) {
    formatted = `${limited.slice(0, 2)}/${limited.slice(2, 4)}`;
  }

  return formatted;
};
