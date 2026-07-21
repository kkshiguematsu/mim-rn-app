import { Text } from '@/components/ui/text';
import React, { useState } from 'react';

import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { useArrivalDetection } from '@/hooks/maps/useArrivalDetection';
import { useChargerStore } from '@/hooks/store/useChargerStore';
import { useMapBottomSheetStore } from '@/hooks/store/useMapBottomSheetStore';
import { useCameraPermission } from '@/hooks/utils/useCameraPermission';
import { MapBottomSheetNames } from '@/types/bottomsheet/map/mapBottomSheetNames';
import { formatDistance, formatDuration } from '@/utils/Map.utils';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { CheckCircle, MapPin, QrCode } from 'lucide-react-native';
import { View } from 'react-native';
import { QrCodeScannerModal } from '../../modals/QrCodeScannerModal';

export const MapStationRoutingSheet = () => {
  const [isScannerVisible, setIsScannerVisible] = useState(false);

  const router = useRouter();

  const { hasArrived } = useArrivalDetection();
  const { ensurePermission } = useCameraPermission();
  const { mapRef, enableMapModal, setActiveRouting } = useMapBottomSheetStore();
  const { selectedCharger, selectedRoute, setSelectedCharger } = useChargerStore();

  const centerCurrentLocation = async () => {
    if (!mapRef) return;

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    mapRef.animateCamera({
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      zoom: 16,
      pitch: 0,
    });
  };

  const handleSearchAnother = () => {
    setSelectedCharger(null);
    setActiveRouting(false);

    enableMapModal(MapBottomSheetNames.MapStationSearch);
    centerCurrentLocation();
  };

  const handleStartScan = async () => {
    const granted = await ensurePermission();
    if (!granted) return;

    setIsScannerVisible(true);
  };

  if (hasArrived) {
    return (
      <>
        <VStack className="items-center gap-5">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <Icon as={CheckCircle} size="2xl" className="text-green-500" />
          </View>

          <VStack className="items-center gap-1">
            <Text size="xl" className="font-bold text-gray-900">
              Você chegou ao seu destino!
            </Text>
            <Text size="sm" className="text-center text-gray-500">
              Escaneie o QR Code do carregador para iniciar a sessão
            </Text>
          </VStack>

          <Button className="h-12 w-full rounded-2xl" onPress={handleStartScan}>
            <ButtonIcon as={QrCode} />
            <ButtonText>Escaneie o QR Code</ButtonText>
          </Button>

          <Button variant="link" onPress={handleSearchAnother}>
            <ButtonText className="text-typography-600">Buscar outro</ButtonText>
          </Button>
        </VStack>
        <QrCodeScannerModal
          isVisible={isScannerVisible}
          onClose={() => setIsScannerVisible(false)}
          onSuccessScanner={() => router.push('/(tabs)/charging')}
        />
      </>
    );
  }

  return (
    <VStack className="gap-5">
      <HStack className="items-center gap-3">
        <View className="h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/10">
          <Icon as={MapPin} size={'2xl'} className="stroke-2 text-primary-500" />
        </View>

        <View className="flex-1">
          <Text numberOfLines={1} size="lg" className="font-semibold text-gray-900">
            {selectedCharger?.name}
          </Text>

          <Text numberOfLines={1} size="sm" className="text-gray-500">
            {selectedCharger?.address?.street}
          </Text>
        </View>

        <VStack className="rounded-2xl bg-primary-500/10 px-4 py-2">
          <Text size="xs" className="text-primary-500">
            Tempo estimado
          </Text>
          <Text size="xl" className="font-bold tracking-tight text-primary-500">
            {selectedRoute && formatDuration(selectedRoute?.duration)}
          </Text>
          <Text size="xs" className="text-primary-500">
            {selectedRoute && formatDistance(selectedRoute?.distance)}
          </Text>
        </VStack>
      </HStack>
      <VStack className="gap-2">
        <Button className="h-12 w-full rounded-2xl" onPress={handleStartScan}>
          <ButtonIcon as={QrCode} />
          <ButtonText>Escaneie o QR Code</ButtonText>
        </Button>
        <Button variant="link" className="rounded-2xl" onPress={handleSearchAnother}>
          <ButtonText className="text-typography-600">Buscar outro</ButtonText>
        </Button>
      </VStack>
      <QrCodeScannerModal
        isVisible={isScannerVisible}
        onClose={() => setIsScannerVisible(false)}
        onSuccessScanner={() => router.push('/(tabs)/charging')}
      />
    </VStack>
  );
};
