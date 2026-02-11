import { HistoryForm } from '@/components/form/HistoryForm';
import { HistoryCard } from '@/components/shared/cards/HistoryCard';
import { Page } from '@/components/shared/page';
import { VStack } from '@/components/ui/vstack';
import { mockHistoryCards } from '@/data/mock/history/historyCard';

export default function HistoryPage() {
  return (
    <Page.Scroll needsPadding={false} className="py-7">
      <HistoryForm />
      <VStack space="sm" className="px-7">
        {mockHistoryCards.map((dataCard, index) => (
          <HistoryCard key={`card-history-${index}`} data={dataCard} />
        ))}
      </VStack>
    </Page.Scroll>
  );
}
