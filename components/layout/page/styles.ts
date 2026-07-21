import { tva } from '@gluestack-ui/utils/nativewind-utils';

export const pageStyled = tva({
  base: 'flex-1 w-full',
  variants: {
    background: {
      normal: 'bg-neutral-200 dark:bg-neutral-900',
      primary: 'bg-primary-700',
    },
  },
  defaultVariants: {
    background: 'normal',
  },
});

export const scrollViewStyled = tva({
  base: 'flex-grow flex-col',
  variants: {
    needsPadding: {
      true: 'px-7 pt-7',
      false: '',
    },
    alignItems: {
      start: '',
      center: 'items-center',
      end: 'items-end',
    },
    justifyContent: {
      start: '',
      center: 'justify-center',
      end: 'justify-end',
      around: 'justify-around',
      between: 'justify-between',
      evenly: 'justify-evenly',
    },
  },
  defaultVariants: {
    alignItems: 'start',
    justifyContent: 'start',
  },
});
