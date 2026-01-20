import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { FloatingChargingView } from '@/components/layout/FloatingChargingView';
import { ModalRenderer } from '@/components/shared/modals/ModalRenderer';
import { BottomSheet } from '@/components/ui/bottomsheet';
import { ChargingProvider } from '@/context/ChargingContext';
import { ModalProvider } from '@/context/modalContext';
import { ThemeProvider, useTheme } from '@/context/themeContext';
import '@/global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
  anchor: '(tabs)',
};

function LayoutContent() {
  const { theme } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider mode={theme}>
        <KeyboardProvider>
          <BottomSheet>
            <ModalProvider>
              <ChargingProvider>
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
                <FloatingChargingView />
              </ChargingProvider>
            </ModalProvider>
          </BottomSheet>
        </KeyboardProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}
