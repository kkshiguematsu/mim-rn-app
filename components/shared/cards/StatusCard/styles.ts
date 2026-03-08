import { tva } from '@gluestack-ui/utils/nativewind-utils';

export type TailwindColor =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'primary';

export type ColorIcons = TailwindColor;

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

export const iconContainerColorStyles = tva({
  base: '',
  variants: {
    color: {
      primary: 'bg-primary-100 dark:bg-primary-900/30',
      slate: 'bg-slate-100 dark:bg-slate-900/30',
      gray: 'bg-gray-100 dark:bg-gray-900/30',
      zinc: 'bg-zinc-100 dark:bg-zinc-900/30',
      neutral: 'bg-neutral-100 dark:bg-neutral-900/30',
      stone: 'bg-stone-100 dark:bg-stone-900/30',
      red: 'bg-red-100 dark:bg-red-900/30',
      orange: 'bg-orange-100 dark:bg-orange-900/30',
      amber: 'bg-amber-100 dark:bg-amber-900/30',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/30',
      lime: 'bg-lime-100 dark:bg-lime-900/30',
      green: 'bg-green-100 dark:bg-green-900/30',
      emerald: 'bg-emerald-100 dark:bg-emerald-900/30',
      teal: 'bg-teal-100 dark:bg-teal-900/30',
      cyan: 'bg-cyan-100 dark:bg-cyan-900/30',
      sky: 'bg-sky-100 dark:bg-sky-900/30',
      blue: 'bg-blue-100 dark:bg-blue-900/30',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/30',
      violet: 'bg-violet-100 dark:bg-violet-900/30',
      purple: 'bg-purple-100 dark:bg-purple-900/30',
      fuchsia: 'bg-fuchsia-100 dark:bg-fuchsia-900/30',
      pink: 'bg-pink-100 dark:bg-pink-900/30',
      rose: 'bg-rose-100 dark:bg-rose-900/30',
    },
  },
  defaultVariants: {
    color: 'primary',
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

export const iconColorStyles = tva({
  base: '',
  variants: {
    color: {
      primary: 'text-primary-600 dark:text-primary-400',
      slate: 'text-slate-600 dark:text-slate-400',
      gray: 'text-gray-600 dark:text-gray-400',
      zinc: 'text-zinc-600 dark:text-zinc-400',
      neutral: 'text-neutral-600 dark:text-neutral-400',
      stone: 'text-stone-600 dark:text-stone-400',
      red: 'text-red-600 dark:text-red-400',
      orange: 'text-orange-600 dark:text-orange-400',
      amber: 'text-amber-600 dark:text-amber-400',
      yellow: 'text-yellow-600 dark:text-yellow-400',
      lime: 'text-lime-600 dark:text-lime-400',
      green: 'text-green-600 dark:text-green-400',
      emerald: 'text-emerald-600 dark:text-emerald-400',
      teal: 'text-teal-600 dark:text-teal-400',
      cyan: 'text-cyan-600 dark:text-cyan-400',
      sky: 'text-sky-600 dark:text-sky-400',
      blue: 'text-blue-600 dark:text-blue-400',
      indigo: 'text-indigo-600 dark:text-indigo-400',
      violet: 'text-violet-600 dark:text-violet-400',
      purple: 'text-purple-600 dark:text-purple-400',
      fuchsia: 'text-fuchsia-600 dark:text-fuchsia-400',
      pink: 'text-pink-600 dark:text-pink-400',
      rose: 'text-rose-600 dark:text-rose-400',
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
