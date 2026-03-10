import { usePingAnimation } from '@/hooks/animations/usePingAnimation';
import clsx from 'clsx';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

interface Props {
  children: React.ReactNode;
  className: string;
}

export const Ping = ({ children, className }: Props) => {
  const { pingAnimationStyle } = usePingAnimation();

  return (
    <View className="relative">
      <Animated.View
        pointerEvents="none"
        className={clsx('absolute', className)}
        style={pingAnimationStyle}
      />

      {children}
    </View>
  );
};
