import { Card, ICardProps } from '@/components/ui/card';
import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import Animated from 'react-native-reanimated';
import { cardStyles } from '../StatusCard/styles';
interface DefaultCardProps extends ICardProps {
  children?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  fadeIn?: 'left' | 'right' | 'up' | 'down';
  className?: string;
}

export const DefaultCard = (props: DefaultCardProps) => {
  const { children, size, variant, padding, fadeIn, className } = props;
  const fadeInAnimation = useFadeInAnimation(fadeIn ? { direction: fadeIn } : {});

  const CardContent = (
    <Card {...props} className={cardStyles({ size, padding, class: className })}>
      {children}
    </Card>
  );

  if (fadeInAnimation)
    return <Animated.View entering={fadeInAnimation}>{CardContent}</Animated.View>;

  return CardContent;
};
