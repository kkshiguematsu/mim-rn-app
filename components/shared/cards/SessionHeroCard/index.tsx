import { Text } from '@/components/ui/text';
import { Transaction } from '@/types/transaction/transaction.type';
import { calculateBatteryPercentage, calculateEnergyConsumed } from '@/utils/transaction.utils';
import { View } from 'react-native';
import { BatteryBar } from '../../bar/BaterryBar';

const BLUE_FILLED = 'rgba(59,130,246,0.4)';
const BLUE_LAST = '#60a5fa';

interface Props {
  data: Transaction;
}

export const SessionHeroCard = ({ data }: Props) => {
  // const bagdeEndReason = END_REASON_BADGE[data.endReason];

  const vehicle = data.userId?.vehicles?.find((v) => v.licensePlate === data.vehiclePlate);
  const energyAdded = calculateEnergyConsumed(data.meterStop, data.meterStart);
  const percentageBatteryStarted = vehicle
    ? calculateBatteryPercentage(data.meterStart, vehicle.vehicleId.batteryCapacityKwh)
    : 0;
  const percentageBatteryFinished =
    vehicle && data.meterStop
      ? calculateBatteryPercentage(data.meterStop, vehicle.vehicleId.batteryCapacityKwh)
      : 0;

  return (
    <View className="mx-7 overflow-hidden rounded-3xl bg-[#111110] p-5">
      <View className="mb-5 flex-row items-center justify-between">
        <Text size="xs" className="font-semibold uppercase tracking-widest text-white/35">
          Bateria
        </Text>
        {/* <TintedBadge
          label={bagdeEndReason.label}
          color="blue"
          size="xs"
          className="!bg-blue-500/15"
        /> */}
      </View>

      <View className="mb-5 flex-row items-center">
        <View className="flex-1">
          <Text size="xs" className="mb-1 font-medium text-white/35">
            Antes
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontWeight: '800',
              color: '#fff',
              letterSpacing: -1.5,
              lineHeight: 38,
            }}
          >
            {percentageBatteryStarted}
            <Text style={{ fontSize: 15, fontWeight: '400', color: 'rgba(255,255,255,0.4)' }}>
              {' '}
              %
            </Text>
          </Text>
        </View>

        <View className="items-center gap-1.5 px-4">
          <View className="h-5 w-px bg-white/10" />
          <View className="rounded-full border border-blue-500/30 bg-blue-500/15 px-3 py-1">
            <Text size="sm" className="font-bold text-blue-400">
              +{energyAdded.toFixed(0)} kWh
            </Text>
          </View>
          <View className="h-5 w-px bg-white/10" />
        </View>

        <View className="flex-1 items-end">
          <Text size="xs" className="mb-1 font-medium text-blue-400/70">
            Depois
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontWeight: '800',
              color: '#60a5fa',
              letterSpacing: -1.5,
              lineHeight: 38,
            }}
          >
            {percentageBatteryFinished}
            <Text style={{ fontSize: 15, fontWeight: '400', color: 'rgba(96,165,250,0.5)' }}>
              {' '}
              %
            </Text>
          </Text>
        </View>
      </View>

      <BatteryBar
        batteryPct={Number(percentageBatteryFinished)}
        filledColor={BLUE_FILLED}
        lastColor={BLUE_LAST}
      />
    </View>
  );
};
