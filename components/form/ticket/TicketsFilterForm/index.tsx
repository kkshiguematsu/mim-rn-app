import { TintedBadge } from '@/components/shared/badge/TintedBadge';
import { HeaderBackButtonIcon } from '@/components/shared/buttons/HeaderBackButtonIcon';
import { SearchBar } from '@/components/shared/form/SearchBar';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Menu, MenuItem, MenuItemLabel } from '@/components/ui/menu';
import { VStack } from '@/components/ui/vstack';
import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import { TicketsParams } from '@/hooks/api/tickets/useTickets';
import {
  AlertCircle,
  Calendar,
  ListChecks,
  ListFilter,
  MoveDown,
  MoveUp,
} from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

type TicketsFilterFormProps = {
  onFiltersChange: (filters: TicketsParams) => void;
};

export const TicketsFilterForm = ({ onFiltersChange }: TicketsFilterFormProps) => {
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState<'createdAt' | 'priority' | 'status'>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const fadeInDown = useFadeInAnimation({
    direction: 'down',
    duration: 500,
  });

  const fadeInUp = useFadeInAnimation({
    direction: 'up',
    duration: 500,
  });

  const menuFilters = [
    {
      value: 'createdAt' as const,
      label: 'Data',
      icon: Calendar,
    },
    {
      value: 'priority' as const,
      label: 'Prioridade',
      icon: AlertCircle,
    },
    {
      value: 'status' as const,
      label: 'Status',
      icon: ListChecks,
    },
  ];

  const notifyFiltersChanged = (
    search: string = searchText,
    field: 'createdAt' | 'priority' | 'status' = sortField,
    direction: 'asc' | 'desc' = sortDirection
  ) => {
    onFiltersChange({
      limit: 10,
      search: search || undefined,
      sortBy: field,
      sortOrder: direction,
    });
  };

  const handleSort = useCallback(
    (field: 'createdAt' | 'priority' | 'status') => {
      setSortField((prev) => {
        const newDirection = prev === field && sortDirection === 'desc' ? 'asc' : 'desc';

        setSortDirection(newDirection);

        notifyFiltersChanged(searchText, field, newDirection);

        return field;
      });
    },
    [sortDirection, searchText]
  );

  const handleChangeSearchText = useCallback(
    (value: string) => {
      setSearchText(value);

      notifyFiltersChanged(value, sortField, sortDirection);
    },
    [sortField, sortDirection]
  );

  return (
    <VStack className="py-4" space="md">
      <View className="flex-row items-center px-7">
        <HeaderBackButtonIcon containerStyle="h-12 w-12" />

        <Heading size="3xl" className="ml-4 flex-1 text-black dark:text-white">
          Chamados
        </Heading>

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
              <Icon as={item.icon} size="md" />

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
          placeholder="Buscar ticket"
          size="lg"
          onChange={handleChangeSearchText}
        />
      </HStack>
    </VStack>
  );
};
