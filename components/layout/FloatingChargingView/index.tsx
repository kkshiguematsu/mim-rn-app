import { Ping } from '@/components/shared/ping';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useCharging } from '@/context/ChargingContext';
import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import { usePressableScaleAnimation } from '@/hooks/animations/usePressableScaleAnimation';
import { useRouter } from 'expo-router';
import { Zap } from 'lucide-react-native';
import { useEffect, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProgressShimmer = () => {
  const x = useSharedValue(-50);

  useEffect(() => {
    x.value = withRepeat(
      withSequence(
        withTiming(300, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
        withTiming(-50, { duration: 0 }),
        withTiming(-50, { duration: 600 })
      ),
      -1,
      false
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[{ position: 'absolute', top: 0, bottom: 0, width: 50 }, animStyle]}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.4)' }} />
    </Animated.View>
  );
};

export const FloatingChargingView = () => {
  const router = useRouter();
  const inset = useSafeAreaInsets();

  const { activeSession } = useCharging();
  const FadeInUp = useFadeInAnimation({ direction: 'up', duration: 300 });
  const { animatedStyle, pressInScale, pressOutScale } = usePressableScaleAnimation();

  const handlePress = () => {
    router.push('/charging');
  };

  const remainingMin = useMemo(() => {
    if (!activeSession) return null;

    return (activeSession.time.remaining / 60).toFixed(0);
  }, [activeSession?.time.remaining]);

  const batteryPct = activeSession ? (activeSession.batteryLevel / 100) * 100 : 0;

  if (!activeSession) return null;

  return (
    <Animated.View
      entering={FadeInUp}
      style={[
        animatedStyle,
        {
          position: 'absolute',
          bottom: inset.bottom + 85,
          left: 12,
          right: 12,
          zIndex: 9999,
          elevation: 20,
          shadowColor: '#1a7a4a',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.14,
          shadowRadius: 16,
          borderRadius: 18,
        },
      ]}
    >
      <Pressable onPress={handlePress} onPressIn={pressInScale} onPressOut={pressOutScale}>
        <View className="overflow-hidden rounded-3xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
          <View className="flex-row items-center gap-3 px-4 pb-3 pt-3">
            <Ping className="border-1 h-10 w-10 rounded-xl border border-green-500">
              <View className="border-1 flex h-10 w-10 items-center justify-center rounded-xl border border-green-500 bg-green-100/50">
                <Icon as={Zap} size="sm" className="text-green-600 dark:text-green-400" />
              </View>
            </Ping>

            <View className="flex-1 gap-1">
              <Text
                className="font-semibold text-neutral-900 dark:text-neutral-100"
                size="md"
                numberOfLines={1}
              >
                {activeSession.stationName ?? (activeSession.isCharging ? 'Carregando' : 'Pausado')}
              </Text>
              <Text size="xs" className="text-neutral-400 dark:text-neutral-500">
                {batteryPct.toFixed(0)}% &middot; R${' '}
                <Text size="xs" className="text-green-500">
                  {activeSession.cost.toFixed(2)}
                </Text>{' '}
                gastos
              </Text>
            </View>

            <View className="items-end">
              <Text size="xl" className="font-bold text-neutral-900 dark:text-neutral-100">
                {remainingMin}
              </Text>
              <Text size="sm" className="text-neutral-400">
                min rest
              </Text>
            </View>
          </View>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2.5,
              backgroundColor: '#f0f0ee',
            }}
          >
            <View
              style={{
                height: '100%',
                width: `${batteryPct}%`,
                backgroundColor: '#22a05f',
                borderBottomLeftRadius: 18,
                overflow: 'hidden',
              }}
            >
              {/* <ProgressShimmer /> */}
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};
