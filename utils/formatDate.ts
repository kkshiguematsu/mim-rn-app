export function formatDateToDMY(timestamp: number): string {
  const dateObject = new Date(timestamp);

  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObject);
}

export function formatTimeToHM(timestamp: number): string {
  const dateObject = new Date(timestamp);

  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(dateObject);
}
