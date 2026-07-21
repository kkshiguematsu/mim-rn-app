import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { IInputFieldProps } from '@gluestack-ui/core/lib/esm/input/creator/types';
import clsx from 'clsx';
import { Search } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface Props extends IInputFieldProps {
  value: string;
  placeholder?: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  hasFilter?: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  debounceDelay?: number;
}

export const SearchBar = ({
  value,
  placeholder,
  size = 'md',
  hasFilter,
  className,
  style,
  onChange,
  onFocus,
  onBlur,
  debounceDelay = 500,
}: Props) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, debounceDelay);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <Input style={style} size={size} className={clsx('w-full', className)}>
      <InputSlot className="pl-4">
        <InputIcon as={Search} />
      </InputSlot>

      <InputField
        value={localValue}
        onChangeText={setLocalValue}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
      />

      {hasFilter && <InputSlot className="pr-4">{hasFilter}</InputSlot>}
    </Input>
  );
};
