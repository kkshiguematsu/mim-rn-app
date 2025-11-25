import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { useHeaderHeight } from '@react-navigation/elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PageProps {
  children: React.ReactNode;
  needsSafeArea?: boolean;
  needsPadding?: boolean;
  alignItems?: 'start' | 'center' | 'end';
  justifyContent?: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly';
  background?: 'normal' | 'primary';
}

const pageStyled = tva({
  base: 'flex-1 w-full ',
  variants: {
    background: {
      normal: 'bg-neutral-300 dark:bg-zinc-800',
      primary: 'bg-[#0A4669]',
    },
  },
  defaultVariants: {
    background: 'normal',
  },
});

const scrollViewStyled = tva({
  base: 'flex-grow',
  variants: {
    needsPadding: {
      true: 'p-7',
      false: '',
    },
    alignItems: {
      start: '',
      center: 'items-center ',
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

export const Page = ({
  children,
  needsSafeArea = true,
  needsPadding = true,
  alignItems = 'start',
  justifyContent = 'start',
  background = 'normal',
}: PageProps) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const paddingTop = needsSafeArea ? headerHeight : 0;
  const paddingBottom = needsSafeArea ? insets.bottom : 0;

  return (
    <KeyboardAwareScrollView
      className={pageStyled({ background })}
      bottomOffset={60}
      keyboardShouldPersistTaps="handled"
      contentContainerClassName={scrollViewStyled({ alignItems, justifyContent, needsPadding })}
      contentContainerStyle={{
        paddingTop,
        paddingBottom,
      }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};
