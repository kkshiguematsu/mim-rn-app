import { Page } from '@/components/layout/page';
import { Icon } from '@/components/ui/icon';
import { useRotationAnimation } from '@/hooks/animations/useRotationAnimation';
import { Plus } from 'lucide-react-native';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

export default function VehiclePage() {
  const { animateRotation, animationStyle } = useRotationAnimation(180);

  const handleAddNewVehicle = () => {
    animateRotation();
  };

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
    </Page.Scroll>
  );
}
