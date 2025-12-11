import { BottomSheetInput } from '@/components/ui/bottomsheet';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { formatDateInput } from '@/utils/formatDate';
import React, { useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { renderIcon } from './renderIcon';
import { renderSelectInput, type DynamicSelectInputItem } from './renderSelectInput';
export interface DynamicInputProps {
  title?: string;
  className?: string;
  control?: Control<FieldValues, any, FieldValues>;
  type?: InputTypes;
  label?: string;
  defaultValue?: string;
  name?: string;
  icon?: React.ElementType | React.ReactNode;
  placeholder?: string;
  rules?: any;
  selectItems?: DynamicSelectInputItem[];
  group?: DynamicInputProps[];
  isBottomSheetInput?: boolean;
}

export const sizeInput = 'xl';

export const DynamicInput = ({
  control,
  type,
  label,
  icon,
  name,
  placeholder,
  defaultValue,
  selectItems,
  rules,
  isBottomSheetInput,
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
              value={defaultValue ?? ''}
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
              value={defaultValue ?? ''}
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
              defaultValue={defaultValue}
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
              value={defaultValue ?? ''}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          </Input>
        );

      case InputTypes.SELECT:
        return renderSelectInput(onChange, placeholder ?? '', selectItems ?? [], defaultValue);

      case InputTypes.DATE:
        return (
          <Input size={sizeInput}>
            {icon && renderIcon(icon)}

            <InputField
              keyboardType="numeric"
              placeholder={placeholder ?? 'dd/mm/aaaa'}
              value={defaultValue ?? ''}
              onBlur={onBlur}
              onChangeText={(text) => {
                const formatted = formatDateInput(text);
                onChange(formatted);
              }}
              maxLength={10}
            />
          </Input>
        );

      default:
        return <></>;
    }
  };

  const handleSelectBottomSheetInput = (
    onBlur: () => void,
    onChange: (text: string) => void,
    value: string
  ) => {
    switch (type) {
      case InputTypes.TEXT:
        return (
          <BottomSheetInput
            keyboardType={'default'}
            size={sizeInput}
            placeholder={placeholder}
            value={defaultValue ?? ''}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        );
      case InputTypes.NUMBER:
        return (
          <BottomSheetInput
            keyboardType={'numeric'}
            size={sizeInput}
            placeholder={placeholder}
            value={defaultValue ?? ''}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        );
      default:
        return <></>;
    }
  };
  console.log({ isBottomSheetInput });

  return (
    <Controller
      control={control}
      name={name ?? ''}
      rules={rules}
      render={({ field: { onBlur, onChange, value } }) =>
        isBottomSheetInput
          ? handleSelectBottomSheetInput(onBlur, onChange, value ?? '')
          : handleSelectInput(onBlur, onChange, value ?? '')
      }
    />
  );
};
