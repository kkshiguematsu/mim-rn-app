import { useCharging } from '@/context/ChargingContext';
import { useBottomMenuHeight } from '@/hooks/layout/useBottomMenuHeight';
import { ScrollView, StyleSheet } from 'react-native';
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
}: PageScrollProps) => {
  const { activeSession } = useCharging();
  const bottomTabBarHeight = useBottomMenuHeight();

  const paddingBottom = needsPadding
    ? activeSession
      ? bottomTabBarHeight + 100
      : bottomTabBarHeight
    : 0;

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
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};
