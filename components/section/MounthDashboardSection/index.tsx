import { StatusCard } from '@/components/shared/cards/StatusCard';
import { trendColorStyles } from '@/components/shared/cards/StatusCard/styles';
import { TailwindColor } from '@/components/shared/icon/TintedIcon/styles';
import { Grid, GridItem } from '@/components/ui/grid';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useMonthlyDashboard } from '@/hooks/api/dashboard/useMounthlyDashboard';
import { MonthlyType } from '@/types/dashboard/mounthly/mounthly.type';
import { getCurrentMonth } from '@/utils/Date.utils';
import { calculateCO2Avoided } from '@/utils/Statistics.utils';
import { Gauge, Leaf, TrendingUp, Zap } from 'lucide-react-native';
import { Section } from '../Section';
import { MounthDashboardCardSkeleton } from './MounthDashboardCardSkeleton';

interface MonthlyStatConfig {
  icon: React.ElementType;
  iconColor: TailwindColor;
  trendColor: TailwindColor;
}

export const monthlyStatsConfig: Record<string, MonthlyStatConfig> = {
  Carregamentos: {
    icon: Zap,
    iconColor: 'green',
    trendColor: 'green',
  },
  'Energia total': {
    icon: TrendingUp,
    iconColor: 'blue',
    trendColor: 'blue',
  },
  'Gasto total': {
    icon: Gauge,
    iconColor: 'indigo',
    trendColor: 'indigo',
  },
  'CO₂ evitado': {
    icon: Leaf,
    iconColor: 'pink',
    trendColor: 'pink',
  },
};

export const MounthDashboardSection = () => {
  const { data, isLoading } = useMonthlyDashboard();

  const monthlyStats: MonthlyType = {
    month: 'Março',
    stats: [
      {
        value: data?.totalSessions ?? '',
        label: 'Carregamentos',
        // trend: '↑ +2 vs fevereiro',
      },
      {
        value: data?.totalEnergyConsumed ?? '',
        unit: 'kWh',
        label: 'Energia total',
        // trend: 'Média 23,7 kWh',
      },
      {
        value: `R$ ${data?.totalSpent.toFixed(2)}`,
        label: 'Gasto total',
        // trend: 'Média R$ 28,50',
      },
      {
        value: `${calculateCO2Avoided(data?.totalEnergyConsumed)}`,
        unit: 'kg',
        label: 'CO₂ evitado',
        // trend: '↑ bom trabalho',
      },
    ],
  };

  return (
    <Section title={`${getCurrentMonth()} em números`}>
      <Grid className="gap-4" _extra={{ className: 'grid-cols-2' }}>
        {isLoading ? (
          <>
            <MounthDashboardCardSkeleton />
            <MounthDashboardCardSkeleton />
            <MounthDashboardCardSkeleton />
            <MounthDashboardCardSkeleton />
          </>
        ) : (
          monthlyStats.stats.map((stat, index) => {
            const config = monthlyStatsConfig[stat.label];

            return (
              <GridItem key={index} _extra={{ className: 'col-span-1' }}>
                <StatusCard
                  title={stat.label}
                  icon={config.icon}
                  color={config.iconColor}
                  padding="lg"
                >
                  <VStack>
                    <Text size="2xl" className="font-bold">
                      {stat.value}{' '}
                      <Text size="md" className="font-normal text-neutral-400/90">
                        {stat.unit}
                      </Text>
                    </Text>
                    {stat.trend && (
                      <Text size="xs" className={trendColorStyles[config.trendColor]}>
                        {stat.trend}
                      </Text>
                    )}
                  </VStack>
                </StatusCard>
              </GridItem>
            );
          })
        )}
      </Grid>
    </Section>
  );
};
