import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { FloatingChargingView } from '@/components/layout/FloatingChargingView';
import { BottomSheetRenderer } from '@/components/shared/bottomSheets/BottomSheetRenderer';
import { BottomSheet } from '@/components/ui/bottomsheet';
import { ChargingProvider } from '@/context/ChargingContext';
import { ThemeProvider, useTheme } from '@/context/themeContext';
import '@/global.css';
import { queryClient } from '@/service/api';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function LayoutContent() {
  const { theme } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider mode={'light'}>
        <KeyboardProvider>
          <BottomSheet>
            <ChargingProvider>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
              </Stack>

              <StatusBar />

              <BottomSheetRenderer />
              <FloatingChargingView />
            </ChargingProvider>
          </BottomSheet>
        </KeyboardProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <LayoutContent />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
