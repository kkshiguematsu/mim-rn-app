export function formatDateToDMY(timestamp: number): string {
  const dateObject = new Date(timestamp);

  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObject);
}

export const formatStringDateToDMY = (date: string): string => {
  const dateObject = new Date(date);
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = dateObject.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatStringDateToHHMM = (date: string): string => {
  const dateObject = new Date(date);
  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
};

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

interface GroupedResult<T> {
  label: string;
  data: T[];
}

const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const groupByMonth = <T extends Record<string, any>>(
  items: T[],
  dateKey: keyof T
): GroupedResult<T>[] => {
  const grouped = items.reduce<Record<string, T[]>>((acc, item) => {
    const date = new Date(item[dateKey]);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    if (!acc[key]) acc[key] = [];
    acc[key].push(item);

    return acc;
  }, {});

  return Object.entries(grouped)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, data]) => {
      const [year, month] = key.split('-').map(Number);
      return { label: `${MONTHS[month]} ${year}`, data };
    });
};

export const getCurrentMonth = () => {
  const currentMonth = new Date().getMonth();
  return MONTHS[currentMonth];
};

export const formatRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'agora';
  if (diffMinutes < 60) return `em ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
  if (diffHours < 24) return `há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  return `há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
};
