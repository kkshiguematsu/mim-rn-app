export const formatTimeToMinutes = (timeInSeconds: number): string => {
  const minutes = Math.ceil(timeInSeconds / 60).toFixed(0);
  return minutes;
};

export function formatTimeToHM(timestamp: number): string {
  const dateObject = new Date(timestamp);

  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(dateObject);
}
