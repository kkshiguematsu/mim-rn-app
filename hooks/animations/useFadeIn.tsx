import { FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';

interface UseFadeInProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
}

export const useFadeIn = ({ direction = 'right', duration = 500 }: UseFadeInProps) => {
  switch (direction) {
    case 'left':
      return FadeInLeft.duration(duration).springify();
    case 'right':
      return FadeInRight.duration(duration).springify();
    case 'up':
      return FadeInUp.duration(duration).springify();
    case 'down':
      return FadeInDown.duration(duration).springify();
    default:
      return FadeInRight.duration(duration).springify();
  }
};
