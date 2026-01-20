import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { EvCharger, MapPin, QrCode } from 'lucide-react-native';
import { View } from 'react-native';

interface EmptyActivityWidgetProps {
  onStartScan?: () => void;
}

export const EmptyActivityWidget = ({ onStartScan }: EmptyActivityWidgetProps) => {
  const router = useRouter();

  const handleFindCharger = () => {
    // Navega para a aba do mapa ou página de busca
    router.push('/(tabs)/map');
  };

  const handleScanQR = () => {
    if (onStartScan) {
      onStartScan();
    } else {
      // Ou navega para página de scan
      //   router.push('/charging/scan');
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900/50">
      <View className="p-6">
        <View className="h-16 w-16 items-center justify-center self-center rounded-full bg-primary-200/50 dark:bg-primary-900">
          <Icon as={EvCharger} className="h-8 w-8 text-primary-400" />
        </View>

        {/* Texto */}
        <Heading size="md" className="mb-2 text-center text-neutral-900 dark:text-neutral-100">
          Nenhum carregamento ativo
        </Heading>
        <Text className="mb-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Encontre um carregador próximo ou escaneie um QR Code para iniciar
        </Text>

        {/* Botões */}
        <View className="gap-3">
          <Button variant="solid" size="md" onPress={handleScanQR}>
            <ButtonIcon as={QrCode} className="mr-2" />
            <ButtonText>Escanear QR Code</ButtonText>
          </Button>

          <Button variant="outline" size="md" onPress={handleFindCharger}>
            <ButtonIcon as={MapPin} className="mr-2" />
            <ButtonText>Encontrar Carregador</ButtonText>
          </Button>
        </View>
      </View>
    </Card>
  );
};
