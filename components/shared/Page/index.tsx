import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PageProps {
  children: React.ReactNode;
  align?: 'start' | 'center';
  background?: 'normal' | 'primary';
}

const page = tva({
  base: 'flex-1 w-full',
  variants: {
    align: {
      start: '',
      center: 'items-center justify-center',
    },
    background: {
      normal: 'bg-neutral-100 dark:bg-slate-950',
      primary: 'bg-[#0A4669]',
    },
  },
  defaultVariants: {
    align: 'start',
    background: 'normal',
  },
});

export const Page = ({ children, align = 'start', background = 'normal' }: PageProps) => {
  return (
    <SafeAreaView className={page({ align, background })}>
      <ScrollView
        contentContainerClassName="flex-grow p-5 w-full"
        // contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
