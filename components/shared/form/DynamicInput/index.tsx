import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { TintedIconProps } from '../../icon/TintedIcon';
import { RenderBottomSheetInput } from './renderBottomSheetInputType';
import { RenderInputNative } from './renderInput/renderInputNative';
import { RenderInput } from './renderInput/renderInputType';
import { type DynamicSelectInputItem } from './renderInput/renderSelectInput';

export type InputTypeRender = 'normal' | 'bottomSheet' | 'native';

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
  iconSection?: TintedIconProps;
  placeholder?: string;
  rules?: any;
  selectItems?: DynamicSelectInputItem[];
  group?: DynamicInputProps[];
  inputTypeRender?: InputTypeRender;
  renderComponent?: React.ComponentType;
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
  isDisabled,
  inputTypeRender,
  renderComponent,
}: DynamicInputProps) => {
  return (
    <Controller
      control={control}
      disabled={isDisabled}
      name={name ?? ''}
      rules={rules}
      render={({ field }) => {
        const baseProps = {
          type,
          icon,
          placeholder,
          selectItems,
          isDisabled,
          ...field,
        };

        switch (inputTypeRender) {
          case 'bottomSheet':
            return RenderBottomSheetInput(baseProps);
          case 'native':
            return RenderInputNative({ ...baseProps, renderComponent });
          default:
            return RenderInput(baseProps);
        }
      }}
    />
  );
};
