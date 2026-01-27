import { tva } from '@gluestack-ui/utils/nativewind-utils';

export const cardStyles = tva({
  base: 'p-10 rounded-2xl',

  variants: {
    size: {
      sm: 'min-w-[30%] flex-1',
      md: 'min-w-[45%] flex-1',
      lg: 'min-w-[60%] flex-1',
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

export const iconContainerStyles = tva({
  base: 'rounded-lg p-2',
  variants: {
    color: {
      primary: 'bg-primary-100 dark:bg-primary-900/30',
      blue: 'bg-blue-100 dark:bg-blue-900/30',
      green: 'bg-green-100 dark:bg-green-900/30',
      purple: 'bg-purple-100 dark:bg-purple-900/30',
      orange: 'bg-orange-100 dark:bg-orange-900/30',
      red: 'bg-red-100 dark:bg-red-900/30',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/30',
      pink: 'bg-pink-100 dark:bg-pink-900/30',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/30',
      cyan: 'bg-cyan-100 dark:bg-cyan-900/30',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export const iconStyles = tva({
  base: 'h-4 w-4',
  variants: {
    color: {
      primary: 'text-primary-600 dark:text-primary-400',
      blue: 'text-blue-500 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      purple: 'text-purple-600 dark:text-purple-400',
      orange: 'text-orange-600 dark:text-orange-400',
      red: 'text-red-600 dark:text-red-400',
      yellow: 'text-yellow-600 dark:text-yellow-400',
      pink: 'text-pink-600 dark:text-pink-400',
      indigo: 'text-indigo-600 dark:text-indigo-400',
      cyan: 'text-cyan-600 dark:text-cyan-400',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export const titleStyles = tva({
  base: 'font-medium text-neutral-500 dark:text-neutral-400',
});

export const contentStyle = tva({
  base: 'font-bold text-neutral-900 dark:text-neutral-100',
});
