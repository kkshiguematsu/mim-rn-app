import { Page } from '@/components/layout/page';
import { Section } from '@/components/section/Section';
import { MenuCard } from '@/components/shared/cards/MenuCard';
import { TailwindColor } from '@/components/shared/icon/TintedIcon/styles';
import { useRouter } from 'expo-router';
import { Inbox, Plus } from 'lucide-react-native';
import React from 'react';

export default function SupportPage() {
  const router = useRouter();

  const AccountSettingsOptions = [
    {
      label: 'Novo chamado',
      icon: {
        name: Plus,
        color: 'blue' as TailwindColor,
      },
      onClick: () => router.push('/(tabs)/user/support/newTicket'),
    },
    {
      label: 'Meus chamados',
      icon: {
        name: Inbox,
        color: 'blue' as TailwindColor,
      },
      onClick: () => router.push('/(tabs)/user/support/tickets'),
    },
  ];

  return (
    <Page>
      <Page.Header title="Suporte" hasBackButton />

      <Section title="Chamados" className="mx-7">
        <MenuCard rows={AccountSettingsOptions} sizeIcon="lg" />
      </Section>
    </Page>
  );
}
