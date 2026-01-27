import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ColorSchemeName } from 'react-native';

interface ThemeContextProps {
  theme: 'light' | 'dark';
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setThemeState(theme);
  }, [theme]);

  const setTheme = (newTheme: ColorSchemeName) => {
    if (newTheme) {
      setThemeState(newTheme);
    }
  };

  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    setIsDark((prevTheme) => !prevTheme);
  };

  const contextValue = useMemo(
    () => ({
      theme,
      isDark,
      toggleTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
