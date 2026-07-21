import { Image } from '@/components/ui/image';
import React, { useState } from 'react';

import { ChargeDetailsMap } from '@/components/modal/ChargeDetailsMap';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { usePressableScaleAnimation } from '@/hooks/animations/usePressableScaleAnimation';
import { useDeleteFavoriteCharger } from '@/hooks/api/favorite/useDeleteFavoriteCharger';
import { usePostFavoriteCharger } from '@/hooks/api/favorite/usePostFavoriteCharger';
import { useChargerStore } from '@/hooks/store/useChargerStore';
import { useLocationStore } from '@/hooks/store/useLocationStore';
import { useMapBottomSheetStore } from '@/hooks/store/useMapBottomSheetStore';
import { MapBottomSheetNames } from '@/types/bottomsheet/map/mapBottomSheetNames';
import { ChevronUp, Heart, Navigation2 } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

const placeholderImage = require('@/assets/images/chargers/charger_image.jpg');

export function MapStationDetailsSheet() {
  const [isVisibleDetailsModal, setIsVisibleDetailsModal] = useState(false);

  const { currentLocation } = useLocationStore();
  const { mapRef, setActiveRouting, enableMapModal } = useMapBottomSheetStore();
  const { mutate: postFavoriteCharger } = usePostFavoriteCharger();
  const { mutate: deleteFavoriteCharger } = useDeleteFavoriteCharger();
  const { selectedCharger, chargerFavorites, setSelectedCharger } = useChargerStore();
  const { animatedStyle, pressInScale, pressOutScale } = usePressableScaleAnimation({
    initialScale: 1,
    pressedScale: 0.65,
  });

  if (!selectedCharger) {
    return (
      <VStack className="gap-4 p-4">
        <Text className="text-center text-neutral-500">Nenhum carregador selecionado</Text>
      </VStack>
    );
  }
  const favorited = chargerFavorites.includes(selectedCharger._id);

  const handleFavoriteCharger = (chargerId: string) => {
    if (favorited) {
      deleteFavoriteCharger(chargerId);
      return;
    }
    postFavoriteCharger(chargerId);
  };

  const centerCurrentLocation = async () => {
    if (!mapRef) return;
    if (!currentLocation) return;

    mapRef.animateCamera({
      center: {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      },
      zoom: 16,
      pitch: 0,
    });
  };

  const handleStartNavigation = async () => {
    if (!mapRef) return;
    if (!currentLocation) return;

    mapRef.animateCamera({
      center: {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      },
      zoom: 16,
      pitch: 45,
    });

    enableMapModal(MapBottomSheetNames.MapStationRouting);
    setActiveRouting(true);
  };

  const handleSearchAnother = () => {
    setSelectedCharger(null);
    setActiveRouting(false);
    enableMapModal(MapBottomSheetNames.MapStationSearch);
    centerCurrentLocation();
  };

  const handleOpenDetails = () => {
    setIsVisibleDetailsModal(true);
  };

  return (
    <>
      <Pressable onPress={handleOpenDetails}>
        <View className="flex-1 gap-4">
          <View className="relative h-48 overflow-hidden rounded-3xl bg-neutral-200 dark:bg-neutral-700">
            <Image
              alt="charger-image"
              source={{
                uri: placeholderImage,
              }}
              className="h-full w-full"
              resizeMode="cover"
            />
            <View className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white">
              <Icon as={ChevronUp} size="xl" className="text-primary-700" />
            </View>
          </View>

          <HStack className="items-start justify-between px-5">
            <VStack className="flex-1">
              <Text className="text-2xl font-bold text-neutral-900 dark:text-white">
                {selectedCharger.name}
              </Text>

              <Text className="text-sm text-neutral-500">
                {selectedCharger.address?.street}, {selectedCharger.address?.number}
              </Text>
            </VStack>

            <Pressable
              onPress={() => handleFavoriteCharger(selectedCharger._id)}
              onPressIn={pressInScale}
              onPressOut={pressOutScale}
            >
              <Animated.View style={animatedStyle}>
                <Icon
                  as={Heart}
                  size="2xl"
                  className={favorited ? 'fill-red-500 text-red-500' : 'text-neutral-400'}
                />
              </Animated.View>
            </Pressable>
          </HStack>

          {/* <HStack className="mx-5 justify-end">
            <HStack className="items-center gap-1">
              <Icon as={Star} size="sm" className="fill-neutral-500 text-neutral-500" />
              <Text className="text-sm font-medium">4.8</Text>
            </HStack>
          </HStack> */}

          <Button className="h-12 rounded-2xl" onPress={handleStartNavigation}>
            <ButtonIcon as={Navigation2} className="fill-white" />
            <ButtonText>Confirmar</ButtonText>
          </Button>
          <Button variant="link" className="rounded-2xl" onPress={handleSearchAnother}>
            <ButtonText className="text-typography-600">Buscar outro</ButtonText>
          </Button>
        </View>
      </Pressable>
      <ChargeDetailsMap
        isVisible={isVisibleDetailsModal}
        onClose={() => setIsVisibleDetailsModal(false)}
      />
    </>
  );
}
