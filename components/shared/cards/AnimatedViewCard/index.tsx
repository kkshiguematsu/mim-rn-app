import { useSlideIn } from '@/hooks/animations/useSlideIn';
import clsx from 'clsx';
import Animated from 'react-native-reanimated';

interface AnimatedViewCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const AnimatedSlideInViewCard = ({ children, className }: AnimatedViewCardProps) => {
  const SlideInUp = useSlideIn({ direction: 'down', duration: 800 });

  return (
    <Animated.View
      key="loginCard"
      entering={SlideInUp}
      className={clsx(['w-full rounded-3xl bg-neutral-200 p-7 dark:bg-zinc-800', className])}
    >
      {children}
    </Animated.View>
  );
};
