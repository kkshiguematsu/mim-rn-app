import { DefaultCard } from '@/components/shared/cards/DefaultCard';
import { TintedIcon } from '@/components/shared/icon/TintedIcon';
import { Text } from '@/components/ui/text';
import { usePressableScaleAnimation } from '@/hooks/animations/usePressableScaleAnimation';
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
      <TintedIcon icon={icon} color={color} size="lg" />
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
