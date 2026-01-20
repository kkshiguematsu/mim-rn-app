import React from 'react';

import { Page } from '@/components/shared/Page';
import { Button, ButtonText } from '@/components/ui/button';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
export default function KeyboardAvoidingViewExample() {
  const { showToast } = useToastMessage();

  const showToastMessage = () => {
    showToast({
      title: 'titulooo',
      // description: 'aaaaaaaaaaaaaaaa',
      action: 'success',
    });
  };

  return (
    <Page>
      <Button action="primary" onPress={showToastMessage}>
        <ButtonText>Mostrar Toast</ButtonText>
      </Button>
    </Page>
  );
}
