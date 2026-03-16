import { useCharging } from '@/context/ChargingContext';
import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { pageStyled, scrollViewStyled } from './styles';
import { PageScrollProps } from './types';

export const PageScroll = ({
  children,
  needsPadding = true,
  alignItems = 'start',
  justifyContent = 'start',
  background = 'normal',
  className,
  contentContainerStyle,
  hasHeader = true,
  stickyHeaderIndices,
}: PageScrollProps) => {
  const { activeSession } = useCharging();
  const inset = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomMenuHeight();

  let paddingBottom = bottomTabBarHeight + inset.bottom;
  paddingBottom += activeSession ? 100 : 0;

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
        paddingBottom,
      }}
      contentInsetAdjustmentBehavior={hasHeader ? 'automatic' : 'never'}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={stickyHeaderIndices}
    >
      {children}
    </ScrollView>
  );
};
