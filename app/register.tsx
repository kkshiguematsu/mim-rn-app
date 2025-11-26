import React from 'react';

import { RegisterForm } from '@/components/form/registerForm';
import { Page } from '@/components/shared/Page';
import { Heading } from '@/components/ui/heading';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Index() {
  return (
    <Page
      // background="primary"
      alignItems="center"
      justifyContent="start"
      needsSafeArea={true}
      needsPadding={true}
    >
      <Animated.View
        entering={FadeInDown.duration(400).springify()}
        // className="w-full flex-1 bg-gray-200 p-7 dark:bg-zinc-800"
        className="w-full flex-1"
      >
        <Heading className="text-3xl font-bold">Cadastro</Heading>
        <RegisterForm />
      </Animated.View>
    </Page>
  );
}
