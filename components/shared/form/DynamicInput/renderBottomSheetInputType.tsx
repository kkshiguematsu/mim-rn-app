import { BottomSheetInput } from '@/components/ui/bottomsheet';
import { Icon } from '@/components/ui/icon';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { applyMask } from '@/utils/formMasks.utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { DynamicInputProps } from './renderInput/types';

export interface renderBottomSheetInputProps extends Pick<
  DynamicInputProps,
  'type' | 'placeholder' | 'icon' | 'selectItems' | 'isDisabled' | 'mask'
> {
  value?: string;
  onBlur: () => void;
  onChange: (value: string) => void;
}

export function RenderBottomSheetInput({
  type,
  value = '',
  placeholder,
  icon,
  selectItems,
  mask,
  isDisabled,
  onBlur,
  onChange,
}: renderBottomSheetInputProps) {
  const handleChange = (text: string) => {
    const maskedValue = mask ? applyMask(text, mask) : text;
    onChange(maskedValue);
  };

  switch (type) {
    case InputTypes.TEXT:
      return (
        <BottomSheetInput
          size="lg"
          keyboardType="default"
          value={value}
          placeholder={placeholder}
          disabled={isDisabled}
          onBlur={onBlur}
          onChangeText={handleChange}
        />
      );
    case InputTypes.EMAIL:
      return (
        <BottomSheetInput
          size="lg"
          keyboardType="email-address"
          value={value}
          placeholder={placeholder}
          disabled={isDisabled}
          onBlur={onBlur}
          onChangeText={handleChange}
        />
      );
    case InputTypes.PASSWORD:
      const [visible, setVisible] = useState(false);

      return (
        <View className="flex-row items-center overflow-hidden rounded-2xl border border-background-300 bg-neutral-300 dark:bg-zinc-900">
          <BottomSheetInput
            size="lg"
            className="flex-1 bg-transparent"
            secureTextEntry={!visible}
            value={value}
            placeholder={placeholder}
            editable={!isDisabled}
            onBlur={onBlur}
            onChangeText={handleChange}
          />

          <Pressable className="px-4" onPress={() => setVisible((v) => !v)}>
            {visible ? (
              <Icon as={EyeIcon} size="md" className="text-typography-500" />
            ) : (
              <Icon as={EyeOffIcon} size="md" className="text-typography-500" />
            )}
          </Pressable>
        </View>
      );

    case InputTypes.NUMBER:
      return (
        <BottomSheetInput
          size="lg"
          keyboardType="numeric"
          value={value}
          placeholder={placeholder}
          disabled={isDisabled}
          onBlur={onBlur}
          onChangeText={handleChange}
        />
      );

    default:
      return <></>;
  }
}
