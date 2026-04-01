import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
} from '@/components/ui/form-control';
import { Text } from '@/components/ui/text';
import clsx from 'clsx';
import { Control, FieldValues, useFormState } from 'react-hook-form';
import { View } from 'react-native';
import { DynamicInput, DynamicInputProps, InputTypeRender } from '.';

interface DynamicInputFieldProps {
  control: Control<FieldValues>;
  input: DynamicInputProps;
  inputTypeRender?: InputTypeRender;
  isDisabled?: boolean;
}

export const DynamicInputField = ({
  control,
  input,
  inputTypeRender,
  isDisabled,
}: DynamicInputFieldProps) => {
  const { errors } = useFormState({ control, name: input.name });
  const error = errors[input.name!];

  return (
    <FormControl isInvalid={!!error}>
      <View className={clsx(['', input.className])}>
        {inputTypeRender !== 'native' && input.label && (
          <Text size="md" className="font-medium text-gray-900">
            {input.label}
          </Text>
        )}

        <DynamicInput
          {...input}
          control={control}
          inputTypeRender={inputTypeRender}
          isDisabled={isDisabled}
        />

        {error && (
          <View className="mt-0 items-end">
            <FormControlError>
              <FormControlErrorText className="text-right">
                {error.message as string}
              </FormControlErrorText>
            </FormControlError>
          </View>
        )}

        {input.helperText && (
          <View className="items-end p-0">
            <FormControlHelper>
              <FormControlHelperText size="xs" className="text-right">
                {input.helperText}
              </FormControlHelperText>
            </FormControlHelper>
          </View>
        )}
      </View>
    </FormControl>
  );
};
