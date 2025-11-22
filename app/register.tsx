import React from 'react';

import { RegisterForm } from '@/components/form/registerForm';
import { Page } from '@/components/shared/Page';
import { Heading } from '@/components/ui/heading';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Index() {
  return (
    <Page
      background="primary"
      alignItems="center"
      justifyContent="start"
      needsSafeArea={false}
      needsPadding={false}
    >
      <Animated.View
        entering={FadeInDown.duration(400).springify()}
        className="h-full w-full rounded-3xl bg-gray-200 p-7 pb-32 dark:bg-zinc-800"
      >
        <Heading className="my-3 text-3xl font-bold">Cadastro</Heading>
        <RegisterForm />
      </Animated.View>
    </Page>
  );
}
