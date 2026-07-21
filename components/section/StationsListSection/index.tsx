import { DefaultCard } from '@/components/shared/cards/DefaultCard';
import { ChargerListItem } from '@/components/shared/list/ChargerList/ChargerListItem';
import { Divider } from '@/components/ui/divider';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useSearchNearbyChargers } from '@/hooks/api/chargers/useSearchNearbyChargers';
import { useChargerStore } from '@/hooks/store/useChargerStore';
import { StationType } from '@/types/station/station.type';
import { MapPin } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { Section } from '../Section';

export const nearbyStationsMock: StationType[] = [
  {
    name: 'Shopping Cataratas',
    distanceKm: 2.3,
    available: 4,
    total: 6,
    etaMin: 3,
    pricePerKwh: 0.63,
    compatible: true,
    status: 'free',
  },
  {
    name: 'Parque Tecnológico',
    distanceKm: 4.1,
    available: 1,
    total: 4,
    etaMin: 8,
    pricePerKwh: 0.58,
    compatible: true,
    status: 'busy',
  },
  {
    name: 'Hotel das Cataratas',
    distanceKm: 6.7,
    available: 0,
    total: 6,
    queueMin: 18,
    pricePerKwh: 0.71,
    compatible: false,
    status: 'full',
  },
];

export const StationsListSection = () => {
  const { nearbyChargers } = useChargerStore();

  useSearchNearbyChargers();

  return (
    <Section title="Carregadores próximos">
      <DefaultCard padding="none">
        {!nearbyChargers || nearbyChargers.length === 0 ? (
          <DefaultCard padding="md" className="items-center justify-center py-8">
            <Icon as={MapPin} size="lg" className="mb-2 text-primary-600" />
            <Text className="text-center text-gray-500">Nenhum carregador próximo</Text>
          </DefaultCard>
        ) : (
          nearbyChargers.map((charger, index) => (
            <Pressable className="p-4" key={index} onPress={() => {}}>
              <ChargerListItem item={charger} />
              {nearbyChargers.length - 1 !== index && <Divider />}
            </Pressable>
          ))
        )}
      </DefaultCard>
    </Section>
  );
};
