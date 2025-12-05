import React from 'react';

import { Page } from '@/components/shared/Page';
import { Button, ButtonText } from '@/components/ui/button';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';

export default function KeyboardAvoidingViewExample() {
  const toast = useToast();

  const showToast = () => {
    console.log('Mostrando Toast', Math.random());
    toast.show({
      id: Math.random().toString(),
      placement: 'top',
      duration: 3000,
      onCloseComplete: () => console.log('fechadno'),
      render: ({ id }) => {
        const uniqueToastId = 'toast-' + id;
        return (
          <Toast nativeID={uniqueToastId} action="muted" variant="solid">
            <ToastTitle>Hello!</ToastTitle>
            <ToastDescription> This is a customized toast message. </ToastDescription>
          </Toast>
        );
      },
    });
  };

  return (
    <Page>
      <Button action="primary" onPress={showToast}>
        <ButtonText>Mostrar Toast</ButtonText>
      </Button>
    </Page>
  );
}
