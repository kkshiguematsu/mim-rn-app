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
          headerShown: false,

          title: 'Inicio',
          headerLargeTitle: true,
          headerTransparent: true,
          headerShadowVisible: false,

          headerTitleStyle: { color: titleColor },
          headerLargeTitleStyle: { color: titleColor },
          headerStyle: { backgroundColor: 'transparent' },
          headerLargeStyle: { backgroundColor: 'transparent' },
          headerLargeTitleEnabled: true,
          headerBlurEffect: blurEffectColor,
        }}
      />
    </Stack>
  );
}
