import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { ColorIcons } from '../../icon/TintedIcon/styles';

export const cardStyles = tva({
  base: 'shadow-sm shadow-neutral-400/60 rounded-2xl h-auto',

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

export const trendColorStyles: Record<ColorIcons, string> = {
  primary: 'text-primary-500',
  slate: 'text-slate-500',
  gray: 'text-gray-500',
  zinc: 'text-zinc-500',
  neutral: 'text-neutral-500',
  stone: 'text-stone-500',
  red: 'text-red-500',
  orange: 'text-orange-500',
  amber: 'text-amber-500',
  yellow: 'text-yellow-500',
  lime: 'text-lime-500',
  green: 'text-green-500',
  emerald: 'text-emerald-500',
  teal: 'text-teal-500',
  cyan: 'text-cyan-500',
  sky: 'text-sky-500',
  blue: 'text-blue-500',
  indigo: 'text-indigo-500',
  violet: 'text-violet-500',
  purple: 'text-purple-500',
  fuchsia: 'text-fuchsia-500',
  pink: 'text-pink-500',
  rose: 'text-rose-500',
};

export const titleStyles = tva({
  base: 'font-medium text-neutral-500 dark:text-neutral-400',
});

export const contentStyle = tva({
  base: 'font-bold text-neutral-900 dark:text-neutral-100',
});
