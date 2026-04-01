import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { DynamicInputProps, InputTypeRender } from '../DynamicInput';
import { DynamicInputField } from '../DynamicInput/renderDynamicInput';
import { renderInputGroup } from '../DynamicInput/renderInput/renderInputGroup';

interface RenderFormProps {
  inputList: DynamicInputProps[];
  inputTypeRender?: InputTypeRender;
  isDisableForm?: boolean;
}

export const RenderForm = ({ inputList, inputTypeRender, isDisableForm }: RenderFormProps) => {
  const { control, watch, formState } = useFormContext();
  const { errors } = formState;

  return (
    <View className="flex w-full flex-1 gap-3">
      {inputList.map((input: DynamicInputProps) => (
        <View key={`view-input-${input.label}-${Math.random()}`}>
          {input.group && input.group?.length > 0 ? (
            renderInputGroup(control, input.group, inputTypeRender, isDisableForm)
          ) : (
            <DynamicInputField
              control={control}
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
