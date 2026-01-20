import { Control, FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import { DynamicInputProps } from '.';
import { renderDynamicInput } from './renderDynamicInput';

export const renderInputGroup = (
  control: Control<FieldValues, any, FieldValues>,
  group: DynamicInputProps[],
  isBottomSheetInput?: boolean,
  isDisabled?: boolean
) => (
  <View className="flex flex-row gap-2">
    {group.map((input) => (
      <View key={input.name} className="flex-1">
        {renderDynamicInput(control, input, isBottomSheetInput, isDisabled)}
      </View>
    ))}
  </View>
);
