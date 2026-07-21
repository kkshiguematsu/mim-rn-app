import { BottomSheetContent, BottomSheetScrollView } from '@/components/ui/bottomsheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
  contentContainerClassName?: string;
  style?: object;
}

export const BottomSheetWrapper = ({
  children,
  scrollable = false,
  className,
  contentContainerClassName,
  style,
}: Props) => {
  const insets = useSafeAreaInsets();

  if (scrollable) {
    return (
      <BottomSheetScrollView
        className={className}
        contentContainerClassName={contentContainerClassName}
        contentContainerStyle={{ ...style, paddingBottom: insets.bottom }}
      >
        {children}
      </BottomSheetScrollView>
    );
  }

  return (
    <BottomSheetContent className={className} style={{ ...style, paddingBottom: insets.bottom }}>
      {children}
    </BottomSheetContent>
  );
};
