import { TintedIcon, TintedIconProps } from '@/components/shared/icon/TintedIcon';
import { Text } from '@/components/ui/text';
import React from 'react';

import { View } from 'react-native';
interface FieldRowProps {
  icon?: TintedIconProps;
  label: string;
  children: React.ReactNode;
  isLast?: boolean;
}
export const FieldRow = ({ icon, label, children, isLast = false }: FieldRowProps) => {
  return (
    <>
      <View className="min-h-[50px] flex-row items-center gap-3 px-3.5">
        {icon && (
          <View className="h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
            <TintedIcon {...icon} />
          </View>
        )}
        <Text size="md" className="min-w-20 flex-shrink-0 font-medium text-neutral-500">
          {label}
        </Text>
        <View className="flex-1">{children}</View>
      </View>
      {!isLast && <View className="ml-[60px] h-px bg-neutral-100" />}
    </>
  );
};
