import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { TintedIconProps } from '../../icon/TintedIcon';
import { renderBottomSheetInput } from './renderBottomSheetInputType';
import { RenderInputNative } from './renderInput/renderInputNative';
import { renderInput } from './renderInput/renderInputType';
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
  console.log('render input', name);
  const render = () => {
    switch (inputTypeRender) {
      case 'bottomSheet':
        return renderBottomSheetInput({
          type,
          value: defaultValue,
          placeholder,
          icon,
          selectItems,
          isDisabled,
          onBlur: () => {},
          onChange: () => {},
        });
      case 'native':
        return RenderInputNative({
          type,
          value: defaultValue,
          icon,
          placeholder,
          selectItems,
          renderComponent,
          onBlur: () => {},
          onChange: () => {},
        });
      default:
        return renderInput({
          type,
          value: defaultValue,
          icon,
          placeholder,
          selectItems,
          onBlur: () => {},
          onChange: () => {},
        });
    }
  };

  return (
    <Controller
      control={control}
      disabled={isDisabled}
      name={name ?? ''}
      rules={rules}
      render={({ field: { onBlur, onChange, value } }) => render()}
    />
  );
};
