import { useCharging } from '@/context/ChargingContext';
import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import { Platform, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { pageStyled, scrollViewStyled } from './styles';
import { PageKeyboardProps } from './types';

export const PageKeyboard = ({
  children,
  className,
  background,
  needsPadding,
  needsSafeArea,
  alignItems,
  justifyContent,
  contentContainerStyle,
  hasHeader = true,
}: PageKeyboardProps) => {
  const inset = useSafeAreaInsets();
  const { activeSession } = useCharging();
  const bottomTabBarHeight = useBottomMenuHeight();

  let paddingBottom = bottomTabBarHeight + inset.bottom;
  paddingBottom += activeSession ? 100 : 0;

  return (
    <View className={pageStyled({ background, class: className })}>
      <KeyboardAwareScrollView
        className={pageStyled({ background })}
        contentContainerClassName={scrollViewStyled({ alignItems, justifyContent, needsPadding })}
        contentContainerStyle={{
          ...StyleSheet.flatten(contentContainerStyle),
          paddingBottom: activeSession ? paddingBottom + 100 : paddingBottom,
        }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === 'ios'}
        extraScrollHeight={20}
        extraHeight={20}
        enableResetScrollToCoords={false}
        contentInsetAdjustmentBehavior={hasHeader ? 'automatic' : 'never'}
      >
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};
