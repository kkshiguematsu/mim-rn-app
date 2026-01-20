// renderBottomSheetInput.tsx
import { BottomSheetInput } from '@/components/ui/bottomsheet';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { DynamicInputProps } from '.';

export interface renderBottomSheetInputProps extends Pick<
  DynamicInputProps,
  'type' | 'placeholder' | 'icon' | 'selectItems' | 'isDisabled'
> {
  value?: string;
  onBlur: () => void;
  onChange: (value: string) => void;
}

export function renderBottomSheetInput({
  type,
  value = '',
  placeholder,
  icon,
  selectItems,
  isDisabled,
  onBlur,
  onChange,
}: renderBottomSheetInputProps) {
  console.log(isDisabled);
  switch (type) {
    case InputTypes.TEXT:
      return (
        <BottomSheetInput
          keyboardType="default"
          value={value}
          placeholder={placeholder}
          disabled={isDisabled}
          onBlur={onBlur}
          onChangeText={onChange}
        />
      );

    case InputTypes.NUMBER:
      return (
        <BottomSheetInput
          keyboardType="numeric"
          value={value}
          placeholder={placeholder}
          disabled={isDisabled}
          onBlur={onBlur}
          onChangeText={onChange}
        />
      );

    default:
      return <></>;
  }
}
