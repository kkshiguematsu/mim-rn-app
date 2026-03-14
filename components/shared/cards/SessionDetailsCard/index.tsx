import { Section } from '@/components/section/Section';
import { Icon } from '@/components/ui/icon';
import { ChevronRight, Clock, CreditCard, DollarSign, MapPin, Zap } from 'lucide-react-native';
import { MenuCard } from '../MenuCard';
import { MenuItemProps } from '../MenuCard/MenuItems';

interface Props {
  startTime: string;
  endTime: string;
  energyKwh: number;
  tariff: number;
  location: string;
  locationSub: string;
  paymentLabel: string;
}

export function SessionDetailsCard({
  startTime,
  endTime,
  energyKwh,
  tariff,
  location,
  locationSub,
  paymentLabel,
}: Props) {
  const rows: MenuItemProps[] = [
    {
      label: 'Início',
      value: startTime,
      icon: {
        name: Clock,
        color: 'blue',
      },
    },
    {
      label: 'Término previsto',
      value: endTime,
      icon: {
        name: Clock,
        color: 'purple',
      },
    },
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
      value: `R$ ${tariff.toFixed(2)} / kWh`,
      icon: {
        name: DollarSign,
        color: 'orange',
      },
    },
    {
      label: 'Localização',
      subLabel: location,
      value: <Icon as={ChevronRight} size="lg" className="text-neutral-400" />,
      icon: {
        name: MapPin,
        color: 'red',
      },
      onClick: () => {},
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
    <Section title="Detalhes da sessão">
      <MenuCard rows={rows} sizeIcon="lg" />
    </Section>
  );
}
