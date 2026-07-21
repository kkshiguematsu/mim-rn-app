import { tva } from '@gluestack-ui/utils/nativewind-utils';

export const rowStyles = tva({
  base: 'flex-row items-center gap-3 px-4 py-[14px] active:bg-neutral-200/50',
  variants: {
    selected: {
      true: 'rounded-2xl border border-primary-300 bg-primary-300/30',
      false: 'border border-transparent',
    },
  },
});

export const iconWrapStyles = tva({
  base: 'h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100',
  variants: {
    selected: {
      true: 'border-primary-300 bg-primary-300/30',
      false: '',
    },
  },
});

export const iconStyles = tva({
  base: 'text-typography-500',
  variants: {
    selected: {
      true: 'text-primary-500',
      false: '',
    },
  },
});

export const selectBtnStyles = tva({
  base: 'rounded-full border border-neutral-300 px-3 py-[5px] active:border-primary-400 active:bg-primary-50',
  variants: {
    selected: {
      true: 'border-primary-400',
      false: '',
    },
  },
});

export const selectBtnTextStyles = tva({
  base: 'text-neutral-500',
  variants: {
    selected: {
      true: 'text-primary-600',
      false: '',
    },
  },
});

export const subTextStyles = tva({
  base: 'text-neutral-400',
  variants: {
    selected: {
      true: 'text-neutral-600',
      false: '',
    },
  },
});
