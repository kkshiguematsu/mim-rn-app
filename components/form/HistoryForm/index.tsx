import { TintedBadge } from '@/components/shared/badge/TintedBadge';
import { SearchBar } from '@/components/shared/form/SearchBar';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { VStack } from '@/components/ui/vstack';
import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import { TransactionHistoryParams } from '@/hooks/api/transation/useTransactionsHistory';
import { Calendar, DollarSign, ListFilter, MoveDown, MoveUp, Zap } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';

const PERIOD_FILTERS = [
  'Todos',
  'Hoje',
  'Esta semana',
  'Este mês',
  `${new Date().getFullYear() - 1}`,
] as const;
type PeriodFilter = (typeof PERIOD_FILTERS)[number];

type HistoryFormProps = {
  onFiltersChange: (filters: TransactionHistoryParams) => void;
};

export const HistoryForm = ({ onFiltersChange }: HistoryFormProps) => {
  const [searchText, setSearchText] = useState('');
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('Todos');
  const [sortField, setSortField] = useState<'date' | 'price' | 'kw'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const getDateRange = (period: PeriodFilter) => {
    const now = new Date();
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    switch (period) {
      case 'Hoje':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
        break;
      case 'Esta semana':
        const dayOfWeek = now.getDay();
        startDate = new Date(now.getTime() - dayOfWeek * 24 * 60 * 60 * 1000);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      case 'Este mês':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        break;
      case `${new Date().getFullYear() - 1}`:
        const lastYear = now.getFullYear() - 1;
        startDate = new Date(lastYear, 0, 1);
        endDate = new Date(lastYear + 1, 0, 1);
        break;
      default:
        break;
    }

    return {
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined,
    };
  };

  const getSortBy = (field: 'date' | 'price' | 'kw') => {
    switch (field) {
      case 'date':
        return 'startedAt';
      case 'price':
        return 'totalCost';
      case 'kw':
        return 'currentPower';
      default:
        return 'startedAt';
    }
  };

  const notifyFiltersChanged = (
    search: string = searchText,
    period: PeriodFilter = periodFilter,
    field: 'date' | 'price' | 'kw' = sortField,
    direction: 'asc' | 'desc' = sortDirection
  ) => {
    const { startDate, endDate } = getDateRange(period);
    const sortBy = getSortBy(field);

    onFiltersChange({
      limit: 10,
      search: search || undefined,
      sortBy,
      sortOrder: direction,
      // startDate,
      // endDate,
    });
  };
  const fadeInDown = useFadeInAnimation({ direction: 'down', duration: 500 });
  const fadeInUp = useFadeInAnimation({ direction: 'up', duration: 500 });

  const menuFilters = [
    {
      value: 'date' as const,
      label: 'Data',
      icon: Calendar,
    },
    {
      value: 'price' as const,
      label: 'Preço',
      icon: DollarSign,
    },
    {
      value: 'kw' as const,
      label: 'Potência (kW)',
      icon: Zap,
    },
  ];

  const handleSort = useCallback(
    (field: 'date' | 'price' | 'kw') => {
      setSortField((prev) => {
        const newDirection = prev === field && sortDirection === 'desc' ? 'asc' : 'desc';

        setSortDirection(newDirection);

        notifyFiltersChanged(searchText, periodFilter, field, newDirection);

        return field;
      });
    },
    [sortDirection, searchText, periodFilter]
  );

  const handleSetPeriodFilter = useCallback(
    (period: PeriodFilter) => {
      setPeriodFilter(period);
      notifyFiltersChanged(searchText, period, sortField, sortDirection);
    },
    [searchText, sortField, sortDirection]
  );

  const handleChangeSearchText = useCallback(
    (value: string) => {
      setSearchText(value);
      notifyFiltersChanged(value, periodFilter, sortField, sortDirection);
    },
    [periodFilter, sortField, sortDirection]
  );

  return (
    <VStack className="pb-4" space="md">
      <View className="mt-6 flex-row items-center justify-between px-7">
        <View>
          <Heading size="3xl" className="text-black dark:text-white">
            Histórico
          </Heading>
        </View>
        <Menu
          placement="bottom right"
          offset={5}
          trigger={({ ...triggerProps }) => {
            return (
              <Pressable {...triggerProps}>
                <TintedBadge
                  label="Ordenar"
                  icon={ListFilter}
                  size="sm"
                  color="blue"
                  className="self-center"
                />
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
      </View>

      <HStack className="items-center px-7" space="md">
        <SearchBar
          value={searchText}
          placeholder={'Buscar'}
          size="lg"
          onChange={handleChangeSearchText}
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
