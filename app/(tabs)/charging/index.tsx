import { Page } from '@/components/shared/Page';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { EvCharger } from 'lucide-react-native';
import { View } from 'react-native';

export default function ChargingPage() {
  return (
    <Page needsPadding needsSafeArea alignItems="center" justifyContent="center">
      <View className="flex w-[70%] items-center justify-center gap-10">
        <View className="h-56 w-56 rounded-full bg-primary-200/50 p-14 dark:bg-primary-900">
          <Icon as={EvCharger} className="h-full w-full text-primary-400" />
        </View>
        <Heading size="xl" className="flex-wrap text-center text-neutral-700 dark:text-neutral-300">
          Nenhum carregamento em andamento
        </Heading>
      </View>
      <View className="flex h-[30%] w-full justify-end">
        <Button className="" size="xl">
          <ButtonText>Iniciar Carregamento</ButtonText>
        </Button>
      </View>
    </Page>
  );
}
