import { SlideOutDown, SlideOutLeft, SlideOutRight, SlideOutUp } from 'react-native-reanimated';

interface UseSlideOutProps {
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
}

export const useSlideOutAnimation = ({ direction = 'right', duration = 500 }: UseSlideOutProps) => {
  switch (direction) {
    case 'left':
      return SlideOutLeft.duration(duration).springify();
    case 'right':
      return SlideOutRight.duration(duration).springify();
    case 'up':
      return SlideOutUp.duration(duration).springify();
    case 'down':
      return SlideOutDown.duration(duration).springify();
    default:
      return SlideOutRight.duration(duration).springify();
  }
};
