import { Text } from '@/components/ui/text';
import React from 'react';

import { Heading } from '@/components/ui/heading';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@/components/ui/slider';
import { Info } from 'lucide-react-native';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { InfoBanner } from '../../banner/InfoBanner';
import { TabNavigation } from '../../buttons/TabNavigation';
import { DefaultCard } from '../DefaultCard';
import { PresetButton } from './PresetButton';

const CHARGE_LIMIT_PRESETS = [60, 80, 90, 100] as const;

const TAB_OPTIONS = ['Porcentagem', 'Valor (R$)', 'kWh'] as const;
type TabOptions = (typeof TAB_OPTIONS)[number];

const TAB_UI_CONFIG = {
  Porcentagem: {
    unit: '%',
    formatValue: (v: number) => `${v}%`,
    info: () => '~ 42min restantes - R$ 4,20 estimado',
    subInfo: (v: number) =>
      v <= 80
        ? `Parar em ${v}% preserva a saúde da bateria a longo prazo e é o recomendado para uso diário.`
        : `Carga completa, ideal antes de viagens longas.`,
  },
  'Valor (R$)': {
    unit: 'R$',
    formatValue: (v: number) => `R$ ${v}`,
    info: () => '~ 48kWh - 150 km de autonomia',
    subInfo: (v: number) => `Carregamento para ao atingir R$ ${v},00.`,
  },
  kWh: {
    unit: 'kWh',
    formatValue: (v: number) => `${v} kWh`,
    info: () => '~ +126kWh - R$ 60,00 estimado',
    subInfo: (v: number) => `Adicionar ${v} kWh e encerrar automaticamente.`,
  },
} satisfies Record<TabOptions, object>;

interface ChargeLimitCardProps {
  limit: number;
  onLimitChange: (value: number) => void;
}

export const ChargeLimitCard = ({ limit, onLimitChange }: ChargeLimitCardProps) => {
  const [selectedTab, setSelectedTab] = React.useState<TabOptions>('Porcentagem');

  const nativeGesture = Gesture.Native();
  const ui = TAB_UI_CONFIG[selectedTab];

  const handleTabChange = (tab: TabOptions) => {
    setSelectedTab(tab);
  };

  return (
    <DefaultCard className="gap-6">
      <Text size="lg" className="font-semibold text-black dark:text-white">
        Limite de carregamento
      </Text>

      <TabNavigation tabs={TAB_OPTIONS} onTabChange={handleTabChange} />

      <View className="flex justify-center">
        <Heading size="4xl" className="text-center font-bold">
          {limit}
          <Text size="xl" className="font-normal text-neutral-400">
            {ui.unit}
          </Text>
        </Heading>
        <Text size="sm" className="text-center text-neutral-400">
          {ui.info()}
        </Text>
      </View>

      <GestureDetector gesture={nativeGesture}>
        <View>
          <Slider
            value={limit}
            defaultValue={100}
            size="lg"
            step={10}
            orientation="horizontal"
            maxValue={100}
            onChange={onLimitChange}
          >
            <SliderTrack>
              <SliderFilledTrack className="bg-green-500 data-[active=true]:bg-green-500 data-[focus=true]:bg-green-500" />
            </SliderTrack>
            <SliderThumb className="bg-white data-[active=true]:bg-white data-[focus=true]:bg-white" />
          </Slider>
        </View>
      </GestureDetector>

      <View className="flex-row gap-2">
        {CHARGE_LIMIT_PRESETS.map((preset) => (
          <PresetButton
            key={preset}
            preset={preset}
            unit={ui.unit}
            isActive={limit === preset}
            onPress={() => onLimitChange(preset)}
          />
        ))}
      </View>

      <InfoBanner variant="success" text={ui.subInfo(limit)} icon={Info} />
    </DefaultCard>
  );
};
