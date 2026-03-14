import clsx from 'clsx';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { PingDot } from '../PinDot';

const SEGMENT_STAGGER = 80;
const SEGMENT_DURATION = 500;
const FILLED_COLOR = '#22a05f';
const LAST_COLOR = '#3ddb82';
const EMPTY_COLOR = 'rgba(255,255,255,0.12)';

interface SegmentProps {
  index: number;
  isFilled: boolean;
  isLast: boolean;
}

export const SegmentBar = ({ index, isFilled, isLast }: SegmentProps) => {
  const opacity = useSharedValue(isFilled ? 0 : 1);
  const scaleX = useSharedValue(isFilled ? 0.2 : 1);

  useEffect(() => {
    if (!isFilled) return;

    const delay = index * SEGMENT_STAGGER;

    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: SEGMENT_DURATION, easing: Easing.out(Easing.ease) })
    );

    scaleX.value = withDelay(
      delay,
      withTiming(1, {
        duration: SEGMENT_DURATION,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: (scaleX.value - 1) * 0.5 * 100 }, { scaleX: scaleX.value }],
  }));

  return (
    <View className="relative h-1 flex-1">
      <View className="h-1 flex-1 overflow-hidden rounded-full">
        <Animated.View
          className={clsx(
            'h-1 flex-1',
            isFilled ? (isLast ? 'bg-green-400' : 'bg-green-600') : 'bg-white/10'
          )}
          style={animStyle}
        />
      </View>

      {isLast && <PingDot color={LAST_COLOR} />}
    </View>
  );
};
