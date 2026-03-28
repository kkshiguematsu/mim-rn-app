import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { formatDateInput } from '@/utils/Date.utils';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { DynamicInputProps } from '..';
import { renderIcon } from '../renderIcon';
import { renderSelectInput } from './renderSelectInput';

export interface RenderInputTypeProps extends Pick<
  DynamicInputProps,
  'type' | 'placeholder' | 'icon' | 'selectItems' | 'renderComponent'
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

  switch (type) {
    case InputTypes.TEXT:
      return (
        <View className="flex-row items-center">
          {icon && renderIcon(icon)}
          <TextInput {...commonProps} onChangeText={onChange} returnKeyType="next" />
        </View>
      );

    case InputTypes.EMAIL:
      return (
        <View className="flex-row items-center">
          {icon && renderIcon(icon)}
          <TextInput
            {...commonProps}
            keyboardType="email-address"
            onChangeText={onChange}
            returnKeyType="next"
          />
        </View>
      );

    case InputTypes.PASSWORD:
      return (
        <View className="flex-row items-center">
          {icon && renderIcon(icon)}
          <TextInput {...commonProps} secureTextEntry={!visible} onChangeText={onChange} />

          <Pressable onPress={() => setVisible((v) => !v)}>
            {visible ? <EyeIcon /> : <EyeOffIcon />}
          </Pressable>
        </View>
      );

    case InputTypes.NUMBER:
      return (
        <View className="flex-row items-center">
          {icon && renderIcon(icon)}
          <TextInput {...commonProps} keyboardType="numeric" onChangeText={onChange} />
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
            onChangeText={(text) => onChange(formatDateInput(text))}
          />
        </View>
      );

    case InputTypes.SELECT:
      return renderSelectInput(value, placeholder ?? '', selectItems ?? [], onChange);

    case InputTypes.SELECTBUTTON:
      return (
        <View className="flex-row items-center">{RenderComponent && <RenderComponent />}</View>
      );

    case InputTypes.PICKER:
      return (
        <View className="flex-row items-center">{RenderComponent && <RenderComponent />}</View>
      );

    default:
      return <></>;
  }
}
