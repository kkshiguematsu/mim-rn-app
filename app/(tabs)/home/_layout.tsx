import { useTheme } from '@/context/themeContext';
import { Stack } from 'expo-router';

export default function HomeStackLayout() {
  const { theme } = useTheme();

  const titleColor = theme === 'dark' ? 'white' : 'black';
  const blurEffectColor = theme === 'dark' ? 'dark' : 'light';

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Inicio',
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
        }}
      />
    </Stack>
  );
}
