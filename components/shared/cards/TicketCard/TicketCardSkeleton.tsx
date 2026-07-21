import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
import { View } from 'react-native';
import { DefaultCard } from '../DefaultCard';

export const TicketCardSkeleton = () => {
  return (
    <DefaultCard className="flex flex-row items-center gap-2">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <View className="flex-1">
        <SkeletonText _lines={2} className="h-3 w-24 rounded-md" />
      </View>

      <Skeleton className="h-6 w-20 rounded-full" />

      <Skeleton className="h-7 w-7 rounded" />
    </DefaultCard>
  );
};
