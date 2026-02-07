import { Card } from '@/components/ui/card';
import { useFadeIn } from '@/hooks/animations/useFadeIn';
import Animated from 'react-native-reanimated';
import { cardStyles } from '../StatusCard/styles';
interface DefaultCardProps {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'outlined';
  fadeIn?: 'left' | 'right' | 'up' | 'down';
  className?: string;
}

export const DefaultCard = ({
  children,
  size = 'md',
  padding = 'md',
  variant = 'default',
  fadeIn,
  className,
}: DefaultCardProps) => {
  const fadeInAnimation = useFadeIn(fadeIn ? { direction: fadeIn } : {});

  const CardContent = (
    <Card className={cardStyles({ size, variant, padding, class: className })}>{children}</Card>
  );

  if (fadeInAnimation)
    return <Animated.View entering={fadeInAnimation}>{CardContent}</Animated.View>;

  return CardContent;
};
