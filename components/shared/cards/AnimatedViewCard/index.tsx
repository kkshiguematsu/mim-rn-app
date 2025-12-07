import { useSlideIn } from '@/hooks/animations/useSlideIn';
import Animated from 'react-native-reanimated';

interface AnimatedViewCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const AnimatedSlideInViewCard = ({ children }: AnimatedViewCardProps) => {
  const SlideInUp = useSlideIn({ direction: 'down', duration: 800 });

  return (
    <Animated.View
      key="loginCard"
      entering={SlideInUp}
      className="w-full rounded-3xl bg-neutral-200 p-7 pb-24 dark:bg-zinc-800"
    >
      {children}
    </Animated.View>
  );
};
