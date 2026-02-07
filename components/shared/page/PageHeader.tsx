import { Heading } from '@/components/ui/heading';
import { useTheme } from '@/context/themeContext';
import React, { useRef } from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_HEIGHT = 60;
const TITLE_START_POSITION = 20;

interface Props {
  title: string;
  children: React.ReactNode;
}

export const PageHeader = ({ title, children }: Props) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const { isDark } = useTheme();

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, TITLE_START_POSITION + HEADER_HEIGHT],
    outputRange: [0, -(TITLE_START_POSITION + HEADER_HEIGHT - insets.top - 15)],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, TITLE_START_POSITION + HEADER_HEIGHT],
    outputRange: [1, 0.6],
    extrapolate: 'clamp',
  });

  const headerBackgroundOpacity = scrollY.interpolate({
    inputRange: [
      0,
      TITLE_START_POSITION + HEADER_HEIGHT - 20,
      TITLE_START_POSITION + HEADER_HEIGHT,
    ],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View className="flex-1">
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          paddingTop: insets.top,
          height: HEADER_HEIGHT + insets.top,
          backgroundColor: isDark ? '#000' : '#fff',
          borderBottomWidth: 1,
          borderBottomColor: isDark ? '#1c1c1e' : '#e5e5e5',
          opacity: headerBackgroundOpacity,
        }}
      />

      <Animated.View
        style={{
          position: 'absolute',
          top: insets.top + TITLE_START_POSITION,
          left: 16,
          right: 16,
          zIndex: 1000,
          transform: [{ translateY: titleTranslateY }, { scale: titleScale }],
        }}
      >
        <Heading size="4xl">{title}</Heading>
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: insets.top + TITLE_START_POSITION + 80,
          paddingHorizontal: 16,
          gap: 16,
        }}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
};
