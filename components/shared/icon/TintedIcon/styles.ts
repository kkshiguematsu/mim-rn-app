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

export const iconContainerColorStyles = tva({
  base: '',
  variants: {
    size: {
      sm: 'rounded-lg p-1.5',
      md: 'rounded-lg p-2',
      lg: 'rounded-lg p-2.5',
      xl: 'rounded-xl p-3',
    },
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
    color: 'neutral',
    size: 'md',
  },
});

export const iconColorStyles = tva({
  base: '',
  variants: {
    size: {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
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
    color: 'neutral',
    size: 'md',
  },
});
