import { DefaultCard } from '@/components/shared/cards/DefaultCard';
import { Box } from '@/components/ui/box';
import { GridItem } from '@/components/ui/grid';
import { Skeleton } from '@/components/ui/skeleton';
import { VStack } from '@/components/ui/vstack';

export function MounthDashboardCardSkeleton() {
  return (
    <GridItem _extra={{ className: 'col-span-1' }}>
      <DefaultCard padding="lg" className="min-h-[110px] rounded-2xl bg-background-50">
        <VStack space="md">
          <Box className="flex-row items-center gap-2">
            <Skeleton variant="circular" className="h-8 w-8" />
            <Skeleton variant="sharp" className="h-4 w-24 rounded-md" />
          </Box>

          <VStack space="xs" className="mt-1">
            <Box className="flex-row items-baseline gap-1">
              <Skeleton variant="sharp" className="h-6 w-8 rounded-md" />
              <Skeleton variant="sharp" className="h-6 w-16 rounded-md" />
            </Box>
          </VStack>
        </VStack>
      </DefaultCard>
    </GridItem>
  );
}
