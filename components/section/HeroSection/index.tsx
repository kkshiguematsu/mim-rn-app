import { ArcsBackground } from '@/components/layout/background/ArcsBackground';
import { NotificationButton } from '@/components/shared/buttons/NotificationButton';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useMapBottomSheetStore } from '@/hooks/store/useMapBottomSheetStore';
import { usePlatform } from '@/hooks/utils/usePlatform';
import { MapBottomSheetNames } from '@/types/bottomsheet/map/mapBottomSheetNames';
import clsx from 'clsx';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  style?: ViewStyle;
}

export const HeroSection = ({ style }: Props) => {
  const router = useRouter();

  const { isAndroid } = usePlatform();
  const { enableMapModal } = useMapBottomSheetStore();

  const handleOpenMap = () => {
    router.push('/(maps)/map');
    enableMapModal(MapBottomSheetNames.MapStationSearch);
  };

  return (
    <View
      style={style}
      className={clsx(
        'relative -mx-7 gap-4 rounded-b-3xl bg-neutral-100 p-7 dark:bg-neutral-800',
        isAndroid ? '' : '-mt-7'
      )}
    >
      <ArcsBackground />

      <BlurView
        intensity={100}
        tint="light"
        style={StyleSheet.absoluteFillObject}
        className="overflow-hidden rounded-b-3xl"
      />

      <View className="i flex-row justify-between">
        <View>
          <Heading size="2xl">Pronto para</Heading>
          <Heading size="2xl">
            a próxima{' '}
            <Text size="3xl" className="text-primary-600">
              carga?
            </Text>
          </Heading>
        </View>

        <NotificationButton />
      </View>

      {/* <HeroCard {...heroCardMock} /> */}

      <Pressable onPress={handleOpenMap}>
        {({ pressed }) => (
          <View
            className={clsx(
              'flex-row items-center gap-2 rounded-full border border-neutral-200 bg-neutral-200 px-4 py-2',
              pressed && 'opacity-75'
            )}
          >
            <Icon as={Search} className="text-typography-600" size="lg" />
            <Text className="text-typography-600" size="xl">
              Buscar um carregador
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};
