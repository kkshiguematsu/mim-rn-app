import { Section } from '@/components/section/Section';
import { Address } from '@/types/charger/charger.type';
import { useRouter } from 'expo-router';
import { Clock, CreditCard, DollarSign, MapPin, Zap } from 'lucide-react-native';
import { TailwindColor } from '../../icon/TintedIcon/styles';
import { MenuCard } from '../MenuCard';
import { MenuItemProps } from '../MenuCard/MenuItems';

interface Props {
  startTime: string;
  endTime: string | undefined;
  energyKwh: number;
  tariff: number;
  location?: Address;
  paymentLabel: string;
  className?: string;
}

export function SessionDetailsCard({
  startTime,
  endTime,
  energyKwh,
  tariff,
  location,
  paymentLabel,
  className,
}: Props) {
  const router = useRouter();

  const rows: MenuItemProps[] = [
    {
      label: 'Início',
      value: startTime,
      icon: {
        name: Clock,
        color: 'blue',
      },
    },
    ...(endTime
      ? [
          {
            label: 'Término',
            value: endTime,
            icon: {
              name: Clock,
              color: 'purple' as TailwindColor,
            },
          },
        ]
      : []),
    {
      label: 'Energia adicionada',
      value: `${energyKwh.toFixed(1)} kWh`,
      valueColor: '#34c759',
      icon: {
        name: Zap,
        color: 'green',
      },
    },
    {
      label: 'Tarifa',
      value: `R$ ${tariff} / kWh`,
      icon: {
        name: DollarSign,
        color: 'orange',
      },
    },
    {
      label: 'Localização',
      subLabel: `${location?.street}, ${location?.number}`,
      icon: {
        name: MapPin,
        color: 'red',
      },
      onClick: () =>
        router.push({
          pathname: '/(maps)/map',
          params: {
            lat: location?.location.coordinates[1],
            lng: location?.location.coordinates[0],
          },
        }),
    },
    {
      label: 'Pagamento',
      value: paymentLabel,
      valueColor: '#007aff',
      icon: {
        name: CreditCard,
        color: 'blue',
      },
    },
  ];

  return (
    <Section title="Detalhes da sessão" className={className}>
      <MenuCard rows={rows} sizeIcon="lg" />
    </Section>
  );
}
