import { useSlideInAnimation } from '@/hooks/animations/useSlideInAnimation';
import { useSlideOutAnimation } from '@/hooks/animations/useSlideOutAnimation';
import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import clsx from 'clsx';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AnimatedViewCardProps {
  children?: React.ReactNode;
  className?: string;
  hasBottomMenu?: boolean;
  hasInsertBottom?: boolean;
}

export const AnimatedSlideInViewCard = ({
  children,
  className,
  hasBottomMenu = false,
  hasInsertBottom = false,
}: AnimatedViewCardProps) => {
  const insert = useSafeAreaInsets();
  const bottomMenuHeight = useBottomMenuHeight();
  const SlideInUp = useSlideInAnimation({ direction: 'down', duration: 800 });
  const SlideOutUp = useSlideOutAnimation({ direction: 'down', duration: 800 });

  let paddingBottom = hasBottomMenu ? bottomMenuHeight : 0;
  paddingBottom += hasInsertBottom ? insert.bottom : 0;

  return (
    <Animated.View
      key="loginCard"
      entering={SlideInUp}
      exiting={SlideOutUp}
      style={{ paddingBottom: paddingBottom }}
      className={clsx(['w-full rounded-3xl bg-neutral-200 p-7 dark:bg-zinc-800', className])}
    >
      {children}
    </Animated.View>
  );
};
