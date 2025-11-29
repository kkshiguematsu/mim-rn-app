import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { ModalRenderer } from '@/components/shared/modals/ModalRenderer';
import { BottomSheet } from '@/components/ui/bottomsheet';
import { ModalProvider, useModal } from '@/context/modalContext';
import { ThemeProvider, useTheme } from '@/context/themeContext';
import '@/global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  anchor: '(tabs)',
};

function LayoutContent() {
  const { theme } = useTheme();
  const { disableModal } = useModal();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider mode={theme}>
        <KeyboardProvider>
          <BottomSheet onClose={disableModal}>
            <Stack>
              <Stack.Screen
                name="index"
                options={{ headerShown: false, animation: 'slide_from_left' }}
              />
              <Stack.Screen
                name="register"
                options={{ animation: 'slide_from_right', headerShown: false }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>

            <StatusBar />

            <ModalRenderer />
          </BottomSheet>
        </KeyboardProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <LayoutContent />
      </ModalProvider>
    </ThemeProvider>
  );
}
