import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import React, { useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { renderIcon } from './renderIcon';
export * from './renderDynamicInput';
export * from './renderIcon';
export * from './renderInputGroup';
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

      case InputTypes.EMAIL:
        return (
          <Input size={sizeInput}>
            {icon && renderIcon(icon)}
            <InputField
              type="text"
              keyboardType="email-address"
              placeholder={placeholder}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          </Input>
        );

      case InputTypes.SELECT:
      case InputTypes.DATE:

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
