import { Text } from '@/components/ui/text';
import { usePressableScaleAnimation } from '@/hooks/animations/usePressableScaleAnimation';
import { useSessionStore } from '@/hooks/store/useSessionStore';
import { Transaction } from '@/types/transaction/transaction.type';
import { formatDateToDMY } from '@/utils/Date.utils';
import { formatTimeToHM } from '@/utils/formatTime';
import {
  calculateBatteryPercentage,
  calculateEnergyConsumed,
  findVehicleByPlate,
  getBatteryIndicatorColor,
} from '@/utils/transaction.utils';
import { useRouter } from 'expo-router';
import { Zap } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { TintedIcon } from '../../icon/TintedIcon';

export const TransactionHistoryCard = ({ data }: { data: Transaction }) => {
  const router = useRouter();
  const { setSelectedSession } = useSessionStore();
  const { animatedStyle, pressInScale, pressOutScale } = usePressableScaleAnimation();

  const dateFormatted = formatDateToDMY(new Date(data.startedAt).getTime());
  const timeFormatted = formatTimeToHM(new Date(data.startedAt).getTime());
  const isBatteryFull = getBatteryIndicatorColor(data.currentSoC);
  const kwhConsumed = calculateEnergyConsumed(data.meterStop, data.meterStart);
  const maxPowerKw = 0;
  // data.chargerId.connectors.find((c) => c._id === data.chargerId.connectorId)?.maxPowerKw ?? 0;

  const vehicle = findVehicleByPlate(data.userId?.vehicles, data.vehiclePlate);

  const energyAdded = calculateEnergyConsumed(data.meterStop, data.meterStart);
  const percentageBatteryStarted = vehicle
    ? calculateBatteryPercentage(data.meterStart, vehicle.vehicleId.batteryCapacityKwh)
    : 0;
  const percentageBatteryFinished =
    vehicle && data.meterStop
      ? calculateBatteryPercentage(data.meterStop, vehicle.vehicleId.batteryCapacityKwh)
      : 0;

  const pushToHistoryDetailPage = (data: Transaction) => {
    setSelectedSession(data);
    router.push(`/(tabs)/history/${data._id}`);
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
              {data.chargerId.address?.street}
            </Text>
            <Text className="text-xs text-neutral-400">
              {dateFormatted} · {timeFormatted}
            </Text>
          </View>

          <View className="items-end">
            <Text className="font-semibold text-neutral-900 dark:text-neutral-100">
              R$ {data.totalCost?.toFixed(2) ?? '0.00'}
            </Text>
            <Text className={`text-xs font-medium text-${isBatteryFull}-600`}>
              {kwhConsumed?.toFixed(1)} kWh · {percentageBatteryStarted}%→
              {percentageBatteryFinished}%
            </Text>
          </View>
        </View>

        <View className="flex-row border-t border-neutral-200 dark:border-neutral-600">
          <View className="flex-1 items-center py-2.5">
            <Text size="sm" className="font-semibold text-black dark:text-neutral-200">
              {maxPowerKw} kW
            </Text>
            <Text size="xs" className="text-neutral-400">
              Potência
            </Text>
          </View>
          <View className="w-px bg-neutral-200 dark:bg-neutral-600" />
          <View className="flex-1 items-center py-2.5">
            <Text size="sm" className="font-semibold text-black dark:text-neutral-200">
              R${' '}
              {data.totalCost && energyAdded ? (data.totalCost / energyAdded).toFixed(2) : '0.00'}
            </Text>
            <Text size="xs" className="text-neutral-400">
              por kWh
            </Text>
          </View>
          <View className="w-px bg-neutral-200 dark:bg-neutral-600" />
        </View>
      </Pressable>
    </Animated.View>
  );
};
