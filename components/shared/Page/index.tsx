import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { useHeaderHeight } from '@react-navigation/elements';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PageProps {
  children: React.ReactNode;
  needsSafeArea?: boolean;
  needsPadding?: boolean;
  alignItems?: 'start' | 'center' | 'end';
  justifyContent?: 'start' | 'center' | 'end';
  background?: 'normal' | 'primary';
}

const pageStyled = tva({
  base: 'flex-1 w-full ',
  variants: {
    background: {
      normal: 'bg-neutral-300 dark:bg-zinc-800',
      primary: 'bg-[#0A4669]',
      // primary: 'bg-primary-400',
    },
  },
  defaultVariants: {
    background: 'normal',
  },
});

const scrollViewStyled = tva({
  base: 'flex-grow ',
  variants: {
    needsPadding: {
      true: 'm-7',
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
    },
  },
  defaultVariants: {
    needsPadding: true,
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

  return (
    <View className={pageStyled({ background })}>
      <ScrollView
        className={'w-full'}
        contentContainerClassName={scrollViewStyled({ alignItems, justifyContent, needsPadding })}
        contentContainerStyle={{
          paddingTop: needsSafeArea ? headerHeight : 0,
          paddingBottom: needsSafeArea ? insets.bottom : 0,
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
};
