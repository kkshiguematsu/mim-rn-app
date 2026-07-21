import { Page } from '@/components/layout/page';
import { Section } from '@/components/section/Section';
import { MenuCard } from '@/components/shared/cards/MenuCard';
import { TailwindColor } from '@/components/shared/icon/TintedIcon/styles';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/context/themeContext';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { BottomSheetNames } from '@/types/bottomsheet/bottomSheetNames';
import { KeySquare, Sun } from 'lucide-react-native';
import React from 'react';

export default function SettingsPage() {
  const { enableModal } = useBottomSheetStore();
  const { theme, toggleTheme } = useTheme();

  const themeOptions = [
    {
      label: theme === 'light' ? 'Claro' : 'Escuro',
      icon: {
        name: Sun,
        color: 'blue' as TailwindColor,
      },
      renderComponent: (
        <Switch
          value={theme === 'dark'}
          trackColor={{
            false: '#d4d4d4',
            true: 'bg-green-600',
          }}
          thumbColor="#fafafa"
          onToggle={toggleTheme}
        />
      ),
    },
  ];

  const AccountSettingsOptions = [
    {
      label: 'Alterar senha',
      icon: {
        name: KeySquare,
        color: 'red' as TailwindColor,
      },
      onClick: () => enableModal(BottomSheetNames.ResetPasswordBottomSheet),
    },
  ];

  return (
    <Page.Scroll hasHeader={false} needsPadding={false}>
      <Page.Header title="Configurações" hasBackButton />

      <Section title="Tema" className="mx-7">
        <MenuCard rows={themeOptions} sizeIcon="lg" />
      </Section>

      <Section title="Conta" className="mx-7">
        <MenuCard rows={AccountSettingsOptions} sizeIcon="lg" />
      </Section>
    </Page.Scroll>
  );
}
