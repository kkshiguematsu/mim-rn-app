import { tva } from '@gluestack-ui/utils/nativewind-utils';

export const pageStyled = tva({
  base: 'flex-1 w-full',
  variants: {
    background: {
      normal: 'bg-neutral-200 dark:bg-neutral-900',
      primary: 'bg-[#0A4669]',
    },
  },
  defaultVariants: {
    background: 'normal',
  },
});

export const scrollViewStyled = tva({
  base: 'flex-grow',
  variants: {
    needsPadding: {
      true: 'p-7',
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
