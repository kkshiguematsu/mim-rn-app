import { Page } from '@/components/layout/page';
import { Section } from '@/components/section/Section';
import { VehicleHeroCard } from '@/components/shared/cards/VehicleHeroCard';
import { Icon } from '@/components/ui/icon';
import { useRotationAnimation } from '@/hooks/animations/useRotationAnimation';
import { useAppStore } from '@/store';
import { Plus } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function VehiclePage() {
  const activeVehicle = useAppStore((state) =>
    state.vehicles.find((vehicle) => vehicle.id === state.activeVehicleId)
  );
  const { animateRotation, animationStyle } = useRotationAnimation(180);

  const handleAddNewVehicle = () => {
    animateRotation();
  };

  const handleEditVehicle = () => {};

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
          {activeVehicle && (
            <VehicleHeroCard vehicle={activeVehicle} onEditPress={handleEditVehicle} />
          )}
        </Section>
      </View>
    </Page.Scroll>
  );
}
