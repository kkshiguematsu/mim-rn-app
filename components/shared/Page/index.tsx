import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PageProps {
  children: React.ReactNode;
  needsSafeArea?: boolean;
  alignItems?: 'start' | 'center' | 'end';
  justifyContent?: 'start' | 'center' | 'end';
  background?: 'normal' | 'primary';
}

const pageStyled = tva({
  base: 'flex-1 w-full ',
  variants: {
    background: {
      normal: 'bg-neutral-100 dark:bg-zinc-700',
      primary: 'bg-[#0A4669]',
      // primary: 'bg-primary-400',
    },
  },
  defaultVariants: {
    background: 'normal',
  },
});

const scrollViewStyled = tva({
  base: 'flex-grow gap-10',
  variants: {
    alignItems: {
      start: '',
      center: 'items-center ',
      end: 'items-end',
    },
    justifyContent: {
      start: '',
      center: 'justify-center',
      end: 'justify-end',
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
  alignItems = 'start',
  justifyContent = 'start',
  background = 'normal',
}: PageProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: needsSafeArea ? insets.top : 0,
        paddingBottom: needsSafeArea ? insets.bottom : 0,
      }}
      className={pageStyled({ background })}
    >
      <ScrollView
        className={'w-full'}
        contentContainerClassName={scrollViewStyled({ alignItems, justifyContent })}
      >
        {children}
      </ScrollView>
    </View>
  );
};
