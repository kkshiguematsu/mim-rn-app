import { useFadeInAnimation } from './useFadeInAnimation';
import { useSlideInAnimation } from './useSlideInAnimation';

type Props = {
  type?: 'fade' | 'slide';
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  delayBetween?: number;
};

export const useStaggeredEntering = ({
  type = 'fade',
  direction = 'up',
  duration = 500,
  delayBetween = 300,
}: Props) => {
  const getEntering = (index: number) => {
    const animation =
      type === 'fade'
        ? useFadeInAnimation({ direction, duration })
        : useSlideInAnimation({ direction, duration });

    return animation.delay(index * delayBetween);
  };

  return { getEntering };
};
