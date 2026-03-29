import { tva } from '@gluestack-ui/utils/nativewind-utils';

export const connectorButtonStyles = tva({
  base: 'flex-1 items-center justify-center rounded-xl border py-2.5 px-3 border border-gray-200 bg-red-500',
  variants: {
    selected: {
      true: 'bg-primary-100 border-primary-200',
      false: 'bg-white border-gray-200',
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export const connectorTextStyles = tva({
  base: 'text-[10.5px] font-semibold',
  variants: {
    selected: {
      true: 'text-primary-600',
      false: 'text-gray-600',
    },
  },
  defaultVariants: {
    selected: false,
  },
});
