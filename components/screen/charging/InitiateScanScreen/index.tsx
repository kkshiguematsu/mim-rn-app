import { Page } from '@/components/layout/page';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { EvCharger, ScanQrCode } from 'lucide-react-native';
import { View } from 'react-native';

interface InitiateScanScreenProps {
  handleStartScan: () => void;
}

export const InitiateScanScreen = ({ handleStartScan }: InitiateScanScreenProps) => {
  return (
    <Page needsSafeArea needsBottomTabBar={false}>
      <View className="flex-1 items-center justify-center gap-6 px-8">
        <View className="h-56 w-56 items-center justify-center rounded-full bg-primary-500/20 p-14 dark:bg-primary-900">
          <Icon as={EvCharger} className="h-full w-full text-primary-400" />
        </View>

        <Heading size="xl" className="m text-center text-neutral-700 dark:text-neutral-300">
          Nenhum carregamento em andamento
        </Heading>

        <Text className="text-center text-neutral-500 dark:text-neutral-400">
          Escaneie o QR Code de um carregador para iniciar
        </Text>

        <Button size="lg" className="" onPress={handleStartScan}>
          <ButtonIcon as={ScanQrCode} />
          <ButtonText>Iniciar Carregamento</ButtonText>
        </Button>
      </View>
    </Page>
  );
};
