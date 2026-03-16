import { HistoryForm } from '@/components/form/HistoryForm';
import { Page } from '@/components/layout/page';
import { HistoryMounthSection } from '@/components/section/HistoryMounthSection';
import { TintedBadge } from '@/components/shared/badge/TintedBadge';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { mockHistoryCards } from '@/data/mock/history/historyCard';
import { groupByMonth } from '@/utils/Date.utils';
import { ListFilter } from 'lucide-react-native';
import { View } from 'react-native';

export default function HistoryPage() {
  const groupedHistory = groupByMonth(mockHistoryCards, 'date');

  return (
    <Page.Scroll needsPadding={false} hasHeader={false}>
      <Page.Header
        content={
          <View className="mb-4 flex-row items-center justify-between px-7">
            <View>
              <Heading size="3xl" className="text-black dark:text-white">
                Histórico
              </Heading>
            </View>
            <TintedBadge
              label="Ordenar"
              icon={ListFilter}
              size="sm"
              color="blue"
              className="self-center"
            />
          </View>
        }
      />
      <HistoryForm />
      <VStack space="sm" className="px-7">
        {groupedHistory.map((group) => (
          <HistoryMounthSection key={group.label} {...group} />
        ))}
      </VStack>
    </Page.Scroll>
  );
}
