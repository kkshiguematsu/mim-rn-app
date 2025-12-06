import { Text } from '@/components/ui/text';
import clsx from 'clsx';
import { Control, FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import { DynamicInput, DynamicInputProps } from '.';

export const renderDynamicInput = (
  control: Control<FieldValues, any, FieldValues>,
  input: DynamicInputProps
) => (
  <View key={`view-${input.label}`} className={clsx(['gap-1', input.className && input.className])}>
    <Text key={`text-${input.label}`} size="md">
      {input.label}
    </Text>
    <DynamicInput key={`input-${input.label}`} control={control} {...input} />
  </View>
);
