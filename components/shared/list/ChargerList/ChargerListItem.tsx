import { Text } from '@/components/ui/text';

import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { VStack } from '@/components/ui/vstack';
import { useChargerStore } from '@/hooks/store/useChargerStore';
import { useLocationStore } from '@/hooks/store/useLocationStore';
import { useMapBottomSheetStore } from '@/hooks/store/useMapBottomSheetStore';
import { MapBottomSheetNames } from '@/types/bottomsheet/map/mapBottomSheetNames';
import { Charger } from '@/types/charger/charger.type';
import { haversineDistance } from '@/utils/Map.utils';
import { useRoute } from '@react-navigation/native';
import clsx from 'clsx';
import { useRouter } from 'expo-router';
import { ChevronRight, MapPin } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { TintedBadge } from '../../badge/TintedBadge';
const placeholderImage = require('@/assets/images/chargers/charger_image.jpg');

interface ChargerListItemProps {
  item: Charger;
}

export function ChargerListItem({ item }: ChargerListItemProps) {
  // const { activeVehicle } = useVehicleStore();
  const router = useRouter();
  const route = useRoute();

  const { currentLocation } = useLocationStore();
  const { setSelectedCharger } = useChargerStore();
  const { enableMapModal } = useMapBottomSheetStore();

  // const maxPower = Math.max(...(item.connectors?.map((c) => c.maxPowerKw || 0) ?? [0]));

  const handleSelectedCharger = () => {
    const path = route.name;

    if (!path.includes('(maps)')) {
      router.replace(`/(maps)/map`);
    }

    setSelectedCharger(item);
    enableMapModal(MapBottomSheetNames.MapStationDetails);
  };

  const distance =
    currentLocation && item.address
      ? haversineDistance(
          currentLocation?.coords.latitude,
          currentLocation?.coords.longitude,
          item.address.location.coordinates[1],
          item.address.location.coordinates[0]
        )
      : null;

  const distanceLabel = distance
    ? distance < 1
      ? `~${Math.round(distance * 1000)}m`
      : `~${distance.toFixed(1)}km`
    : null;

  const availableConnector = item.connectors.reduce(
    (acc, connector) => acc + (connector.status === 'AVAILABLE' ? 1 : 0),
    0
  );

  return (
    <Pressable onPress={handleSelectedCharger}>
      {({ pressed }) => (
        <View
          className={clsx('flex-row gap-6 shadow-sm shadow-neutral-300', pressed && 'opacity-60')}
        >
          <View className="flex items-center justify-center">
            <Image
              size="md"
              className="overflow-hidden rounded-2xl"
              resizeMode="cover"
              alt="charger-image"
              source={{
                uri: placeholderImage,
              }}
            />
          </View>
          <View className={clsx('flex-1 flex-row')}>
            <VStack className="flex-1">
              <Text size="lg" className="font-bold text-neutral-900 dark:text-white">
                {item.name}
              </Text>

              <HStack className="gap-2">
                <Icon as={MapPin} size="xs" />

                <Text size="xs" className="text-neutral-500">
                  {item.address?.street}, {item.address?.number}
                </Text>
              </HStack>

              <HStack className="mt-2 flex-wrap gap-2">
                <TintedBadge
                  label={`${availableConnector} disponíveis`}
                  color={availableConnector > 0 ? 'green' : 'red'}
                  size="xs"
                />
                {distanceLabel && <TintedBadge label={distanceLabel} color="primary" size="xs" />}
              </HStack>
            </VStack>
          </View>

          <View className="flex items-center justify-center">
            <Icon as={ChevronRight} />
          </View>

          {/* <HStack className="h-full items-center justify-center gap-1">
            <Heading size="2xl">{maxPower}</Heading>
            <Text size="sm">kW</Text>
          </HStack> */}
        </View>
      )}
    </Pressable>
  );
}
