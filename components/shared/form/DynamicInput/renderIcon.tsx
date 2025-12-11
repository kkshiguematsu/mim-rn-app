import { InputIcon, InputSlot } from '@/components/ui/input';
import React from 'react';

export const renderIcon = (icon: React.ElementType | React.ReactNode) => {
  return (
    <InputSlot className="pl-3">
      {React.isValidElement(icon) ? icon : <InputIcon as={icon as React.ElementType} />}
    </InputSlot>
  );
};
