import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { applyMask } from '@/utils/formMasks.utils';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { renderIcon } from '../renderIcon';
import { renderSelectInput } from './renderSelectInput';
import { DynamicInputProps } from './types';

const sizeInput = 'md';

export interface RenderInputTypeProps extends Pick<
  DynamicInputProps,
  'type' | 'placeholder' | 'icon' | 'selectItems' | 'renderComponent' | 'mask'
> {
  value?: string;
  onBlur: () => void;
  onChange: (value: string) => void;
}

export function RenderInputNative({
  type,
  value = '',
  icon,
  placeholder,
  selectItems,
  renderComponent,
  mask,
  onBlur,
  onChange,
}: RenderInputTypeProps) {
  const [visible, setVisible] = useState(false);

  const baseStyle = 'py-3.5 text-right text-[14px] text-neutral-900 w-full';

  const commonProps = {
    value,
    placeholder,
    placeholderTextColor: '#a8a8a4',
    onBlur,
    style: { fontFamily: 'Geist' },
    className: baseStyle,
  };

  const RenderComponent = renderComponent ? renderComponent : null;

  const handleChange = (text: string) => {
    const maskedValue = mask ? applyMask(text, mask) : text;
    onChange(maskedValue);
  };

  switch (type) {
    case InputTypes.TEXT:
      return (
        <Input size={sizeInput} className="border-0 bg-transparent">
          {icon && renderIcon(icon)}
          <InputField
            value={value}
            placeholder={placeholder}
            textAlign="right"
            onBlur={onBlur}
            onChangeText={handleChange}
          />
        </Input>
      );

    case InputTypes.EMAIL:
      return (
        <View className="flex-row items-center">
          {icon && renderIcon(icon)}
          <TextInput
            {...commonProps}
            keyboardType="email-address"
            onChangeText={handleChange}
            returnKeyType="next"
          />
        </View>
      );

    case InputTypes.PASSWORD:
      return (
        <View className="flex-row items-center">
          {icon && renderIcon(icon)}
          <TextInput {...commonProps} secureTextEntry={!visible} onChangeText={handleChange} />

          <Pressable onPress={() => setVisible((v) => !v)}>
            {visible ? <EyeIcon /> : <EyeOffIcon />}
          </Pressable>
        </View>
      );

    case InputTypes.NUMBER:
      return (
        <View className="flex-row items-center">
          {icon && renderIcon(icon)}
          <TextInput {...commonProps} keyboardType="numeric" onChangeText={handleChange} />
        </View>
      );

    case InputTypes.DATE:
      return (
        <View className="flex-row items-center">
          {icon && renderIcon(icon)}
          <TextInput
            {...commonProps}
            keyboardType="numeric"
            maxLength={10}
            placeholder={placeholder ?? 'dd/mm/aaaa'}
            onChangeText={handleChange}
          />
        </View>
      );

    case InputTypes.SELECT:
      return renderSelectInput(value, placeholder ?? '', selectItems ?? [], onChange);

    case InputTypes.SELECTBUTTON:
      return (
        <View className="flex-row items-center">
          {RenderComponent && <RenderComponent value={value} onChange={onChange} />}
        </View>
      );

    case InputTypes.PICKER:
      return (
        <View className="flex-row items-center">
          {RenderComponent && <RenderComponent value={value} onChange={onChange} />}
        </View>
      );

    default:
      return <></>;
  }
}
