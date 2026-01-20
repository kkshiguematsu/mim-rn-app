import { useCharging } from '@/context/ChargingContext';
import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import { useHeaderHeight } from '@react-navigation/elements';
import { Platform, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { pageStyled, scrollViewStyled } from './styles';

interface PageProps {
  children: React.ReactNode;
  needsSafeArea?: boolean;
  needsPadding?: boolean;
  alignItems?: 'start' | 'center' | 'end';
  justifyContent?: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly';
  background?: 'normal' | 'primary';
  className?: string;
}

export const Page = ({
  children,
  needsSafeArea = true,
  needsPadding = true,
  alignItems = 'start',
  justifyContent = 'start',
  background = 'normal',
  className,
}: PageProps) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const bottomTabBarHeight = useBottomMenuHeight();
  const { activeSession } = useCharging();

  const paddingTop = needsSafeArea ? (headerHeight !== 0 ? headerHeight : insets.top) : 0;

  const paddingBottom = needsSafeArea
    ? (bottomTabBarHeight !== 0 ? bottomTabBarHeight : insets.bottom) + (needsPadding ? 12 : 0)
    : needsPadding
      ? 12
      : 0;

  return (
    <View className={pageStyled({ background, class: className })}>
      <KeyboardAwareScrollView
        style={{ paddingTop }}
        className={pageStyled({ background })}
        contentContainerClassName={scrollViewStyled({ alignItems, justifyContent, needsPadding })}
        contentContainerStyle={{
          paddingBottom: activeSession ? paddingBottom + 100 : paddingBottom,
        }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === 'ios'}
        extraScrollHeight={20}
        extraHeight={20}
        enableResetScrollToCoords={false}
      >
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};
