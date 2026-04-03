import { Text } from '@/components/ui/text';
import { usePressableScaleAnimation } from '@/hooks/animations/usePressableScaleAnimation';
import { useSessionStore } from '@/hooks/store/useSessionStore';
import { Session } from '@/types/history/Session.type';
import { formatDateToDMY } from '@/utils/Date.utils';
import { formatTimeToHM } from '@/utils/formatTime';
import { useRouter } from 'expo-router';
import { Zap } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { TintedIcon } from '../../icon/TintedIcon';

export const HistoryCard = ({ data }: { data: Session }) => {
  const router = useRouter();
  const { setSelectedSession } = useSessionStore();
  const { animatedStyle, pressInScale, pressOutScale } = usePressableScaleAnimation();

  const dateFormatted = formatDateToDMY(data.date);
  const timeFormatted = formatTimeToHM(data.date);
  const isBatteryFull = data.batteryEnd === 100 ? 'green' : 'blue';

  const pushToHistoryDetailPage = (data: Session) => {
    setSelectedSession(data);
    router.push(`/(tabs)/history/${data.id}`);
  };

  return (
    <Animated.View style={animatedStyle} className="overflow-hidden rounded-2xl bg-background-50">
      <Pressable
        onPress={() => pushToHistoryDetailPage(data)}
        onPressIn={pressInScale}
        onPressOut={pressOutScale}
      >
        <View className="flex-row items-center gap-3 px-4 py-3.5">
          <View className={`h-10 w-10 items-center justify-center rounded-[10px]`}>
            <TintedIcon icon={Zap} size="lg" color={isBatteryFull} />
          </View>

          <View className="min-w-0 flex-1">
            <Text className="font-medium text-neutral-900 dark:text-neutral-100" numberOfLines={1}>
              {data.location.address}
            </Text>
            <Text className="text-xs text-neutral-400">
              {dateFormatted} · {timeFormatted}
            </Text>
          </View>

          <View className="items-end">
            <Text className="font-semibold text-neutral-900 dark:text-neutral-100">
              R$ {data.price.value.toFixed(2)}
            </Text>
            <Text className={`text-xs font-medium text-${isBatteryFull}-600`}>
              {data.energyKwh.toFixed(1)} kWh · {data.batteryStart}%→{data.batteryEnd}%
            </Text>
          </View>
        </View>

        <View className="flex-row border-t border-neutral-200 dark:border-neutral-600">
          <View className="flex-1 items-center py-2.5">
            <Text size="sm" className="font-semibold text-black dark:text-neutral-200">
              {data.maxPowerKw} kW
            </Text>
            <Text size="xs" className="text-neutral-400">
              Potência
            </Text>
          </View>
          <View className="w-px bg-neutral-200 dark:bg-neutral-600" />
          <View className="flex-1 items-center py-2.5">
            <Text size="sm" className="font-semibold text-black dark:text-neutral-200">
              R$ {data.price.perKwh.toFixed(2)}
            </Text>
            <Text size="xs" className="text-neutral-400">
              por kWh
            </Text>
          </View>
          <View className="w-px bg-neutral-200 dark:bg-neutral-600" />
          <View className="flex-1 items-center py-2.5">
            <Text size="sm" className="font-semibold text-black dark:text-neutral-200">
              +{Math.round((data.batteryEnd - data.batteryStart) * 3.16)} km
            </Text>
            <Text size="xs" className="text-neutral-400">
              Autonomia
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};
