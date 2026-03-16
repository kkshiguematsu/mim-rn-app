import { SearchBar } from '@/components/shared/form/SearchBar';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { VStack } from '@/components/ui/vstack';
import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import { Calendar, DollarSign, Funnel, MoveDown, MoveUp, Zap } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';

const PERIOD_FILTERS = [
  'Todos',
  'Hoje',
  'Esta semana',
  'Este mês',
  `${new Date().getFullYear() - 1}`,
];
type PeriodFilter = (typeof PERIOD_FILTERS)[number];

type menuFiltersType = {
  value: 'date' | 'price' | 'kw';
  label: string;
  icon: React.ElementType;
};

export const HistoryForm = () => {
  const [searchText, setSearchText] = useState('');
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>(PERIOD_FILTERS[0]);
  const [sortField, setSortField] = useState<'date' | 'price' | 'kw'>('date');
  const [sortDirection, setSortDirection] = useState('desc');

  const fadeInDown = useFadeInAnimation({ direction: 'down', duration: 500 });
  const fadeInUp = useFadeInAnimation({ direction: 'up', duration: 500 });

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

  const handleSetPeriodFilter = (period: PeriodFilter) => {
    setPeriodFilter(period);
  };

  const handleChangeSearchText = (value: string) => {
    setSearchText(value);
  };

  return (
    <VStack className="pb-4" space="md">
      <HStack className="items-center px-7" space="md">
        <SearchBar
          value={searchText}
          placeholder={'Buscar'}
          size="lg"
          onChange={handleChangeSearchText}
          hasFilter={
            <Menu
              placement="bottom right"
              offset={5}
              trigger={({ ...triggerProps }) => {
                return (
                  <Pressable {...triggerProps}>
                    {({ pressed }) => (
                      <View className="p-3">
                        <Icon className="text-typography-400" as={Funnel} />
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
          }
        />
      </HStack>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2 px-7"
      >
        {PERIOD_FILTERS.map((item) => (
          <Button
            key={item}
            size="sm"
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
