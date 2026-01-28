import { Icon } from '@/components/ui/icon';
import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export const TabButton = ({ isFocused, onPress, onLongPress, icon, label }: any) => {
  const scale = useSharedValue(isFocused ? 1 : 0.85);
  const opacity = useSharedValue(isFocused ? 1 : 0.5);
  const bgOpacity = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0.85, { damping: 15 });
    opacity.value = withSpring(isFocused ? 1 : 0.5);
    bgOpacity.value = withSpring(isFocused ? 1 : 0);
  }, [isFocused]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const bgAnimatedStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value,
  }));

  return (
    <Pressable
      className="flex flex-grow items-center justify-center rounded-full"
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View className="relative rounded-full p-4">
        <Animated.View
          className="absolute inset-0 rounded-full bg-neutral-200/30"
          style={bgAnimatedStyle}
        />
        <Animated.View style={iconAnimatedStyle}>
          <Icon className="text-white" as={icon} size="xl" />
        </Animated.View>
      </View>
    </Pressable>
  );
};
