import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import { VEHICLE_COLORS } from '@/types/vehicle/vehicle.type';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Pressable, ScrollView, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

export const RenderColorSelector = () => {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    name: 'color',
  });

  const animationFadeInRight = useFadeInAnimation({ direction: 'right', duration: 300 });
  const animationFadeInLeft = useFadeInAnimation({ direction: 'left', duration: 300 });

  const scrollRef = useRef<ScrollView>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const currentOffset = contentOffset.x;
    const contentWidth = contentSize.width;
    const layoutWidth = layoutMeasurement.width;

    setCanScrollLeft(currentOffset > 0);
    setCanScrollRight(currentOffset < contentWidth - layoutWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollTo({
      x: direction === 'left' ? 0 : 999,
      animated: true,
    });
  };

  return (
    <View className="relative flex-1">
      {canScrollLeft && (
        <Animated.View
          entering={animationFadeInRight}
          className="pointer-events-none absolute -left-4 bottom-0 top-0 z-10 justify-center pl-2"
        >
          <Pressable onPress={() => scroll('left')} className="pointer-events-auto">
            <ChevronLeft size={20} color="#1a7a4a" strokeWidth={2.5} />
          </Pressable>
        </Animated.View>
      )}

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="mx-4 flex-1"
        contentContainerClassName="gap-3"
      >
        {VEHICLE_COLORS.map((c) => {
          const selected = field.value === c.id;
          const isWhite = c.id === 'white';

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [
              {
                scale: withSpring(selected ? 0.9 : 1, {
                  damping: 8,
                  mass: 0.5,
                }),
              },
            ],
          }));

          return (
            <Animated.View key={c.id} style={animatedStyle}>
              <Pressable
                onPress={() => field.onChange(c.id)}
                className="h-7 w-7 rounded-full"
                style={{
                  backgroundColor: c.hex,
                  borderWidth: selected ? 2 : isWhite ? 1.5 : 0,
                  borderColor: '#e8e8e6',
                }}
              />
            </Animated.View>
          );
        })}
      </ScrollView>

      {canScrollRight && (
        <Animated.View
          entering={animationFadeInLeft}
          className="pointer-events-none absolute -right-4 bottom-0 top-0 z-10 justify-center pr-2"
        >
          <Pressable onPress={() => scroll('right')} className="pointer-events-auto">
            <ChevronRight size={20} color="#1a7a4a" strokeWidth={2.5} />
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
};
