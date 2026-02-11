import { useCharging } from '@/context/ChargingContext';
import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import { Platform, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
  const { activeSession } = useCharging();
  const bottomTabBarHeight = useBottomMenuHeight();

  const paddingBottom = needsPadding
    ? activeSession
      ? bottomTabBarHeight + 100
      : bottomTabBarHeight
    : 0;

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
