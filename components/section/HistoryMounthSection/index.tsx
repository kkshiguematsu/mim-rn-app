import { Section } from '@/components/section/Section';
import { HistoryCard } from '@/components/shared/cards/HistoryCard';
import { MenuCard } from '@/components/shared/cards/MenuCard';
import { Text } from '@/components/ui/text';
import { HistoryResponse } from '@/types/history/historyResponse';
import { useMemo } from 'react';

interface Props {
  label: string;
  data: HistoryResponse[];
}

export const HistoryMounthSection = ({ label, data }: Props) => {
  const groupedSummary = useMemo(() => {
    return [
      {
        label: 'Total do mês',
        value: (
          <Text size="sm" className="font-bold text-black dark:text-white">
            R$ {data.reduce((acc, item) => acc + item.price.value, 0).toFixed(2)}
          </Text>
        ),
      },
      {
        label: 'Energia total',
        value: (
          <Text size="sm" className="font-bold text-green-600 dark:text-green-400">
            {data.reduce((acc, item) => acc + item.energyKwh, 0).toFixed(0)} kWh
          </Text>
        ),
      },
      {
        label: 'Sessões',
        value: (
          <Text size="sm" className="font-bold text-black dark:text-white">
            {data.length} carregamentos
          </Text>
        ),
      },
    ];
  }, [data]);

  return (
    <Section key={label} title={label}>
      {data.map((dataCard, index) => (
        <HistoryCard key={`card-history-${index}`} data={dataCard} />
      ))}
      <MenuCard rows={groupedSummary} size="sm" />
    </Section>
  );
};
