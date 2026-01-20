import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { renderBottomSheetInput } from './renderBottomSheetInputType';
import { renderInput } from './renderInputType';
import { type DynamicSelectInputItem } from './renderSelectInput';
export interface DynamicInputProps {
  title?: string;
  className?: string;
  control?: Control<FieldValues, any, FieldValues>;
  type?: InputTypes;
  label?: string;
  defaultValue?: string;
  isDisabled?: boolean;
  name?: string;
  icon?: React.ElementType | React.ReactNode;
  placeholder?: string;
  rules?: any;
  selectItems?: DynamicSelectInputItem[];
  group?: DynamicInputProps[];
  isBottomSheetInput?: boolean;
}

export const sizeInput = 'lg';

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
  isDisabled,
}: DynamicInputProps) => {
  return (
    <Controller
      control={control}
      disabled={isDisabled}
      name={name ?? ''}
      rules={rules}
      render={({ field: { onBlur, onChange, value } }) =>
        isBottomSheetInput
          ? renderBottomSheetInput({
              type,
              value,
              placeholder,
              icon,
              selectItems,
              isDisabled,
              onBlur: onBlur,
              onChange: onChange,
            })
          : renderInput({
              type,
              value,
              icon,
              placeholder,
              selectItems,
              onBlur: onBlur,
              onChange: onChange,
            })
      }
    />
  );
};
