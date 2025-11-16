import { Text } from '@/components/ui/text';

import { Page } from '@/components/shared/Page';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/context/themeContext';
import React from 'react';
export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Page>
      <Switch
        value={theme === 'dark'}
        trackColor={{
          false: '#d4d4d4',
          true: '#525252',
        }}
        thumbColor="#fafafa"
        ios_backgroundColor="#d4d4d4"
        onToggle={toggleTheme}
      />
      <Text>{theme}</Text>
    </Page>
  );
}
