import { Text } from '@/components/ui/text';
import React, { useCallback, useRef } from 'react';

import { Page } from '@/components/layout/page';
import { Section } from '@/components/section/Section';
import { MenuCard } from '@/components/shared/cards/MenuCard';
import { VehicleListRow } from '@/components/shared/cards/MenuCard/VehicleListRow';
import { VehicleHeroCard } from '@/components/shared/cards/VehicleHeroCard';
import { Icon } from '@/components/ui/icon';
import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import { useRotationAnimation } from '@/hooks/animations/useRotationAnimation';
import { useVehicleStore } from '@/hooks/store/useVehicleStore';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { Car, Plus } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function VehiclePage() {
  const router = useRouter();
  const { vehicles, activeVehicle, setActiveVehicle, addVehicle, removeVehicle, updateVehicle } =
    useVehicleStore();

  const sheetRef = useRef<BottomSheet>(null);
  const { animateRotation, animationStyle } = useRotationAnimation(180);
  const animationFadeIn = useFadeInAnimation({
    direction: 'down',
    duration: 300,
  });

  const handleAddNewVehicle = () => {
    animateRotation();
    router.push('/(tabs)/user/vehicle/createVehicle');
  };

  const handleEditVehicle = () => {};

  const handleSelectVehicle = useCallback(
    (id: string) => {
      setActiveVehicle(id);
    },
    [setActiveVehicle]
  );

  const openSheet = useCallback(() => {
    sheetRef.current?.expand();
  }, []);

  return (
    <Page.Scroll needsPadding={false} hasHeader={false}>
      <Page.Header
        hasBackButton
        title="Veículos"
        rightAction={
          <Pressable onPress={handleAddNewVehicle}>
            <Animated.View
              style={animationStyle}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 shadow"
            >
              <Icon as={Plus} size="2xl" className="text-white" />
            </Animated.View>
          </Pressable>
        }
      />

      <View className="px-7">
        <Section title="em uso agora">
          {activeVehicle ? (
            <VehicleHeroCard vehicle={activeVehicle} onEditPress={handleEditVehicle} />
          ) : (
            <Animated.View
              entering={animationFadeIn}
              className="items-center gap-3 rounded-2xl border border-dashed border-neutral-300 bg-white p-8 dark:bg-neutral-800"
            >
              <Car size={36} color="#d8d8d5" />
              <Text size="lg" className="text-center font-medium text-neutral-400">
                Nenhum veículo ativo.{'\n'}Adicione seu primeiro carro!
              </Text>
            </Animated.View>
          )}
        </Section>

        <Section
          title="Outros veículos"
          rightContent={
            <Text
              size="xs"
              className="px-1 font-semibold uppercase tracking-wider text-neutral-400"
            >
              {vehicles.length} cadastrados
            </Text>
          }
        >
          <MenuCard>
            {vehicles.map((vehicle, index) => (
              <VehicleListRow
                index={index}
                key={vehicle.id}
                vehicle={vehicle}
                selectedVehicleId={activeVehicle?.id}
                onSelect={() => handleSelectVehicle(vehicle.id)}
                onMorePress={() => {}}
              />
            ))}
          </MenuCard>
        </Section>
      </View>
    </Page.Scroll>
  );
}
