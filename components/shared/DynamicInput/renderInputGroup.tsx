import { Control, FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import { DynamicInputProps } from '.';
import { renderDynamicInput } from './renderDynamicInput';

export const renderInputGroup = (
  control: Control<FieldValues, any, FieldValues>,
  group: DynamicInputProps[]
) => (
  <View key={`view-group-${Math.random()}`} className="flex flex-row gap-2">
    {group.map((input) => renderDynamicInput(control, input))}
  </View>
);
