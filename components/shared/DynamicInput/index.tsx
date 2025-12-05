import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { View } from 'react-native';

export interface DynamicInputProps {
  type?: InputTypes;
  label?: string;
  defaultValue?: string;
  name?: string;
  icon?: React.ElementType | React.ReactNode;
  placeholder?: string;
  rules?: any;
  control?: Control<FieldValues, any, FieldValues>;
  className?: string;
  group?: DynamicInputProps[];
}

const sizeInput = 'xl';

export const renderDynamicInput = (
  control: Control<FieldValues, any, FieldValues>,
  input: DynamicInputProps
) => (
  <View key={`view-${input.label}`} className={clsx(['gap-1', input.className && input.className])}>
    <Text key={`text-${input.label}`} size="md">
      {input.label}
    </Text>
    <DynamicInput key={`input-${input.label}`} control={control} {...input} />
  </View>
);

export const renderInputGroup = (
  control: Control<FieldValues, any, FieldValues>,
  group: DynamicInputProps[]
) => (
  <View key={`view-group-${group}`} className="flex flex-row gap-2">
    {group.map((input) => renderDynamicInput(control, input))}
  </View>
);

export const renderIcon = (icon: React.ElementType | React.ReactNode) => {
  return (
    <InputSlot className="pl-3">
      {React.isValidElement(icon) ? icon : <InputIcon as={icon as React.ElementType} />}
    </InputSlot>
  );
};

export const DynamicInput = ({
  control,
  type,
  label,
  icon,
  name,
  placeholder,
  rules,
}: DynamicInputProps) => {
  const handleSelectInput = (
    onBlur: () => void,
    onChange: (text: string) => void,
    value: string
  ) => {
    switch (type) {
      case InputTypes.TEXT:
        return (
          <Input size={sizeInput}>
            {icon && renderIcon(icon)}
            <InputField
              type="text"
              className="font-[Poppins_400Regular]"
              placeholder={placeholder}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          </Input>
        );

      case InputTypes.PASSWORD:
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        const handleShowPassoword = () => {
          setIsPasswordVisible((old) => !old);
        };

        return (
          <Input size={sizeInput}>
            {icon && renderIcon(icon)}

            <InputField
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder={placeholder}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
            <InputSlot className="pr-3" onPress={handleShowPassoword}>
              <InputIcon as={isPasswordVisible ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        );

      case InputTypes.NUMBER:
        return (
          <Input size={sizeInput}>
            {icon && renderIcon(icon)}
            <InputField
              keyboardType="numeric"
              type={'text'}
              placeholder={placeholder}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          </Input>
        );

      default:
        return <></>;
    }
  };

  return (
    <Controller
      control={control}
      name={name ?? ''}
      rules={rules}
      render={({ field: { onBlur, onChange, value } }) =>
        handleSelectInput(onBlur, onChange, value)
      }
    />
  );
};
