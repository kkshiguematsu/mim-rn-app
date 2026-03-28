import { Control, FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import { DynamicInputProps, InputTypeRender } from '..';
import { renderDynamicInput } from '../renderDynamicInput';

export const renderInputGroup = (
  control: Control<FieldValues, any, FieldValues>,
  group: DynamicInputProps[],
  inputTypeRender?: InputTypeRender,
  isDisabled?: boolean
) => (
  <View className="flex flex-row gap-2">
    {group.map((input) => (
      <View key={input.name} className="flex-1">
        {renderDynamicInput(control, input, inputTypeRender, isDisabled)}
      </View>
    ))}
  </View>
);
