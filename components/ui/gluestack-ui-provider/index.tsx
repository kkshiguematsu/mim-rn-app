import { config } from '@/constants/config';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { OverlayProvider } from '@gluestack-ui/core/overlay/creator';
import { ToastProvider } from '@gluestack-ui/core/toast/creator';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { View, ViewProps } from 'react-native';
export type ModeType = 'light' | 'dark' | 'system';

export type GluestackUIProviderProps = {
  mode?: ModeType;
  tenantTheme?: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  children?: React.ReactNode;
  style?: ViewProps['style'];
};

export function GluestackUIProvider({
  mode = 'light',
  tenantTheme,
  ...props
}: GluestackUIProviderProps) {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(mode);
  }, [mode, setColorScheme]);

  const selectedTheme = tenantTheme ?? config.tenantTheme;
  const resolvedScheme = !colorScheme ? 'light' : colorScheme;
  const themeStyle = selectedTheme[resolvedScheme] ?? selectedTheme.light;

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={[themeStyle, { flex: 1, height: '100%', width: '100%' }, props.style]}>
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
