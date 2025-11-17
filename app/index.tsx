import { LoginForm } from '@/components/form/LoginForm';
import { Page } from '@/components/shared/Page';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import React from 'react';
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
      <Image
        source={require('../assets/images/mim-logo-tec.webp')}
        className="mb-14 mt-32 rounded-2xl"
        alt="Logo"
        size="xl"
      />

      <Animated.View
        entering={FadeInDown.duration(400).springify()}
        className="h-full w-full rounded-3xl bg-gray-200 p-7 pb-32 dark:bg-zinc-700"
      >
        <Heading className="my-10 text-center text-2xl font-bold">Login</Heading>
        <LoginForm />
      </Animated.View>
    </Page>
  );
}
