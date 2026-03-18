import { View } from 'react-native';
import { SegmentBar } from './SegmentBar';

const SEGMENTS = 10;

interface BatteryBarProps {
  batteryPct: number;
  filledColor?: string;
  lastColor?: string;
}

export const BatteryBar = ({ batteryPct, filledColor, lastColor }: BatteryBarProps) => {
  const filled = Math.round((batteryPct / 100) * SEGMENTS);

  return (
    <View className="flex-row gap-1">
      {Array.from({ length: SEGMENTS }).map((_, i) => (
        <SegmentBar
          key={i}
          index={i}
          isFilled={i < filled}
          isLast={i === filled - 1}
          filledColor={filledColor}
          lastColor={lastColor}
        />
      ))}
    </View>
  );
};
