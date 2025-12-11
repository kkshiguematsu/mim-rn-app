import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { DynamicInputProps } from '../DynamicInput';
import { renderDynamicInput } from '../DynamicInput/renderDynamicInput';
import { renderInputGroup } from '../DynamicInput/renderInputGroup';

interface RenderFormProps {
  inputList: DynamicInputProps[];
  isBottomSheetInput?: boolean;
}

export const RenderForm = ({ inputList, isBottomSheetInput = false }: RenderFormProps) => {
  const { control, watch, formState } = useFormContext();
  const { errors } = formState;

  return (
    <View className="flex w-full flex-1 gap-3">
      {inputList.map((input: DynamicInputProps) => (
        <View key={`view-input-${input.label}`}>
          {input.group && input.group?.length > 0
            ? renderInputGroup(control, input.group, isBottomSheetInput)
            : renderDynamicInput(control, input, isBottomSheetInput)}
        </View>
      ))}
    </View>
  );
};
