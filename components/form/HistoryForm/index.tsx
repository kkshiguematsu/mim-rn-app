import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { VStack } from '@/components/ui/vstack';
import { useFadeIn } from '@/hooks/animations/useFadeIn';
import { periodFiltersType } from '@/types/history/historyResponse';
import clsx from 'clsx';
import {
  Calendar,
  DollarSign,
  ListFilter,
  MoveDown,
  MoveUp,
  Search,
  Zap,
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';

const periodFilters: periodFiltersType[] = ['todos', 'dia', 'semana', 'mês', 'ano'];

type menuFiltersType = {
  value: 'date' | 'price' | 'kw';
  label: string;
  icon: React.ElementType;
};

export const HistoryForm = () => {
  const [searchText, setSearchText] = useState('');
  const [periodFilter, setPeriodFilter] = useState<periodFiltersType>('todos');
  const [sortField, setSortField] = useState<'date' | 'price' | 'kw'>('date');
  const [sortDirection, setSortDirection] = useState('desc');

  const fadeInDown = useFadeIn({ direction: 'down', duration: 500 });
  const fadeInUp = useFadeIn({ direction: 'up', duration: 500 });

  const menuFilters: menuFiltersType[] = [
    {
      value: 'date',
      label: 'Data',
      icon: Calendar,
    },
    {
      value: 'price',
      label: 'Preço',
      icon: DollarSign,
    },
    {
      value: 'kw',
      label: 'Potência (kW)',
      icon: Zap,
    },
  ];

  const handleSort = (field: 'date' | 'price' | 'kw') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleSetPeriodFilter = (period: periodFiltersType) => {
    setPeriodFilter(period);
  };

  return (
    <VStack className="pb-4" space="md">
      <HStack className="items-center px-7" space="md">
        <Input size={'lg'} className="flex-1 rounded-full">
          <InputSlot className="pl-3">
            <InputIcon as={Search} />
          </InputSlot>
          <InputField
            value={searchText}
            onChange={(e) => setSearchText(e.nativeEvent.text)}
            placeholder="Buscar"
          />
        </Input>
        <Menu
          placement="bottom right"
          offset={5}
          trigger={({ ...triggerProps }) => {
            return (
              <Pressable {...triggerProps}>
                {({ pressed }) => (
                  <View
                    className={clsx('rounded-full bg-primary-500 p-3', pressed && 'bg-primary-800')}
                  >
                    <Icon as={ListFilter} />
                  </View>
                )}
              </Pressable>
            );
          }}
        >
          {menuFilters.map((item) => (
            <MenuItem
              key={item.label}
              textValue={item.label}
              onPress={() => handleSort(item.value)}
              className="gap-2"
            >
              {item.icon && <Icon as={item.icon} size="md" />}
              <MenuItemLabel>{item.label}</MenuItemLabel>
              {sortField === item.value && sortDirection === 'desc' && (
                <Animated.View entering={fadeInDown}>
                  <Icon as={MoveUp} size="md" />
                </Animated.View>
              )}
              {sortField === item.value && sortDirection === 'asc' && (
                <Animated.View entering={fadeInUp}>
                  <Icon as={MoveDown} size="md" />
                </Animated.View>
              )}
            </MenuItem>
          ))}
        </Menu>
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
