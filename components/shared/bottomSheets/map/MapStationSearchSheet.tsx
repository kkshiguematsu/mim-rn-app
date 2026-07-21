import { Icon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { useSearchChargers } from '@/hooks/api/chargers/useSearchChargers';
import { useMapBottomSheetStore } from '@/hooks/store/useMapBottomSheetStore';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { SearchIcon } from 'lucide-react-native';
import { Dimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChargerList } from '../../list/ChargerList';

const { height: heightDevice } = Dimensions.get('window');

export function MapStationSearchSheet() {
  const { searchText, setSearchText } = useMapBottomSheetStore();
  const insets = useSafeAreaInsets();

  const {
    data: chargers,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useSearchChargers({
    search: searchText,
    limit: 20,
  });

  const handleLoadMore = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <VStack className="gap-4" style={{ height: heightDevice - insets.top - insets.bottom - 10 }}>
      <View className="relative flex-row items-center gap-2 rounded-xl border-neutral-200 bg-neutral-200 px-3 py-2">
        <Icon as={SearchIcon} size="md" className="text-neutral-500" />
        <BottomSheetTextInput
          autoFocus
          value={searchText}
          onChangeText={setSearchText}
          style={{
            flex: 1,
            fontSize: 16,
            lineHeight: 20,
            paddingVertical: 8,
            paddingHorizontal: 4,
            backgroundColor: 'transparent',
            borderWidth: 0,
            color: '#000',
          }}
          placeholderTextColor="#999"
          placeholder="Digite para buscar estações"
        />
      </View>

      <ChargerList
        data={chargers}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        onLoadMore={handleLoadMore}
      />
    </VStack>
  );
}
