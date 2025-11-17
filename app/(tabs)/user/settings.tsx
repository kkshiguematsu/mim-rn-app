import { MenuList } from '@/components/shared/MenuList';
import { MenuItem } from '@/components/shared/MenuList/MenuItem';
import { Page } from '@/components/shared/Page';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/context/themeContext';
import { Moon, Sun } from 'lucide-react-native';
import React from 'react';
export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Page>
      <MenuList>
        <MenuItem
          label={theme === 'light' ? 'Claro' : 'Escuro'}
          icon={theme === 'light' ? Sun : Moon}
          content={
            <Switch
              value={theme === 'dark'}
              trackColor={{
                false: '#d4d4d4',
                true: 'bg-green-600',
              }}
              thumbColor="#fafafa"
              // ios_backgroundColor="#d4d4d4"
              onToggle={toggleTheme}
            />
          }
        />
      </MenuList>
    </Page>
  );
}
