import { DefaultCard } from '@/components/shared/cards/DefaultCard';
import {
  iconColorStyles,
  iconContainerColorStyles,
} from '@/components/shared/cards/StatusCard/styles';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { usePressableScaleAnimation } from '@/hooks/animations/usePressableScaleAnimation';
import clsx from 'clsx';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

export interface CardSliderItemProps {
  title: string;
  icon: React.ElementType;
  color?:
    | 'primary'
    | 'blue'
    | 'green'
    | 'purple'
    | 'orange'
    | 'red'
    | 'yellow'
    | 'pink'
    | 'indigo'
    | 'cyan';
  onPress?: () => void;
}

export const CardSliderItem = ({ title, icon, color, onPress }: CardSliderItemProps) => {
  const { animatedStyle, pressInScale, pressOutScale } = usePressableScaleAnimation();

  const cardContent = (
    <DefaultCard className="flex w-28 items-center justify-center gap-1">
      <View
        className={clsx(
          iconContainerColorStyles({ color: color }),
          'flex h-12 w-12 items-center justify-center rounded-lg'
        )}
      >
        <Icon size="xl" as={icon} className={clsx(iconColorStyles({ color: color }))} />
      </View>
      <View>
        <Text size="xs">{title}</Text>
      </View>
    </DefaultCard>
  );

  if (onPress) {
    return (
      <Animated.View style={animatedStyle}>
        <Pressable onPress={onPress} onPressIn={pressInScale} onPressOut={pressOutScale}>
          {cardContent}
        </Pressable>
      </Animated.View>
    );
  }
  return cardContent;
};
