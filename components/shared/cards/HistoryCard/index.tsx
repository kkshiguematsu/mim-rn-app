import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { usePressableScale } from '@/hooks/animations/usePressableScale';
import { HistoryResponse } from '@/types/history/historyResponse';
import { formatDateToDMY, formatTimeToHM } from '@/utils/formatDate';
import { useRouter } from 'expo-router';
import { Battery, Calendar, Clock, Zap } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

export interface HistoryCardProps {
  data: HistoryResponse;
}

export const HistoryCard = ({ data }: HistoryCardProps) => {
  const router = useRouter();
  const { animatedStyle, pressInScale, pressOutScale } = usePressableScale();

  const dateFormatted = formatDateToDMY(Number(data.date));
  const timeFormatted = formatTimeToHM(Number(data.date));

  const navigateToDetails = (historyId: string) => {
    router.push(`/(tabs)/history/[historyId]`);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins} min`;
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={() => navigateToDetails(data.id)}
        onPressIn={pressInScale}
        onPressOut={pressOutScale}
      >
        <Card className="p-4">
          <View className="mb-3 flex-row items-start justify-between">
            <View className="flex-1 flex-row items-start gap-3">
              <View className="mt-1 h-10 w-10 items-center justify-center rounded-lg bg-blue-100/50 dark:bg-primary-800">
                <Icon as={Battery} className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {data.location.address}
                </Text>
                <Text className="text-xs text-neutral-500 dark:text-neutral-400">
                  {data.location.city}
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="font-semibold text-neutral-900 dark:text-neutral-100">
                R$ {data.price.value.toFixed(2)}
              </Text>
              <Text className="text-xs font-medium text-green-600 dark:text-green-400">
                {data.batteryPercent}%
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between gap-5 border-t border-neutral-200 pt-3 dark:border-neutral-800">
            <View className="flex-row items-center gap-1">
              <Icon as={Clock} className="h-4 w-4 text-primary-400" />
              <Text className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDuration(data.duration)}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Icon as={Zap} className="h-4 w-4 text-primary-400" />
              <Text className="text-sm text-neutral-600 dark:text-neutral-400">
                {data.kwh.toFixed(1)} kWh
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Icon as={Calendar} className="h-4 w-4 text-primary-400" />
              <Text className="text-sm text-neutral-600 dark:text-neutral-400">
                {dateFormatted}
              </Text>
            </View>
          </View>
        </Card>
      </Pressable>
    </Animated.View>
  );
};
