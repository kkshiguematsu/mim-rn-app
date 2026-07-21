import { View } from 'react-native';
import { InputTypeRender } from '../DynamicInput';
import { DynamicInputField } from '../DynamicInput/renderDynamicInput';
import { renderInputGroup } from '../DynamicInput/renderInput/renderInputGroup';
import { DynamicInputProps } from '../DynamicInput/renderInput/types';

interface RenderFormProps {
  inputList: DynamicInputProps[];
  inputTypeRender?: InputTypeRender;
  isDisableForm?: boolean;
}

export const RenderForm = ({ inputList, inputTypeRender, isDisableForm }: RenderFormProps) => {
  return (
    <View className="flex w-full gap-3">
      {inputList.map((input: DynamicInputProps) => (
        <View key={`view-input-${input.label}-${Math.random()}`}>
          {input.group && !!input.group.length ? (
            renderInputGroup(input.group, inputTypeRender, isDisableForm)
          ) : (
            <DynamicInputField
              input={input}
              inputTypeRender={inputTypeRender}
              isDisabled={isDisableForm}
            />
          )}
        </View>
      ))}
    </View>
  );
};
