import { Page } from '@/components/shared/Page';
import { HistoryCard, HistoryResponse } from '@/components/shared/cards/HistoryCard';
import { VStack } from '@/components/ui/vstack';

export const mockHistoryitems: HistoryResponse[] = [
  {
    id: '1',
    date: 1768055520000,
    duration: 45,
    max_power: '150 kW',
    batteryPercent: 80,
    kwh: 32.5,
    location: {
      city: 'São Paulo',
      address: 'Av. Paulista, 1000',
    },
    price: {
      value: 42.9,
      token: 'BRL',
    },
    car: {
      model: 'BYD Dolphin',
      license_plate: 'ABC1D23',
    },
  },
  {
    id: '2',
    date: 1767863400000,
    duration: 30,
    max_power: '50 kW',
    batteryPercent: 65,
    kwh: 18.2,
    location: {
      city: 'Campinas',
      address: 'Rod. Dom Pedro I, km 129',
    },
    price: {
      value: 24.5,
      token: 'BRL',
    },
    car: {
      model: 'Chevrolet Bolt',
      license_plate: 'DEF4G56',
    },
  },
  {
    id: '3',
    date: 1767638820000,
    duration: 60,
    max_power: '22 kW',
    batteryPercent: 90,
    kwh: 21.8,
    location: {
      city: 'Rio de Janeiro',
      address: 'Av. das Américas, 500',
    },
    price: {
      value: 19.9,
      token: 'BRL',
    },
    car: {
      model: 'Volvo XC40 Recharge',
      license_plate: 'GHI7J89',
    },
  },
  {
    id: '4',
    date: 1767425100000,
    duration: 25,
    max_power: '100 kW',
    batteryPercent: 55,
    kwh: 14.6,
    location: {
      city: 'Curitiba',
      address: 'R. Marechal Deodoro, 300',
    },
    price: {
      value: 20.1,
      token: 'BRL',
    },
    car: {
      model: 'Tesla Model 3',
      license_plate: 'JKL0M12',
    },
  },
  {
    id: '5',
    date: 1767038700000,
    duration: 90,
    max_power: '11 kW',
    batteryPercent: 100,
    kwh: 42.0,
    location: {
      city: 'Florianópolis',
      address: 'Av. Beira-Mar Norte, 1500',
    },
    price: {
      value: 36.75,
      token: 'BRL',
    },
    car: {
      model: 'Renault Kwid E-Tech',
      license_plate: 'MNO3P45',
    },
  },
  {
    id: '6',
    date: 1766835600000,
    duration: 40,
    max_power: '75 kW',
    batteryPercent: 70,
    kwh: 26.3,
    location: {
      city: 'Belo Horizonte',
      address: 'Av. do Contorno, 8000',
    },
    price: {
      value: 31.2,
      token: 'BRL',
    },
    car: {
      model: 'Nissan Leaf',
      license_plate: 'QRS6T78',
    },
  },
];

export default function HistoryPage() {
  return (
    <Page needsPadding needsSafeArea>
      <VStack space="sm">
        {mockHistoryitems.map((dataCard, index) => (
          <HistoryCard key={`card-history-${index}`} data={dataCard} />
        ))}
      </VStack>
    </Page>
  );
}
