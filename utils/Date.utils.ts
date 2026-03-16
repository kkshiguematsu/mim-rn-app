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
