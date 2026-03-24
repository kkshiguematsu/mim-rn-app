import { StatusCard } from '@/components/shared/cards/StatusCard';
import { trendColorStyles } from '@/components/shared/cards/StatusCard/styles';
import { TailwindColor } from '@/components/shared/icon/TintedIcon/styles';
import { Grid, GridItem } from '@/components/ui/grid';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { MonthlyType } from '@/types/dashboard/mounthly/mounthly.type';
import { Gauge, Leaf, TrendingUp, Zap } from 'lucide-react-native';
import { Section } from '../Section';

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

export const monthlyStatsMock: MonthlyType = {
  month: 'Março',
  stats: [
    {
      value: '12',
      label: 'Carregamentos',
      trend: '↑ +2 vs fevereiro',
    },
    {
      value: '285',
      unit: 'kWh',
      label: 'Energia total',
      trend: 'Média 23,7 kWh',
    },
    {
      value: 'R$ 342',
      label: 'Gasto total',
      trend: 'Média R$ 28,50',
    },
    {
      value: '42',
      unit: 'kg',
      label: 'CO₂ evitado',
      trend: '↑ bom trabalho',
    },
  ],
};

export const MounthDashboardSection = () => {
  return (
    <Section title="Fevereiro em números">
      <Grid className="gap-4" _extra={{ className: 'grid-cols-2' }}>
        {monthlyStatsMock.stats.map((stat, index) => {
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
                  <Text size="xs" className={trendColorStyles[config.trendColor]}>
                    {stat.trend}
                  </Text>
                </VStack>
              </StatusCard>
            </GridItem>
          );
        })}
      </Grid>
    </Section>
  );
};
