import { FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';

interface UseFadeInProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
}

export const useFadeInAnimation = ({ direction = 'right', duration = 500 }: UseFadeInProps) => {
  if (!direction) return undefined;

  switch (direction) {
    case 'left':
      return FadeInLeft.duration(duration);
    case 'right':
      return FadeInRight.duration(duration);
    case 'up':
      return FadeInUp.duration(duration);
    case 'down':
      return FadeInDown.duration(duration);
    default:
      return FadeInRight.duration(duration);
  }
};
