import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import { VEHICLE_COLORS, VehicleType } from '@/types/vehicle/vehicle.type';
import { Car, EllipsisVertical } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  iconStyles,
  iconWrapStyles,
  rowStyles,
  selectBtnStyles,
  selectBtnTextStyles,
  subTextStyles,
} from './styles';

// ─── ColorDot ─────────────────────────────────────────────────────────────────

function ColorDot({ color }: { color: VehicleType['color'] }) {
  const match = VEHICLE_COLORS.find((c) => c.id === color);

  return (
    <View
      className="h-2.5 w-2.5 rounded-full"
      style={{
        backgroundColor: match?.hex ?? '#9ca3af',
        borderWidth: color === 'white' ? 1 : 0,
        borderColor: '#CCC',
      }}
    />
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  index: number;
  vehicle: VehicleType;
  selectedVehicleId?: string;
  onSelect: () => void;
  onMorePress: () => void;
}

// ─── VehicleListRow ───────────────────────────────────────────────────────────

export const VehicleListRow = ({
  vehicle,
  index,
  selectedVehicleId,
  onSelect,
  onMorePress,
}: Props) => {
  const { brand, model, plate, connector, color } = vehicle;

  const selected = selectedVehicleId === vehicle.id;

  const animationFadeIn = useFadeInAnimation({
    direction: 'down',
    duration: 500 * index,
  });

  return (
    <Animated.View entering={animationFadeIn}>
      <Pressable onPress={onSelect} className={rowStyles({ selected })}>
        <View className={iconWrapStyles({ selected })}>
          <Icon as={Car} className={iconStyles({ selected })} />
        </View>

        <View className="min-w-0 flex-1">
          <Text
            size="md"
            className="font-semibold text-neutral-900"
            style={{ letterSpacing: -0.2 }}
            numberOfLines={1}
          >
            {brand} {model}
          </Text>

          <View className="flex-row flex-wrap items-center gap-3">
            <View className="flex-row items-center gap-2">
              <ColorDot color={color} />
              <Text size="xs" className={subTextStyles({ selected })}>
                {plate}
              </Text>
            </View>
            <Text size="xs" className={subTextStyles({ selected })}>
              {connector}
            </Text>
          </View>
        </View>

        <View className="flex-shrink-0 flex-row items-center gap-2">
          <Pressable onPress={onSelect} hitSlop={8} className={selectBtnStyles({ selected })}>
            <Text size="xs" className={selectBtnTextStyles({ selected })}>
              {selected ? 'Selecionado' : 'Usar este'}
            </Text>
          </Pressable>

          <Pressable
            onPress={onMorePress}
            hitSlop={8}
            className="h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 active:bg-neutral-200"
          >
            <Icon as={EllipsisVertical} color="#a8a8a4" />
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
};
