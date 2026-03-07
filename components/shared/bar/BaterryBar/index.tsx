import { View } from 'react-native';
import { SegmentBar } from './SegmentBar';

const SEGMENTS = 10;

interface BatteryBarProps {
  batteryPct: number;
}

export const BatteryBar = ({ batteryPct }: BatteryBarProps) => {
  const filledSegments = Math.round((batteryPct / 100) * SEGMENTS);

  return (
    <View className="flex-row gap-1">
      {Array.from({ length: SEGMENTS }).map((_, i) => (
        <SegmentBar
          key={i}
          index={i}
          isFilled={i < filledSegments}
          isLast={i === filledSegments - 1}
        />
      ))}
    </View>
  );
};
