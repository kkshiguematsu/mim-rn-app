import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useCharging } from '@/context/ChargingContext';
import { Clock, MapPin, Zap } from 'lucide-react-native';
import { Alert, View } from 'react-native';

interface ActiveChargingCardProps {
  onStopCharging?: () => void;
}

export function ActiveChargingCard({ onStopCharging }: ActiveChargingCardProps) {
  const { activeSession, stopCharging } = useCharging();

  if (!activeSession) return null;

  const handleStop = () => {
    Alert.alert('Parar Carregamento', 'Deseja finalizar o carregamento agora?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Parar',
        style: 'destructive',
        onPress: () => {
          stopCharging();
          onStopCharging?.();
        },
      },
    ]);
  };

  return (
    <View className="w-full rounded-2xl bg-green-600 p-5 shadow-md dark:bg-green-700/90">
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Icon as={Zap} className="h-6 w-6 text-white" fill="white" />
          <Heading size="md" className="text-white">
            Carregando Agora
          </Heading>
        </View>
        <View className="rounded-full bg-white/20 px-3 py-1">
          <Text className="text-xs font-medium text-white">Em andamento</Text>
        </View>
      </View>

      <Card className="mb-4 bg-white/10">
        <View className="p-1">
          <View className="mb-2 flex-row items-center gap-2">
            <Icon as={MapPin} className="h-4 w-4 text-white" />
            <Text className="text-sm text-white">{activeSession.location}</Text>
          </View>

          <View className="mt-3 flex-row items-center justify-between">
            <View>
              <View className="flex flex-row items-center gap-2">
                <Text className="text-3xl font-bold text-white">
                  {activeSession.energyAdded || 24}
                </Text>
                <Text className="text-xl font-bold text-white">kWh</Text>
              </View>
              <Text className="text-sm text-white/90"> carregados</Text>
            </View>
            <View>
              <Text className="text-3xl font-bold text-white">{activeSession.batteryLevel}%</Text>
              <Text className="text-sm text-white/90">Bateria</Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Time and Cost */}
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Icon as={Clock} className="h-4 w-4 text-white" />
          <Text className="text-sm text-white">
            {Math.floor(activeSession.time.elapsed / 60)} min {activeSession.time.elapsed % 60} seg
          </Text>
        </View>
        <Text className="text-lg font-bold text-white">
          R$ {activeSession.cost?.toFixed(2) || '0.00'}
        </Text>
      </View>

      {/* Stop Button */}
      <Button variant="solid" size="lg" className="bg-white" onPress={handleStop}>
        <ButtonText className="font-semibold text-green-600">Parar Carregamento</ButtonText>
      </Button>
    </View>
  );
}
