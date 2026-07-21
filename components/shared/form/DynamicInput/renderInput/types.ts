import { TintedIconProps } from '@/components/shared/icon/TintedIcon';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import React from 'react';
import { UseControllerProps } from 'react-hook-form';
import { DynamicSelectInputItem } from './renderSelectInput';

export const sizeInput = 'lg';

export type InputTypeRender = 'normal' | 'bottomSheet' | 'native';

type RenderComponentProps = {
  value?: any;
  onChange: (value: any) => void;
};

export interface DynamicInputProps extends Omit<UseControllerProps, 'control'> {
  className?: string;
  type?: InputTypes;
  label?: string;
  isDisabled?: boolean;
  icon?: React.ElementType | React.ReactNode;
  iconSection?: TintedIconProps;
  placeholder?: string;
  selectItems?: DynamicSelectInputItem[];
  group?: DynamicInputProps[];
  inputTypeRender?: InputTypeRender;
  renderComponent?: React.ComponentType<RenderComponentProps>;
  helperText?: string;
  mask?: string;
}
