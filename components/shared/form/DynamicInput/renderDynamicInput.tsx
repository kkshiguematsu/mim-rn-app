import { Text } from '@/components/ui/text';
import clsx from 'clsx';
import { Control, FieldValues } from 'react-hook-form';
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
}: DynamicInputFieldProps) => (
  <View className={clsx(['gap-1', input.className])}>
    {inputTypeRender !== 'native' && <Text size="md">{input.label}</Text>}
    <DynamicInput
      {...input}
      control={control}
      inputTypeRender={inputTypeRender}
      isDisabled={isDisabled}
    />
  </View>
);

export const renderDynamicInput = (
  control: Control<FieldValues, any, FieldValues>,
  input: DynamicInputProps,
  inputTypeRender?: InputTypeRender,
  isDisabled?: boolean
) => (
  <View key={`view-${input.label}`} className={clsx(['gap-1', input.className && input.className])}>
    {inputTypeRender !== 'native' && (
      <Text key={`text-${input.label}`} size="md">
        {input.label}
      </Text>
    )}
    <DynamicInput
      {...input}
      key={`input-${input.label}`}
      control={control}
      inputTypeRender={inputTypeRender}
      isDisabled={isDisabled}
    />
  </View>
);
