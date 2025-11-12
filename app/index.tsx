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
        className="w-full bg-white rounded-3xl py-20 px-8"
      >
        <Text className="text-2xl mb-5 font-bold">Bem vindo à MiM!</Text>
        <LoginForm />
      </Animated.View>
    </Page>
  );
}
