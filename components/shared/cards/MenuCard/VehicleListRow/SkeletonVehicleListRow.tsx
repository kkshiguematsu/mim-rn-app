import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
import { View } from 'react-native';

interface Props {
  selected?: boolean;
}

export const SkeletonVehicleListRow = ({ selected = false }: Props) => {
  return (
    <View
      className={`flex-row items-center gap-3 rounded-2xl border p-4 ${
        selected ? 'border-primary-200 bg-primary-50' : 'border-0'
      }`}
    >
      <Skeleton className="h-12 w-12 rounded-2xl" />

      <View className="min-w-0 flex-1 gap-2">
        <SkeletonText _lines={1} className="h-3 w-32 rounded-md" />

        <Skeleton className="h-3 w-20 rounded-md" />
      </View>

      <View className="flex-row items-center gap-2">
        <Skeleton className={`h-3 w-24 rounded-full ${selected ? 'opacity-80' : ''}`} />

        <Skeleton className="h-8 w-8 rounded-full" />
      </View>
    </View>
  );
};
