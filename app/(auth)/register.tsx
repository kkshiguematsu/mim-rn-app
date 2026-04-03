import React from 'react';

import { RegisterForm } from '@/components/form/RegisterForm';
import { Page } from '@/components/layout/page';

export default function RegisterPage() {
  return (
    <Page.Keyboard
      justifyContent="between"
      hasHeader={false}
      needsSafeArea={false}
      needsPadding={false}
      background="primary"
    >
      <Page.Header title="Cadastro" classNameTitle="text-white text-4xl" />

      <RegisterForm />
    </Page.Keyboard>
  );
}
