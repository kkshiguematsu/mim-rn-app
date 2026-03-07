import { Page } from '@/components/layout/page';
import { ActiveChargingCard } from '@/components/shared/cards/ActiveChargingCard';
import { StatusCard } from '@/components/shared/cards/StatusCard';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { HistorySectionWidget } from '@/components/widget/HistorySectionWidget';
import { useCharging } from '@/context/ChargingContext';
import { Clock, DollarSign, Gauge, MapPin, Settings2, Zap } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, Pressable, View } from 'react-native';

export default function ChargingMonitorPage() {
  const [isCharging, setIsCharging] = useState(true);
  const [energyAdded, setEnergyAdded] = useState(12.4);
  const [currentPower, setCurrentPower] = useState(7.4);
  const [timeRemaining, setTimeRemaining] = useState(28);
  const [cost, setCost] = useState(12.5);
  const [rangeAdded, setRangeAdded] = useState(85);

  const { activeSession, updateSession, stopCharging } = useCharging();

  useEffect(() => {
    const interval = setInterval(() => {
      updateSession({
        batteryLevel: activeSession ? activeSession.batteryLevel + 1 : 0,
        time: {
          remaining: activeSession ? activeSession.time.remaining - 1 : 0,
          elapsed: 20,
        },
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeSession]);

  const handleStopCharging = () => {
    Alert.alert('Parar Carregamento', 'Deseja finalizar o carregamento agora?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Parar',
        style: 'destructive',
        onPress: () => {
          stopCharging();

          // Tela de resumo ???
        },
      },
    ]);
  };

  if (!activeSession) return;

  return (
    <Page.Scroll needsPadding>
      <View className="pb-4 pt-2">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-neutral-500 dark:text-neutral-400">Carregador #A042</Text>
          </View>
          <Pressable className="rounded-full bg-neutral-200 p-2 dark:bg-neutral-800">
            <Icon as={Settings2} className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
          </Pressable>
        </View>
      </View>

      <View className="pb-6">
        <View className="flex-row flex-wrap gap-3">
          <ActiveChargingCard onStopCharging={handleStopCharging} />
          <StatusCard
            title="Potência"
            icon={Zap}
            color="primary"
            content={`${currentPower.toFixed(1)} kW`}
          />
          <StatusCard
            title="Tempo Restante"
            color="blue"
            icon={Clock}
            content={`${Math.floor(timeRemaining)} min`}
          />
          <StatusCard
            title="Custo Atual"
            icon={DollarSign}
            color="green"
            content={`R$ ${cost.toFixed(2)}`}
          />
          <StatusCard
            title="Autonomia"
            icon={Gauge}
            color="purple"
            content={`+ ${Math.round(rangeAdded)} km`}
          />
        </View>
      </View>

      <View className="pb-6">
        <Card className="p-4">
          <Heading size="sm" className="mb-4 text-neutral-900 dark:text-neutral-100">
            Detalhes da Sessão
          </Heading>

          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-neutral-600 dark:text-neutral-400">
                Energia Adicionada
              </Text>
              <Text className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {energyAdded.toFixed(1)} kWh
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-neutral-600 dark:text-neutral-400">
                Início do Carregamento
              </Text>
              <Text className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                14:23
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-neutral-600 dark:text-neutral-400">
                Término Previsto
              </Text>
              <Text className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                15:51
              </Text>
            </View>

            <View className="my-2 h-px bg-neutral-200 dark:bg-neutral-800" />

            <View className="flex-row items-start gap-2">
              <Icon as={MapPin} className="mt-0.5 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <View className="flex-1">
                <Text className="text-sm text-neutral-600 dark:text-neutral-400">
                  Shopping Iguatemi - Vaga 42
                </Text>
                <Text className="text-xs text-neutral-500 dark:text-neutral-500">
                  Rua Exemplo, 123
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </View>

      <HistorySectionWidget />
    </Page.Scroll>
  );
}
