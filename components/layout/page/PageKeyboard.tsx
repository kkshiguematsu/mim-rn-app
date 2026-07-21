import { useCharging } from '@/context/ChargingContext';
import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import { Platform, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
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
  needsBottomTabBar = true,
}: PageKeyboardProps) => {
  const inset = useSafeAreaInsets();
  const { activeSession } = useCharging();
  const bottomTabBarHeight = useBottomMenuHeight();

  let paddingBottom = needsBottomTabBar ? bottomTabBarHeight : 0;
  paddingBottom += needsSafeArea ? inset.bottom : 0;
  paddingBottom += activeSession ? 100 : 0;

  return (
    <View className={pageStyled({ class: className })}>
      <KeyboardAwareScrollView
        className={pageStyled({ background })}
        contentContainerClassName={scrollViewStyled({ alignItems, justifyContent, needsPadding })}
        contentContainerStyle={{
          ...StyleSheet.flatten(contentContainerStyle),
          paddingBottom: activeSession ? paddingBottom + 100 : paddingBottom,
        }}
        bottomOffset={Platform.OS === 'android' ? 40 : 20}
        keyboardShouldPersistTaps="never"
        keyboardDismissMode={Platform.OS === 'android' ? 'on-drag' : 'interactive'}
        contentInsetAdjustmentBehavior={hasHeader ? 'automatic' : 'never'}
      >
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};
