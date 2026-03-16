import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { TailwindColor } from '../../icon/TintedIcon/styles';
import { badgeContainerStyles, badgeDotStyles, badgeTextStyles } from './styles';

interface Props {
  label: string;
  color?: TailwindColor;
  icon?: React.ElementType;
  size?: 'xs' | 'sm' | 'md';
  animated?: boolean;
  className?: string;
}

export const TintedBadge = ({
  label,
  icon,
  color = 'neutral',
  size = 'xs',
  animated = false,
  className,
}: Props) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (!animated) return;
    opacity.value = withRepeat(
      withSequence(withTiming(0.3, { duration: 900 }), withTiming(1, { duration: 900 })),
      -1,
      false
    );
  }, [animated]);

  const dotAnimatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View className={badgeContainerStyles({ color, class: className })}>
      {animated && <Animated.View style={dotAnimatedStyle} className={badgeDotStyles({ color })} />}
      {icon && <Icon as={icon} size={size} className={badgeTextStyles({ color })} />}
      <Text size={size} className={badgeTextStyles({ color })}>
        {label}
      </Text>
    </View>
  );
};
