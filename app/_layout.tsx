import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { FloatingChargingView } from '@/components/layout/FloatingChargingView';
import { BottomSheetRenderer } from '@/components/layout/bottomSheet/BottomSheetRenderer';
import { BottomSheet } from '@/components/ui/bottomsheet';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { ChargingProvider } from '@/context/ChargingContext';
import { ThemeProvider, useTheme } from '@/context/themeContext';
import '@/global.css';
import { useBootstrapAuth } from '@/hooks/api/auth/useBootstrapAuth';
import { useChargingTransactionActive } from '@/hooks/api/transation/useChargingTransactionActive';
import {
  handleInitialNotification,
  usePushNotification,
} from '@/hooks/notification/usePushNotification';
import { useLocationStore } from '@/hooks/store/useLocationStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { queryClient } from '@/service/api';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

function LayoutContent() {
  const router = useRouter();
  const { theme } = useTheme();
  const { showToast } = useToastMessage();
  const { startWatching } = useLocationStore();

  const { isReady: isAppReady } = useBootstrapAuth();
  useChargingTransactionActive();

  usePushNotification({
    onForegroundNotification: (notification) => {
      // showToast({});
    },
  });

  useEffect(() => {
    startWatching();
    handleInitialNotification(router);
  }, []);

  return (
    <GluestackUIProvider mode={theme}>
      <StatusBar style="auto" />
      <BottomSheet>
        <ChargingProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(maps)" options={{ headerShown: false }} />
            <Stack.Screen name="(chat)" options={{ headerShown: false }} />
          </Stack>

          <BottomSheetRenderer />
          <FloatingChargingView />
        </ChargingProvider>
      </BottomSheet>
    </GluestackUIProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider>
            <LayoutContent />
          </KeyboardProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
