import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const STAGGER = 80;
const DURATION = 500;

interface SegmentBarProps {
  index: number;
  isFilled: boolean;
  isLast: boolean;
  filledColor?: string;
  lastColor?: string;
}

export const SegmentBar = ({
  index,
  isFilled,
  isLast,
  filledColor = '#22a05f',
  lastColor = '#3ddb82',
}: SegmentBarProps) => {
  const opacity = useSharedValue(isFilled ? 0 : 1);
  const scaleX = useSharedValue(isFilled ? 0.2 : 1);

  useEffect(() => {
    if (!isFilled) return;
    const delay = index * STAGGER;
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: DURATION, easing: Easing.out(Easing.ease) })
    );
    scaleX.value = withDelay(
      delay,
      withTiming(1, { duration: DURATION, easing: Easing.out(Easing.cubic) })
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scaleX: scaleX.value }],
  }));

  const bgColor = isFilled ? (isLast ? lastColor : filledColor) : 'rgba(255,255,255,0.1)';

  return (
    <View className="h-1 flex-1 overflow-hidden rounded-full">
      <Animated.View style={[animStyle, { backgroundColor: bgColor, height: 4, flex: 1 }]} />
    </View>
  );
};
