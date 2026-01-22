import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { periodFiltersType } from '@/types/history/historyResponse';
import { ListFilter, Search } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView } from 'react-native';

const periodFilters: periodFiltersType[] = ['todos', 'dia', 'semana', 'mês', 'ano'];

export const HistoryForm = () => {
  const [searchText, setSearchText] = useState('');
  const [periodFilter, setPeriodFilter] = useState<periodFiltersType>('todos');
  // const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSetPeriodFilter = (period: periodFiltersType) => {
    setPeriodFilter(period);
  };

  return (
    <VStack className="pb-4" space="md">
      <HStack className="px-7" space="md">
        <Input size={'md'} className="flex-1">
          <InputSlot className="pl-3">
            <InputIcon as={Search} />
          </InputSlot>
          <InputField
            value={searchText}
            onChange={(e) => setSearchText(e.nativeEvent.text)}
            placeholder="Buscar"
          />
        </Input>

        <Button>
          <ButtonIcon as={ListFilter} />
        </Button>
      </HStack>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2 px-7"
      >
        {periodFilters.map((item) => (
          <Button
            key={item}
            size="md"
            variant={periodFilter === item ? 'solid' : 'outline'}
            className="rounded-full"
            onPress={() => handleSetPeriodFilter(item)}
          >
            <ButtonText>{item}</ButtonText>
          </Button>
        ))}
      </ScrollView>
    </VStack>
  );
};
