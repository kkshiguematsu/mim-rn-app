import { useCharging } from '@/context/ChargingContext';
import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import { useHeaderHeight } from '@react-navigation/elements';
import { Platform, ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { pageStyled, scrollViewStyled } from './styles';

interface PageProps {
  children: React.ReactNode;
  needsSafeArea?: boolean;
  needsPadding?: boolean;
  alignItems?: 'start' | 'center' | 'end';
  justifyContent?: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly';
  background?: 'normal' | 'primary' | 'half';
  componentRender?: 'view' | 'scrollview' | 'keyboard';
  contentContainerStyle?: StyleProp<ViewStyle>;
  className?: string;
}

export const Page = ({
  children,
  needsSafeArea = true,
  needsPadding = true,
  alignItems = 'start',
  justifyContent = 'start',
  background = 'normal',
  componentRender = 'keyboard',
  className,
  contentContainerStyle,
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

  if (componentRender === 'view') return <></>;

  if (componentRender === 'scrollview')
    return (
      <ScrollView
        className={pageStyled({ background })}
        contentContainerClassName={scrollViewStyled({
          alignItems,
          justifyContent,
          needsPadding,
          class: className,
        })}
        contentContainerStyle={{
          ...StyleSheet.flatten(contentContainerStyle),
          paddingBottom: activeSession ? paddingBottom + 100 : paddingBottom,
        }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );

  return (
    <View className={pageStyled({ background, class: className })}>
      <KeyboardAwareScrollView
        style={{ paddingTop }}
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
      >
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};
