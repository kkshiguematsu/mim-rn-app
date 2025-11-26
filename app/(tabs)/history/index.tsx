import { Page } from '@/components/shared/Page';
import { HistoryCard, HistoryResponse } from '@/components/shared/cards/HistoryCard';
import { VStack } from '@/components/ui/vstack';

const mockHistoryitems: HistoryResponse[] = [
  {
    date: '1764126220',
    duration: 5400,

    max_power: '100kW',

    location: {
      city: 'Foz do Iguaçu',
      address: 'Av Parana 1195',
    },
    price: {
      value: 150.0,
      token: 'R$',
    },
    car: {
      model: 'BYD Dolphin Mini',
      license_plate: '2VASF124',
    },
  },
];

export default function HistoryPage() {
  return (
    <Page needsPadding needsSafeArea>
      <VStack>
        {mockHistoryitems.map((dataCard, index) => (
          <HistoryCard key={`card-history-${index}`} data={dataCard} />
        ))}
      </VStack>
    </Page>
  );
}
