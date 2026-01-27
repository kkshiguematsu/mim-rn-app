'use client';
import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import React from 'react';

cssInterop(ExpoLinearGradient, {
  className: 'style',
});

const linearGradientStyle = tva({
  base: '',
});

export const LinearGradient = React.forwardRef(({ className, ...props }: any, ref?: any) => {
  return (
    <ExpoLinearGradient
      {...props}
      className={linearGradientStyle({ class: className })}
      ref={ref}
    />
  );
});
