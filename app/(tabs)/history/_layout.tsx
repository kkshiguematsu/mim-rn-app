import { useTheme } from '@/context/themeContext';
import { Stack } from 'expo-router';

export default function HistoryStackLayout() {
  const { theme } = useTheme();

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
          headerShown: false,
        }}
      />
    </Stack>
  );
}
