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
import { ScrollView } from 'react-native';
import { sizeInput } from './types';

export type DynamicSelectInputItem = {
  isDisabled?: boolean;
  label: string;
  value: string;
};

export const renderSelectInput = (
  value: string,
  placeholder: string,
  selectItems: DynamicSelectInputItem[],
  onChange: (text: string) => void
) => {
  return (
    <Select isDisabled={false} selectedValue={value} onValueChange={onChange}>
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

          <ScrollView className="max-h-[300px] w-full">
            {selectItems.map((item) => (
              <SelectItem
                key={item.value}
                label={item.label}
                value={item.value}
                isDisabled={item.isDisabled}
              />
            ))}
          </ScrollView>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};
