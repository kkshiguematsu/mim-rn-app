import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { ThemeProvider, useTheme } from '@/context/themeContext';
import '@/global.css';

export const unstable_settings = {
  anchor: '(tabs)',
};

function LayoutContent() {
  const { theme } = useTheme();

  return (
    <GluestackUIProvider mode={theme}>
      <KeyboardProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, animation: 'slide_from_left' }}
          />
          <Stack.Screen name="register" options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar />
      </KeyboardProvider>
    </GluestackUIProvider>
  );
}

export default function RootLayout() {
  return (
    // 💡 O ThemeProvider deve envolver o conteúdo principal.
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}
