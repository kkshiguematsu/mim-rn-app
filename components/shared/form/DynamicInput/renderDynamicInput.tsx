import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
} from '@/components/ui/form-control';
import { Text } from '@/components/ui/text';
import clsx from 'clsx';
import { useController, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { DynamicInput, InputTypeRender } from '.';
import { DynamicInputProps } from './renderInput/types';

interface DynamicInputFieldProps {
  input: DynamicInputProps;
  inputTypeRender?: InputTypeRender;
  isDisabled?: boolean;
}

export const DynamicInputField = ({
  input,
  inputTypeRender,
  isDisabled,
}: DynamicInputFieldProps) => {
  const { control } = useFormContext();

  const { fieldState } = useController({
    control,
    name: input.name,
  });

  const error = fieldState.error;

  return (
    <FormControl isDisabled={isDisabled} isInvalid={!!error} className="relative">
      <View className={clsx(['', input.className, inputTypeRender !== 'native' && 'mb-2'])}>
        {inputTypeRender !== 'native' && input.label && (
          <Text size="md" className="mb-1 font-medium">
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
          <View
            className={clsx([
              'absolute -bottom-1 right-0 items-end',
              inputTypeRender !== 'native' && '-bottom-5',
            ])}
          >
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
