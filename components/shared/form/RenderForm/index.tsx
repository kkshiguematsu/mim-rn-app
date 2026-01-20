import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { DynamicInputProps } from '../DynamicInput';
import { renderDynamicInput } from '../DynamicInput/renderDynamicInput';
import { renderInputGroup } from '../DynamicInput/renderInputGroup';

interface RenderFormProps {
  inputList: DynamicInputProps[];
  isBottomSheetInput?: boolean;
  isDisableForm?: boolean;
}

export const RenderForm = ({
  inputList,
  isBottomSheetInput = false,
  isDisableForm,
}: RenderFormProps) => {
  const { control, watch, formState } = useFormContext();
  const { errors } = formState;

  return (
    <View className="flex w-full flex-1 gap-3">
      {inputList.map((input: DynamicInputProps) => (
        <View key={`view-input-${input.label}-${Math.random()}`}>
          {input.group && input.group?.length > 0
            ? renderInputGroup(control, input.group, isBottomSheetInput, isDisableForm)
            : renderDynamicInput(control, input, isBottomSheetInput, isDisableForm)}
        </View>
      ))}
    </View>
  );
};
