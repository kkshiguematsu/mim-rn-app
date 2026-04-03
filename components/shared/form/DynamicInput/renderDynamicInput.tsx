import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
} from '@/components/ui/form-control';
import { Text } from '@/components/ui/text';
import clsx from 'clsx';
import { Control, FieldValues, useController } from 'react-hook-form';
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
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name: input.name,
    rules: input.rules,
  });

  return (
    <FormControl isInvalid={!!error} className="relative">
      <View className={clsx(['', input.className, inputTypeRender !== 'native' && 'mb-2'])}>
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
          <View className="absolute -bottom-1 right-0 items-end">
            <FormControlError>
              <FormControlErrorText size="xs" className="text-right">
                {error.message as string}
              </FormControlErrorText>
            </FormControlError>
          </View>
        )}

        {input.helperText && !error && (
          <View className="absolute -bottom-1 right-0 p-0">
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
