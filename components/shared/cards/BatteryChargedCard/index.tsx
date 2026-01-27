import { Icon } from '@/components/ui/icon';
import { LinearGradient } from '@/components/ui/linear-gradient';

import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';

import { HistoryResponse } from '@/types/history/historyResponse';
import { Battery, Zap } from 'lucide-react-native';
import { View } from 'react-native';

interface Props {
  session: HistoryResponse;
}

export const BatteryChargedCard = ({ session }: Props) => {
  return (
    <LinearGradient
      colors={['#10b981', '#14b8a6', '#06b6d4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="overflow-hidden rounded-3xl p-8"
    >
      <View className="mb-8 flex-row items-start justify-between">
        <View>
          <Text size="lg" className="mb-1 font-medium text-white">
            Sessão Concluída
          </Text>
          <Text size="sm" className="font-mono text-white">
            {session.id}
          </Text>
        </View>
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
          <Icon as={Zap} size="xl" className="fill-white text-white" />
        </View>
      </View>

      <View className="mb-6">
        <View className="flex-row items-baseline gap-2">
          <Text className="text-6xl font-bold text-white">{session.kwh}</Text>
          <Text className="text-2xl font-semibold text-white/80">kWh</Text>
        </View>
        <Text size="sm" className="text-white/80">
          Energia consumida
        </Text>
      </View>

      <View className="gap-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Icon as={Battery} color="white" size="md" />
            <Text size="md" className="text-white/80">
              Nível de bateria
            </Text>
          </View>
          <Text size="lg" className="font-bold text-white">
            {session.batteryPercent}%
          </Text>
        </View>
        <Progress value={session.batteryPercent} className="bg-white/30">
          <ProgressFilledTrack className="bg-white" />
        </Progress>
      </View>
    </LinearGradient>
  );
};
