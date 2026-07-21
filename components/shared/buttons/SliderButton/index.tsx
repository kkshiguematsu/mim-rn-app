import { Text } from '@/components/ui/text';
import { ChevronRight } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { StyleSheet, Vibration, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SLIDER_HEIGHT = 60;
const HANDLE_SIZE = 52;
const HANDLE_MARGIN = 4;

interface SliderButtonProps {
  onComplete: () => void;
  label?: string;
  completedLabel?: string;
  trackColor?: string;
  handleColor?: string;
  iconColor?: string;
  width?: number;
}

export const SliderButton = ({
  onComplete,
  label = 'Deslize para confirmar',
  completedLabel = 'Confirmado!',
  trackColor = '#3B82F6',
  handleColor = '#FFFFFF',
  iconColor = '#3B82F6',
  width = 300,
}: SliderButtonProps) => {
  const offset = useSharedValue(0);
  const isCompleted = useSharedValue(false);
  const startPosition = useSharedValue(0);

  const MAX_SLIDE = width - HANDLE_SIZE - HANDLE_MARGIN * 2;
  const THRESHOLD = MAX_SLIDE * 0.9;

  const handleComplete = () => {
    Vibration.vibrate(50);
    onComplete();
  };

  const pan = Gesture.Pan()
    .onStart(() => {
      startPosition.value = offset.value;
    })
    .onUpdate((event) => {
      if (isCompleted.value) return;

      const newOffset = startPosition.value + event.translationX;

      offset.value = Math.max(0, Math.min(MAX_SLIDE, newOffset));
    })
    .onEnd(() => {
      if (offset.value >= THRESHOLD) {
        offset.value = withSpring(MAX_SLIDE, { damping: 20 });
        isCompleted.value = true;
        runOnJS(handleComplete)();
      } else {
        offset.value = withSpring(0, { damping: 15 });
      }
    });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isCompleted.value) {
        offset.value = withSpring(0);
        isCompleted.value = false;
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const trackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(offset.value, [0, MAX_SLIDE], [trackColor, '#10B981']);

    return {
      backgroundColor,
    };
  });

  const handleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value },
        {
          scale: interpolate(offset.value, [0, MAX_SLIDE], [1, 1.1], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const opacity = interpolate(offset.value, [0, MAX_SLIDE * 0.3], [1, 0], Extrapolate.CLAMP);

    return { opacity };
  });

  const completedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      offset.value,
      [MAX_SLIDE * 0.7, MAX_SLIDE],
      [0, 1],
      Extrapolate.CLAMP
    );

    return { opacity };
  });

  return (
    <View style={[styles.container, { width }]}>
      <Animated.View style={[styles.track, trackStyle, { height: SLIDER_HEIGHT }]}>
        <Animated.View style={[styles.labelContainer, textStyle]}>
          <Text className="font-semibold text-white">{label}</Text>
        </Animated.View>

        <Animated.View style={[styles.labelContainer, completedTextStyle]}>
          <Text className="font-semibold text-white">{completedLabel}</Text>
        </Animated.View>

        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.handle, handleStyle, { backgroundColor: handleColor }]}>
            <View>
              <ChevronRight size={24} color={iconColor} strokeWidth={3} />
            </View>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    width: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    padding: HANDLE_MARGIN,
    overflow: 'hidden',
  },
  handle: {
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    borderRadius: HANDLE_SIZE / 2,
    position: 'absolute',
    left: HANDLE_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  labelContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
