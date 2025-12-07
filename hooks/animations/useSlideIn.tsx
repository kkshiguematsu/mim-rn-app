import { SlideInDown, SlideInLeft, SlideInRight, SlideInUp } from 'react-native-reanimated';

interface UseSlideInProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
}

export const useSlideIn = ({ direction = 'right', duration = 500 }: UseSlideInProps) => {
  switch (direction) {
    case 'left':
      return SlideInLeft.duration(duration).springify();
    case 'right':
      return SlideInRight.duration(duration).springify();
    case 'up':
      return SlideInUp.duration(duration).springify();
    case 'down':
      return SlideInDown.duration(duration).springify();
    default:
      return SlideInRight.duration(duration).springify();
  }
};
