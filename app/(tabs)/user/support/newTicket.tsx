import { TicketForm } from '@/components/form/ticket';
import { Page } from '@/components/layout/page';
import React from 'react';

export default function NewTicketPage() {
  return (
    <Page.Scroll hasHeader={false} needsPadding={false}>
      <Page.Header title="Novo Chamado" hasBackButton />

      <TicketForm />
    </Page.Scroll>
  );
}
