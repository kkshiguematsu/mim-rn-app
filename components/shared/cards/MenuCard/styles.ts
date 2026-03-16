import { tva } from '@gluestack-ui/utils/nativewind-utils';

export const menuItemContainerStyles = tva({
  base: 'flex flex-row items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-700',
  variants: {
    size: {
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-4 py-4',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});
