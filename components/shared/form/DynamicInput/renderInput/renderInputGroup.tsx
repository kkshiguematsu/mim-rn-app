import { View } from 'react-native';
import { InputTypeRender } from '..';
import { DynamicInputField } from '../renderDynamicInput';
import { DynamicInputProps } from './types';

export const renderInputGroup = (
  group: DynamicInputProps[],
  inputTypeRender?: InputTypeRender,
  isDisabled?: boolean
) => (
  <View className="flex flex-row gap-2">
    {group.map((input) => (
      <View key={input.name} className="flex-1">
        <DynamicInputField
          input={input}
          inputTypeRender={inputTypeRender}
          isDisabled={isDisabled}
        />
      </View>
    ))}
  </View>
);
