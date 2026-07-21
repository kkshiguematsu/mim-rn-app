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

export const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
};
