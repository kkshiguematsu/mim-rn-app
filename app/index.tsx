import { LoginForm } from '@/components/form/LoginForm';
import { Page } from '@/components/shared/Page';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import React, { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Index() {
  const [isLoginCardVisible, seIsLoginCardVisible] = useState(false);

  return (
    <Page
      background="primary"
      alignItems="center"
      justifyContent="end"
      needsSafeArea={false}
      needsPadding={false}
    >
      <Image
        source={require('../assets/images/mim-logo-tec.webp')}
        className="absolute top-32 h-48 rounded-2xl"
        alt="Logo"
        size="2xl"
      />
      {isLoginCardVisible ? (
        <Animated.View
          key="loginCard"
          entering={FadeInDown.duration(800).springify()}
          exiting={FadeInDown.duration(400)}
          className="w-full rounded-3xl bg-gray-200 p-7 pb-24 dark:bg-zinc-800"
        >
          <Heading className="my-10 text-center text-2xl font-bold">Login</Heading>
          <LoginForm />
        </Animated.View>
      ) : (
        <Animated.View
          key="buttonCard"
          entering={FadeInDown.duration(400).springify()}
          exiting={FadeInDown.duration(400)}
          className="flex h-[55%] w-full items-center justify-end pb-24"
        >
          <Button
            onPress={() => seIsLoginCardVisible(true)}
            className="lg w-[90%] bg-white"
            size="xl"
            variant="solid"
          >
            <ButtonText className="text-black">Iniciar</ButtonText>
          </Button>
        </Animated.View>
      )}
    </Page>
  );
}
