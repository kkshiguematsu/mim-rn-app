import { Text } from '@/components/ui/text';
import { useTheme } from '@/context/themeContext';
import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export const TabItem = ({ label, isActive, onPress }: Props) => {
  const progress = useSharedValue(isActive ? 1 : 0);
  const { isDark } = useTheme();

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, { duration: 200 });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      isDark ? ['transparent', '#d4d4d4'] : ['transparent', '#ffffff']
    ),
    shadowOpacity: progress.value * 0.12,
  }));

  return (
    <Pressable onPress={onPress} className="flex-1">
      <Animated.View
        style={[
          animatedStyle,
          {
            shadowColor: '#000',
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 1 },
            elevation: isActive ? 2 : 0,
          },
        ]}
        className="bg-neutral- items-center rounded-[7px] px-3 py-1.5"
      >
        <Text
          size="sm"
          className={`font-medium ${isActive ? 'text-neutral-900' : 'text-neutral-500 dark:text-neutral-400'}`}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};
