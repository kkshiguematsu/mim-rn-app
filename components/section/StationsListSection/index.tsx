import { DefaultCard } from '@/components/shared/cards/DefaultCard';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { LinkText } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { StationType } from '@/types/station/station.type';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
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
  return (
    <Section
      title="Carregadores próximos"
      onPress={
        <HStack className="items-center">
          <LinkText className="no-underline">Ver no mapa</LinkText>
          <Icon as={ChevronRight} className="text-primary-400" />
        </HStack>
      }
    >
      <DefaultCard padding="none">
        {nearbyStationsMock.map((station, index) => (
          <Pressable key={index} onPress={() => {}}>
            <View className="flex-row items-center justify-between px-6 py-4">
              <HStack className="items-center gap-4">
                <View
                  className={clsx(
                    'h-3 w-3 rounded-full',
                    station.status === 'free'
                      ? 'bg-green-500'
                      : station.status === 'busy'
                        ? 'bg-yellow-500'
                        : 'bg-gray-300'
                  )}
                />

                <View>
                  <View className="flex-row items-center gap-2">
                    <Text size="md" className="font-bold">
                      {station.name}
                    </Text>
                  </View>
                  <Text size="xs" className="text-gray-500">
                    {station.distanceKm} km ~ {station.etaMin} min - {station.available} livres de{' '}
                    {station.total}
                  </Text>
                </View>
              </HStack>

              <VStack className="items-end">
                <Text size="md" className="font-bold">
                  R$ {station.pricePerKwh.toFixed(2)}
                  <Text size="xs" className="font-normal text-gray-500">
                    /kWh
                  </Text>
                </Text>

                <Text
                  size="xs"
                  className={clsx(
                    'text-sm font-medium',
                    station.compatible ? 'text-green-700' : 'text-red-500'
                  )}
                >
                  {station.compatible ? 'Compatível' : 'Não compatível'}
                </Text>
              </VStack>

              {/* <ChevronRight className="text-gray-400" /> */}
            </View>
            {nearbyStationsMock.length - 1 !== index && <Divider />}
          </Pressable>
        ))}
      </DefaultCard>
    </Section>
  );
};
