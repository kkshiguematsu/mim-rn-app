import { useTheme } from '@/context/themeContext';
import { Stack } from 'expo-router';

export default function HistoryStackLayout() {
  const { theme } = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Histórico',
          headerTitleStyle: {
            color: theme === 'dark' ? 'white' : 'black',
          },
          headerShown: true,
          headerTransparent: true,
          headerBlurEffect: theme === 'dark' ? 'dark' : 'light',
        }}
      />
      <Stack.Screen
        name="[historyId]"
        options={{
          title: 'Histórico',
          headerTitleStyle: {
            color: theme === 'dark' ? 'white' : 'black',
          },
          headerShown: true,
          headerTransparent: true,
          headerBlurEffect: theme === 'dark' ? 'dark' : 'light',
        }}
      />
    </Stack>
  );
}
