import { Card } from '@/components/ui/card';
import { usePressableScaleAnimation } from '@/hooks/animations/usePressableScaleAnimation';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { cardStyles } from '../StatusCard/styles';

interface Props {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
  onPress: () => void;
}

export const PressableCard = ({ children, size, padding, variant, className, onPress }: Props) => {
  const { animatedStyle, pressInScale, pressOutScale } = usePressableScaleAnimation();

  return (
    <Animated.View style={animatedStyle}>
      <Pressable onPress={onPress} onPressIn={pressInScale} onPressOut={pressOutScale}>
        <Card className={cardStyles({ size, variant, padding, class: className })}>{children}</Card>
      </Pressable>
    </Animated.View>
  );
};
