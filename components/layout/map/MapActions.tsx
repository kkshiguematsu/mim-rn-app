import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { RouteResult } from '@/hooks/api/map/useGoogleRouteDirections';
import { useChargerStore } from '@/hooks/store/useChargerStore';
import { useMapBottomSheetStore } from '@/hooks/store/useMapBottomSheetStore';
import { usePlatform } from '@/hooks/utils/usePlatform';
import { MapBottomSheetNames } from '@/types/bottomsheet/map/mapBottomSheetNames';
import { formatDistance, formatDuration } from '@/utils/Map.utils';
import { useRouter } from 'expo-router';
import { ChevronLeft, Navigation, Search } from 'lucide-react-native';
import { Linking, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  route: RouteResult | undefined;
  destination: {
    latitude: number;
    longitude: number;
  } | null;
}

export const MapActions = ({ route, destination }: Props) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { isAndroid } = usePlatform();
  const { selectedCharger, setSelectedCharger } = useChargerStore();
  const { enableMapModal, setActiveRouting } = useMapBottomSheetStore();

  const handleCloseMap = () => {
    setSelectedCharger(null);
    setActiveRouting(false);
    router.replace('/(tabs)/home');
  };

  return (
    <View
      className="absolute left-0 right-0 z-50 flex-row items-center gap-2 px-4"
      style={{ top: isAndroid ? insets.top + 20 : insets.top }}
    >
      <View>
        <Pressable
          onPress={handleCloseMap}
          className={'h-14 w-14 items-center justify-center rounded-full bg-white p-5 shadow-sm'}
        >
          <Icon as={ChevronLeft} size="2xl" className={'text-black'} />
        </Pressable>
      </View>

      <View className="flex-1 shadow-sm">
        <Pressable
          className="h-14 flex-row items-center justify-start gap-4 rounded-full bg-white px-5"
          onPress={() => enableMapModal(MapBottomSheetNames.MapStationSearch)}
          style={isAndroid && { elevation: 7 }}
        >
          <Icon as={Search} className="text-typography-900" />
          {selectedCharger ? (
            <HStack className="flex-1 items-center">
              <VStack className="flex-1">
                <Text size="xs" className="font-semibold text-black" numberOfLines={1}>
                  {selectedCharger?.name}
                </Text>
                <Text size="xs" numberOfLines={1} ellipsizeMode="tail" className="text-primary-700">
                  {route && `${formatDistance(route.distance)} • ${formatDuration(route.duration)}`}
                </Text>
              </VStack>
              <Text size="xs" className="text-typography-500">
                Alterar
              </Text>
            </HStack>
          ) : (
            <Text size="sm" className="text-gray-500">
              Buscar estações
            </Text>
          )}
        </Pressable>
      </View>
      {selectedCharger && destination && (
        <View style={isAndroid ? { elevation: 10 } : undefined}>
          <Pressable
            className="h-14 w-14 items-center justify-center rounded-full bg-primary-700 shadow-lg"
            onPress={() => {
              const url = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`;
              Linking.openURL(url);
            }}
          >
            <Icon as={Navigation} size="xl" className="-ml-1 text-white" />
          </Pressable>
        </View>
      )}
    </View>
  );
};
