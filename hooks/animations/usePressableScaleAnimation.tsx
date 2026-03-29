import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface Props {
  initialScale?: number;
  pressedScale?: number;
}

export const usePressableScaleAnimation = ({
  initialScale = 1,
  pressedScale = 0.95,
}: Props = {}) => {
  const scale = useSharedValue(initialScale);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pressInScale = () => {
    scale.value = withSpring(pressedScale);
  };

  const pressOutScale = () => {
    scale.value = withSpring(initialScale);
  };

  return {
    animatedStyle,
    pressInScale,
    pressOutScale,
  };
};
