import { Text } from '@/components/ui/text';
import React, { useRef } from 'react';

import { Info } from 'lucide-react-native';
import { Pressable, TextInput, View } from 'react-native';
import { InfoBanner } from '../../banner/InfoBanner';
import { TabNavigation } from '../../buttons/TabNavigation';
import { DefaultCard } from '../DefaultCard';
import { PresetButton } from './PresetButton';

const CHARGE_LIMIT_PRESETS = [60, 80, 90, 100] as const;

const TAB_OPTIONS = [
  { label: 'Valor', value: 'value' },
  { label: 'kWh', value: 'kwh' },
] as const;

export type TabOptions = (typeof TAB_OPTIONS)[number]['value'];

const TAB_UI_CONFIG = {
  // Porcentagem: {
  //   unit: '%',
  //   formatValue: (v: number) => `${v}%`,
  //   info: () => '~ 42min restantes - R$ 4,20 estimado',
  //   subInfo: (v: number) =>
  //     v <= 80
  //       ? `Parar em ${v}% preserva a saúde da bateria a longo prazo e é o recomendado para uso diário.`
  //       : `Carga completa, ideal antes de viagens longas.`,
  // },
  value: {
    unit: 'R$',
    formatValue: (v: number) => `R$ ${v}`,
    info: () => '~ 48kWh - 150 km de autonomia',
    subInfo: (v: number) => `Carregamento para ao atingir R$ ${v},00.`,
  },
  kwh: {
    unit: 'kWh',
    formatValue: (v: number) => `${v} kWh`,
    info: () => '~ +126kWh - R$ 60,00 estimado',
    subInfo: (v: number) => `Adicionar ${v} kWh e encerrar automaticamente.`,
  },
} satisfies Record<TabOptions, object>;

interface ChargeLimitCardProps {
  limit: number;
  limitType: TabOptions;
  onLimitChange: (value: number) => void;
  onLimitTypeChange: (type: TabOptions) => void;
}

export const ChargeLimitCard = ({
  limit,
  limitType,
  onLimitChange,
  onLimitTypeChange,
}: ChargeLimitCardProps) => {
  const tabConfig = TAB_UI_CONFIG[limitType];

  const inputRef = useRef<TextInput>(null);

  const handleTabChange = (tab: TabOptions) => {
    onLimitTypeChange(tab);
  };

  return (
    <DefaultCard className="gap-6">
      <Text size="lg" className="font-semibold text-black dark:text-white">
        Limite de carregamento
      </Text>

      <TabNavigation tabs={TAB_OPTIONS} onTabChange={handleTabChange} />

      <Pressable onPress={() => inputRef.current?.focus()}>
        <View className="flex justify-center">
          <View className="flex-row items-baseline justify-center">
            <TextInput
              ref={inputRef}
              value={String(limit)}
              onChangeText={(text) => {
                const parsed = Number(text.replace(/[^0-9]/g, ''));
                onLimitChange(isNaN(parsed) ? 0 : parsed);
              }}
              keyboardType="numeric"
              className="text-center font-bold text-black dark:text-white"
              style={{ fontSize: 36, fontWeight: 'bold', minWidth: 60 }}
              caretHidden={false}
              cursorColor="#22c55e"
            />
            <Text size="xl" className="font-normal text-neutral-400">
              {tabConfig.unit}
            </Text>
          </View>
          <Text size="sm" className="text-center text-neutral-400">
            {tabConfig.info()}
          </Text>
        </View>
      </Pressable>

      <View className="flex-row gap-2">
        {CHARGE_LIMIT_PRESETS.map((preset) => (
          <PresetButton
            key={preset}
            preset={preset}
            unit={tabConfig.unit}
            isActive={limit === preset}
            onPress={() => onLimitChange(preset)}
          />
        ))}
      </View>

      <InfoBanner variant="success" text={tabConfig.subInfo(limit)} icon={Info} />
    </DefaultCard>
  );
};
