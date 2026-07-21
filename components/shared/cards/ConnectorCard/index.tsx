import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Connector, CONNECTOR_STATUS_MAP } from '@/types/charger/charger.type';
import React from 'react';
import { View } from 'react-native';
import { TintedBadge } from '../../badge/TintedBadge';

interface ConnectorCardProps {
  connector: Connector;
  index: number;
}

export const ConnectorCard = ({ connector, index }: ConnectorCardProps) => {
  const { label, color } =
    CONNECTOR_STATUS_MAP[connector.status] ?? CONNECTOR_STATUS_MAP['UNAVAILABLE'];

  return (
    <View className="w-44 gap-4 rounded-3xl bg-neutral-100 p-4 dark:bg-neutral-800">
      <HStack className="justify-end">
        <TintedBadge label={label} color={color} size="xs" />
      </HStack>

      <HStack className="items-end gap-2 self-baseline">
        <Text size="3xl" className="font-bold tracking-tight text-neutral-900 dark:text-white">
          {connector.maxPowerKw}
        </Text>

        <Text size="lg" className="text-neutral-500">
          kW
        </Text>
      </HStack>
      <TintedBadge label={connector.type} color="blue" size="xs" />
    </View>
  );
};
