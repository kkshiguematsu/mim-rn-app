import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useCharging } from '@/context/ChargingContext';
import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import { usePingAnimation } from '@/hooks/animations/usePingAnimation';
import { usePressableScaleAnimation } from '@/hooks/animations/usePressableScaleAnimation';
import { useRouter } from 'expo-router';
import { Zap } from 'lucide-react-native';
import { useEffect } from 'react';
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
  const { pingAnimationStyle } = usePingAnimation({ maxScale: 1.9, duration: 2000, pause: 600 });

  const handlePress = () => {
    router.push('/charging');
  };

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
        <View
          style={{
            borderRadius: 18,
            backgroundColor: '#ffffff',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.07)',
            overflow: 'hidden',
          }}
        >
          <View className="flex-row items-center gap-3 px-4 pb-3 pt-3">
            <View style={{ position: 'relative', flexShrink: 0 }}>
              <Animated.View
                pointerEvents="none"
                style={[
                  {
                    position: 'absolute',
                    inset: -3,
                    borderRadius: 13,
                    borderWidth: 1.5,
                    borderColor: '#b8e8cc',
                  },
                  pingAnimationStyle,
                ]}
              />

              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: '#f0faf4',
                  borderWidth: 1,
                  borderColor: '#c8ead8',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon as={Zap} size="sm" className="text-primary-600 dark:text-primary-400" />
              </View>
            </View>

            {/* station + meta */}
            <View className="flex-1" style={{ gap: 2 }}>
              <Text
                className="font-semibold text-neutral-900 dark:text-neutral-100"
                style={{ fontSize: 13, letterSpacing: -0.2 }}
                numberOfLines={1}
              >
                {activeSession.stationName ?? (activeSession.isCharging ? 'Carregando' : 'Pausado')}
              </Text>
              <Text className="text-neutral-400 dark:text-neutral-500" style={{ fontSize: 11 }}>
                {batteryPct}% &middot; {activeSession.currentPower.toFixed(0)} kW
              </Text>
            </View>

            {/* time remaining */}
            <View className="items-end" style={{ gap: 1 }}>
              <Text
                className="font-bold text-neutral-900 dark:text-neutral-100"
                style={{ fontSize: 20, letterSpacing: -1, lineHeight: 22 }}
              >
                {activeSession.time.remaining}
              </Text>
              <Text className="text-neutral-400" style={{ fontSize: 10 }}>
                min rest.
              </Text>
            </View>
          </View>

          {/* ── bottom progress bar hugging card ── */}
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
