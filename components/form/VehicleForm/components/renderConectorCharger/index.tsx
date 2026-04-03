import { Text } from '@/components/ui/text';
import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import { CONNECTOR_OPTIONS } from '@/types/vehicle/vehicle.type';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { connectorButtonStyles, connectorTextStyles } from './styles';

export const RenderConnectionsComponent = ({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value: string) => void;
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const animationFadeInRight = useFadeInAnimation({ direction: 'right', duration: 300 });
  const animationFadeInLeft = useFadeInAnimation({ direction: 'left', duration: 300 });

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
          className="pointer-events-none absolute -left-4 bottom-0 top-0 z-10 justify-center pl-1"
        >
          <Pressable onPress={() => scroll('left')} className="pointer-events-auto">
            <ChevronLeft size={18} color="#1a7a4a" strokeWidth={2.5} />
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
        contentContainerClassName="gap-2 pt-2 pb-3 "
      >
        {CONNECTOR_OPTIONS.map((type) => {
          const selected = value === type;

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
            <Animated.View key={type} style={animatedStyle} className="flex-1">
              <Pressable
                onPress={() => onChange(type)}
                className={connectorButtonStyles({ selected })}
              >
                <Text className={connectorTextStyles({ selected })}>{type}</Text>
              </Pressable>
            </Animated.View>
          );
        })}
      </ScrollView>

      {canScrollRight && (
        <Animated.View
          entering={animationFadeInLeft}
          className="pointer-events-none absolute -right-4 bottom-0 top-0 z-10 justify-center pr-1"
        >
          <Pressable onPress={() => scroll('right')} className="pointer-events-auto">
            <ChevronRight size={18} color="#1a7a4a" strokeWidth={2.5} />
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
};
