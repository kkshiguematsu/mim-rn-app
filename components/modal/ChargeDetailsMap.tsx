import { Image } from '@/components/ui/image';
import React from 'react';

import { ConnectorList } from '@/components/shared/list/ConnectorList';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { usePressableScaleAnimation } from '@/hooks/animations/usePressableScaleAnimation';
import { useDeleteFavoriteCharger } from '@/hooks/api/favorite/useDeleteFavoriteCharger';
import { usePostFavoriteCharger } from '@/hooks/api/favorite/usePostFavoriteCharger';
import { useChargerStore } from '@/hooks/store/useChargerStore';
import { usePlatform } from '@/hooks/utils/usePlatform';
import { paymentMethodMap } from '@/utils/paymentCard';
import { ChevronLeftIcon, CreditCard, Heart, MapPin } from 'lucide-react-native';
import { Modal, Pressable, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const placeholderImage = require('@/assets/images/chargers/charger_image.jpg');

interface Props {
  isVisible: boolean;
  onClose?: () => void;
}

export const ChargeDetailsMap = ({ isVisible, onClose }: Props) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top;

  const { mutate: postFavoriteCharger } = usePostFavoriteCharger();
  const { mutate: deleteFavoriteCharger } = useDeleteFavoriteCharger();

  const { isAndroid } = usePlatform();
  const { selectedCharger, chargerFavorites } = useChargerStore();
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

  const handleCloseModal = () => {
    onClose?.();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleCloseModal}
    >
      <ScrollView
        className="flex-1 bg-neutral-200"
        contentContainerClassName="p-7 gap-5"
        contentContainerStyle={{ paddingTop: isAndroid ? paddingTop : paddingTop }}
        nestedScrollEnabled={true}
        scrollEventThrottle={16}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-start">
          <Pressable
            onPress={handleCloseModal}
            className={'h-5 w-5 items-center justify-center p-5'}
          >
            <Icon as={ChevronLeftIcon} size="2xl" className={'text-black'} />
          </Pressable>
        </View>

        <View className="h-56 overflow-hidden rounded-3xl">
          <Image
            alt="charger-image"
            source={placeholderImage}
            className="h-full w-full"
            resizeMode="cover"
          />
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
            <Icon as={Star} size="sm" className="fill-neutral-600 text-neutral-600" />
            <Text size="sm" className="font-medium text-neutral-600">
              4.8
            </Text>
          </HStack>
        </HStack> */}

        <ConnectorList connectors={selectedCharger.connectors} />

        <View className="mx-5 rounded-2xl bg-neutral-100 p-4">
          <HStack className="mb-2 items-center gap-2">
            <Icon as={MapPin} size="md" />
            <Text className="font-semibold">Endereço</Text>
          </HStack>

          <Text size="sm" className="text-neutral-600">
            {selectedCharger.address?.street}, {selectedCharger.address?.number}
          </Text>

          <Text size="sm" className="text-neutral-600">
            {selectedCharger.address?.city} - {selectedCharger.address?.state}
          </Text>
        </View>

        <View className="mx-5 rounded-2xl bg-neutral-100 p-4">
          <HStack className="mb-2 items-center gap-2">
            <Icon size="md" as={CreditCard} />
            <Text className="font-semibold">Pagamento</Text>
          </HStack>
          <HStack className="gap-2">
            {selectedCharger.acceptedPaymentMethods.map((method) => (
              <View key={method} className="rounded-full bg-neutral-200 px-3 py-1">
                <Text className="text-xs font-medium">{paymentMethodMap[method]}</Text>
              </View>
            ))}
          </HStack>
        </View>
      </ScrollView>
    </Modal>
  );
};
