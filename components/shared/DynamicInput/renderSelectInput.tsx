import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/components/ui/select';
import { ChevronDown } from 'lucide-react-native';
import React from 'react';
import { sizeInput } from '.';

export type DynamicSelectInputItem = {
  isDisabled?: boolean;
  label: string;
  value: string;
};

export const renderSelectInput = (
  onChange: (text: string) => void,
  placeholder: string,
  selectItems: DynamicSelectInputItem[],
  defaultValue?: string
) => {
  const selectedItem = selectItems.find((item) => item.value === defaultValue);

  return (
    <Select isDisabled={false} defaultValue={selectedItem?.label} onValueChange={onChange}>
      <SelectTrigger size={sizeInput}>
        <SelectInput placeholder={placeholder} />
        <SelectIcon as={ChevronDown} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>

          {selectItems.map((item) => (
            <SelectItem key={item.value} label={item.label} value={item.value} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};
