import { HistoryCard } from '@/components/shared/cards/HistoryCard';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { mockHistoryCards } from '@/data/mock/history/historyCard';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';

export const HistorySectionWidget = () => {
  const router = useRouter();

  const navigateAction = () => {
    router.push('/(tabs)/history');
  };

  return (
    <View className="mt-5">
      <Heading size="lg" className="mb-3 text-neutral-900 dark:text-neutral-100">
        Histórico
      </Heading>

      <View className="gap-3">
        {mockHistoryCards.length > 0 ? (
          mockHistoryCards.slice(0, 5).map((item, index) => <HistoryCard key={index} data={item} />)
        ) : (
          <Card className="p-6">
            <Text className="text-center text-neutral-500 dark:text-neutral-400">
              Nenhum carregamento realizado ainda
            </Text>
          </Card>
        )}
      </View>

      {mockHistoryCards && mockHistoryCards.length > 3 && (
        <Button variant="link" size="md" className="mt-4" onPress={navigateAction}>
          <ButtonText className="text-neutral-600 dark:text-neutral-300">Ver mais</ButtonText>
          <ButtonIcon className="text-neutral-600 dark:text-neutral-300" as={ChevronRight} />
        </Button>
      )}
    </View>
  );
};
