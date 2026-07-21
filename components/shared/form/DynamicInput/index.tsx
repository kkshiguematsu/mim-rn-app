import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { RenderBottomSheetInput } from './renderBottomSheetInputType';
import { RenderInputNative } from './renderInput/renderInputNative';
import { RenderInput } from './renderInput/renderInputType';
import { DynamicInputProps } from './renderInput/types';

export type InputTypeRender = 'normal' | 'bottomSheet' | 'native';

export const DynamicInput = ({
  control,
  type,
  icon,
  name,
  placeholder,
  selectItems,
  rules,
  isDisabled,
  inputTypeRender,
  renderComponent,
  mask,
}: DynamicInputProps & { control: Control<FieldValues> }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => {
        const baseProps = {
          type,
          icon,
          placeholder,
          selectItems,
          isDisabled,
          mask,
          ...field,
        };

        switch (inputTypeRender) {
          case 'bottomSheet':
            return RenderBottomSheetInput(baseProps);
          case 'native':
            return RenderInputNative({ ...baseProps, renderComponent });
          default:
            return <RenderInput {...baseProps} />;
        }
      }}
    />
  );
};
