import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { useCharging } from '@/context/ChargingContext';
import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import { useRouter } from 'expo-router';
import { Zap } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const FloatingChargingView = () => {
  const { activeSession } = useCharging();
  const router = useRouter();
  const bottomTabBarHeight = useBottomMenuHeight();

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    router.push('/charging');
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const progress = activeSession ? (activeSession.batteryLevel / 100) * 100 : 0;

  if (!activeSession) return null;

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: 'absolute',
          bottom: bottomTabBarHeight + 100,
          left: 16,
          right: 16,
          zIndex: 9999,
          elevation: 20,
        },
      ]}
    >
      <Pressable onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Card className="overflow-hidden shadow-lg">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 flex-row items-center gap-3">
              <View className="rounded-full bg-primary-100 p-2.5 dark:bg-primary-900/30">
                <Icon as={Zap} className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </View>

              <View className="flex-1">
                <Text className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {activeSession.isCharging ? 'Carregando' : 'Pausado'}
                </Text>
                <Text className="text-xs text-neutral-500 dark:text-neutral-400">
                  {activeSession.batteryLevel}% • {activeSession.currentPower.toFixed(1)} kW
                </Text>
              </View>
            </View>

            <View className="items-end gap-1">
              <Text className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {Math.floor(activeSession.time.remaining)} min
              </Text>
            </View>
          </View>

          <Progress value={progress} className="my-2 h-2 w-full" size="xs">
            <ProgressFilledTrack className="bg-green-600" />
          </Progress>
        </Card>
      </Pressable>
    </Animated.View>
  );
};
