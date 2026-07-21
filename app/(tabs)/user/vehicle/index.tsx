import { Text } from '@/components/ui/text';
import React, { useCallback } from 'react';

import { Page } from '@/components/layout/page';
import { Section } from '@/components/section/Section';
import { MenuCard } from '@/components/shared/cards/MenuCard';
import { VehicleListRow } from '@/components/shared/cards/MenuCard/VehicleListRow';
import { SkeletonVehicleListRow } from '@/components/shared/cards/MenuCard/VehicleListRow/SkeletonVehicleListRow';
import { VehicleHeroCard } from '@/components/shared/cards/VehicleHeroCard';
import { Icon } from '@/components/ui/icon';
import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import useGetVehicle from '@/hooks/api/vehicle/useGetVehicle';
import { useVehicleStore } from '@/hooks/store/useVehicleStore';
import { useRouter } from 'expo-router';
import { Car, Plus } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function VehiclePage() {
  const router = useRouter();
  const { activeVehicle, setActiveVehicle } = useVehicleStore();
  const { vehicles, isLoading } = useGetVehicle();

  const animationFadeIn = useFadeInAnimation({
    direction: 'down',
    duration: 300,
  });

  const handleAddNewVehicle = () => {
    router.push('/(tabs)/user/vehicle/createVehicle');
  };

  const handleEditVehicle = () => {};

  const handleSelectVehicle = useCallback(
    (id: string) => {
      setActiveVehicle(id);
    },
    [setActiveVehicle]
  );

  return (
    <Page.Scroll needsPadding={false} hasHeader={false}>
      <Page.Header
        hasBackButton
        title="Veículos"
        rightAction={
          <Pressable onPress={handleAddNewVehicle}>
            <Animated.View className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 shadow">
              <Icon as={Plus} size="2xl" className="text-white" />
            </Animated.View>
          </Pressable>
        }
      />

      <View className="gap-4 px-7">
        {activeVehicle ? (
          <VehicleHeroCard vehicle={activeVehicle.vehicle} onEditPress={handleEditVehicle} />
        ) : (
          <Section title="em uso agora">
            <Animated.View
              entering={animationFadeIn}
              className="items-center gap-3 rounded-2xl border border-dashed border-neutral-300 bg-white p-8 dark:bg-neutral-800"
            >
              <Car size={36} color="#d8d8d5" />
              <Text size="lg" className="text-center font-medium text-neutral-400">
                Nenhum veículo ativo.{'\n'}Adicione seu primeiro carro!
              </Text>
            </Animated.View>
          </Section>
        )}

        {vehicles && vehicles.length > 0 ? (
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
              {isLoading ? (
                <>
                  <SkeletonVehicleListRow selected />
                  <SkeletonVehicleListRow />
                  <SkeletonVehicleListRow />
                  <SkeletonVehicleListRow />
                </>
              ) : (
                vehicles.map((item, index) => (
                  <VehicleListRow
                    index={index}
                    key={item.vehicle._id}
                    userVehicle={item}
                    selectedVehicleId={activeVehicle?.vehicle._id}
                    onSelect={() => handleSelectVehicle(item.vehicle._id)}
                  />
                ))
              )}
            </MenuCard>
          </Section>
        ) : (
          <View className="flex items-center p-5">
            <Text size="lg" className="text-center font-medium text-neutral-400">
              Nenhum veículo cadastrado.{'\n'}Adicione seu primeiro carro!
            </Text>
          </View>
        )}
      </View>
    </Page.Scroll>
  );
}
