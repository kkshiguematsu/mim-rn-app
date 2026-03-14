import { tva } from '@gluestack-ui/utils/nativewind-utils';

export const cardStyles = tva({
  base: 'shadow-sm shadow-neutral-400/60 rounded-2xl h-auto ',

  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
      full: 'w-full',
    },

    variant: {
      default: '',
      elevated: 'shadow-lg',
      outlined: 'border border-neutral-200 dark:border-neutral-800',
    },

    padding: {
      none: 'p-0',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'default',
    padding: 'md',
  },
});
