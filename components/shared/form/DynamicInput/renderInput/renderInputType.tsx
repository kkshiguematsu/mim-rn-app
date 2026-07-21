import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { applyMask } from '@/utils/formMasks.utils';
import React, { useState } from 'react';
import { renderIcon } from '../renderIcon';
import { renderSelectInput } from './renderSelectInput';
import { DynamicInputProps, sizeInput } from './types';

export interface RenderInputTypeProps extends Pick<
  DynamicInputProps,
  'type' | 'placeholder' | 'icon' | 'selectItems' | 'mask' | 'renderComponent'
> {
  value?: string;
  onBlur: () => void;
  onChange: (value: string) => void;
}

export function RenderInput({
  type,
  value = '',
  icon,
  placeholder,
  selectItems,
  mask,
  onBlur,
  onChange,
}: RenderInputTypeProps) {
  const handleChange = (text: string) => {
    const maskedValue = mask ? applyMask(text, mask) : text;
    onChange(maskedValue);
  };

  switch (type) {
    case InputTypes.TEXT:
      return (
        <Input size={sizeInput}>
          {icon && renderIcon(icon)}
          <InputField
            value={value}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={handleChange}
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
            onChangeText={handleChange}
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
            onChangeText={handleChange}
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
            onChangeText={handleChange}
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
            onChangeText={handleChange}
          />
        </Input>
      );

    case InputTypes.SELECT:
      return renderSelectInput(value, placeholder ?? '', selectItems ?? [], onChange);

    case InputTypes.TEXTAREA:
      return (
        <Textarea size={sizeInput}>
          {icon && renderIcon(icon)}
          <TextareaInput
            multiline
            textAlignVertical="top"
            value={value}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={handleChange}
          />
        </Textarea>
      );

    default:
      return <></>;
  }
}
