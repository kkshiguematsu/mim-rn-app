// renderInput.tsx
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { formatDateInput } from '@/utils/formatDate';
import React, { useState } from 'react';
import { DynamicInputProps, sizeInput } from '.';
import { renderIcon } from './renderIcon';
import { renderSelectInput } from './renderSelectInput';

export interface RenderInputTypeProps extends Pick<
  DynamicInputProps,
  'type' | 'placeholder' | 'icon' | 'selectItems'
> {
  value?: string;
  onBlur: () => void;
  onChange: (value: string) => void;
}

export function renderInput({
  type,
  value = '',
  icon,
  placeholder,
  selectItems,
  onBlur,
  onChange,
}: RenderInputTypeProps) {
  switch (type) {
    case InputTypes.TEXT:
      return (
        <Input size={sizeInput}>
          {icon && renderIcon(icon)}
          <InputField
            value={value}
            placeholder={placeholder}
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
            value={value}
            keyboardType="email-address"
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        </Input>
      );

    case InputTypes.PASSWORD: {
      const [visible, setVisible] = useState(false);

      return (
        <Input size={sizeInput}>
          {icon && renderIcon(icon)}
          <InputField
            type={visible ? 'text' : 'password'}
            value={value}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
          />
          <InputSlot className="pr-3" onPress={() => setVisible((v) => !v)}>
            <InputIcon as={visible ? EyeIcon : EyeOffIcon} />
          </InputSlot>
        </Input>
      );
    }

    case InputTypes.NUMBER:
      return (
        <Input size={sizeInput}>
          {icon && renderIcon(icon)}
          <InputField
            keyboardType="numeric"
            value={value}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        </Input>
      );

    case InputTypes.DATE:
      return (
        <Input size={sizeInput}>
          {icon && renderIcon(icon)}
          <InputField
            keyboardType="numeric"
            value={value}
            placeholder={placeholder ?? 'dd/mm/aaaa'}
            maxLength={10}
            onBlur={onBlur}
            onChangeText={(text) => onChange(formatDateInput(text))}
          />
        </Input>
      );

    case InputTypes.SELECT:
      return renderSelectInput(value, placeholder ?? '', selectItems ?? [], onChange);

    default:
      return <></>;
  }
}
