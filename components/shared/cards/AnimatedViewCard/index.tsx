import { useSlideIn } from '@/hooks/animations/useSlideIn';
import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import clsx from 'clsx';
import Animated from 'react-native-reanimated';

interface AnimatedViewCardProps {
  children?: React.ReactNode;
  className?: string;
  hasBottomMenu?: boolean;
}

export const AnimatedSlideInViewCard = ({
  children,
  className,
  hasBottomMenu = false,
}: AnimatedViewCardProps) => {
  const SlideInUp = useSlideIn({ direction: 'down', duration: 800 });
  const bottomMenuHeight = useBottomMenuHeight();

  const paddingBottom = hasBottomMenu ? bottomMenuHeight : 0;

  return (
    <Animated.View
      key="loginCard"
      entering={SlideInUp}
      style={{ paddingBottom: paddingBottom }}
      className={clsx(['w-full rounded-3xl bg-neutral-200 p-7 dark:bg-zinc-800', className])}
    >
      {children}
    </Animated.View>
  );
};
