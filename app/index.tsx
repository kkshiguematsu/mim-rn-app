import { LoginForm } from '@/components/form/LoginForm';
import { Page } from '@/components/shared/Page';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Index() {
  return (
    <Page background="primary" alignItems="center" justifyContent="end">
      <Image
        source={require('../assets/images/mim-logo-tec.webp')}
        className="rounded-2xl"
        alt="Logo"
        size="xl"
      />

      <Animated.View
        entering={FadeInDown.duration(400).springify()}
        className="w-full rounded-3xl bg-gray-200 px-8 py-20 dark:bg-zinc-700"
      >
        <Text className="mb-5 text-2xl font-bold">Bem vindo à MiM!</Text>
        <LoginForm />
      </Animated.View>
    </Page>
  );
}
