import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { DefaultCard } from '../DefaultCard';

const ARC_RADIUS = 80;
const ARC_PATH = `M 20,100 A ${ARC_RADIUS},${ARC_RADIUS} 0 0 1 180,100`;
const ARC_STROKE_WIDTH = 12;

export const ArcBatteryCardSkeleton = () => {
  return (
    <DefaultCard>
      <View className="mb-5 flex-row items-start justify-between">
        <View className="mr-3 flex-1 gap-2">
          <Skeleton className="h-[18px] w-[70%] rounded-lg" />
          <Skeleton className="h-[13px] w-[50%] rounded-lg" />
        </View>
        <Skeleton className="h-6 w-[72px] rounded-full" />
      </View>

      <View className="mb-5 items-center">
        <View style={{ width: 200, height: 110, overflow: 'hidden' }}>
          <Svg width={200} height={200} viewBox="0 0 200 200">
            <Path
              d={ARC_PATH}
              fill="none"
              stroke="rgba(120,120,128,0.16)"
              strokeWidth={ARC_STROKE_WIDTH}
              strokeLinecap="round"
            />
          </Svg>

          <View
            style={{ position: 'absolute', bottom: 4, left: 0, right: 0 }}
            className="items-center"
          >
            <Skeleton className="h-[36px] w-[80px] rounded-lg" />
          </View>
        </View>

        <View className="mt-1.5 flex-row items-center gap-2">
          <Skeleton className="h-[14px] w-[120px] rounded-lg" />
        </View>
      </View>

      <View className="flex-row gap-2">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-[62px] flex-1 rounded-2xl" />
        ))}
      </View>
    </DefaultCard>
  );
};
