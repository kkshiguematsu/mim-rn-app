import { HeaderBackButtonIcon } from '@/components/shared/buttons/HeaderBackButtonIcon';
import { useTheme } from '@/context/themeContext';
import { Stack } from 'expo-router';

export default function HistoryStackLayout() {
  const { theme } = useTheme();

  const titleColor = theme === 'dark' ? 'white' : 'black';
  const blurEffectColor = theme === 'dark' ? 'dark' : 'light';

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[historyId]"
        options={{
          title: 'Detalhes',
          headerLargeTitle: true,
          headerTitleStyle: {
            color: titleColor,
          },
          headerLargeTitleStyle: {
            color: titleColor,
          },
          headerTransparent: true,
          headerLargeStyle: {
            backgroundColor: 'transparent',
          },
          headerLargeTitleEnabled: true,
          headerLargeTitleShadowVisible: true,
          headerBlurEffect: blurEffectColor,

          headerLeft: () => <HeaderBackButtonIcon />,
        }}
      />
    </Stack>
  );
}
