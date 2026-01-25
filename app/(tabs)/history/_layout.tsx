import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/context/themeContext';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export default function HistoryStackLayout() {
  const { theme } = useTheme();
  const router = useRouter();

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
          title: 'Detalhes',
          headerLargeTitle: true,
          headerTitleStyle: {
            color: theme === 'dark' ? 'white' : 'black',
          },
          headerLargeTitleStyle: {
            color: theme === 'dark' ? 'white' : 'black',
          },
          headerLargeStyle: {
            backgroundColor: 'transparent',
          },
          headerLargeTitleEnabled: true,
          headerLargeTitleShadowVisible: true,
          headerLeft: () => (
            <View className="w-9 items-center justify-center">
              <Pressable onPress={() => router.back()}>
                <Icon as={ChevronLeft} size="2xl" />
              </Pressable>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
