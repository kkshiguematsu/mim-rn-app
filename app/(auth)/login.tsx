import { LoginForm } from '@/components/form/auth/LoginForm';
import { Page } from '@/components/layout/page';
import { AnimatedSlideInViewCard } from '@/components/shared/cards/AnimatedViewCard';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { config } from '@/constants/config';
import clsx from 'clsx';
import React, { useState } from 'react';
import { View } from 'react-native';
import Animated, { BounceIn, Easing, FadeInDown } from 'react-native-reanimated';

export default function Index() {
  const [isLoginCardVisible, seIsLoginCardVisible] = useState(true);

  return (
    <Page.Keyboard background="primary" hasHeader={false} needsPadding={false}>
      <Animated.View
        key="loginLogo"
        entering={BounceIn.duration(800).easing(Easing.ease)}
        className="flex-1 items-center justify-center"
      >
        <Image
          source={config.tenantLogo}
          className="w-[80%] overflow-hidden rounded-2xl"
          alt="Logo"
          size="2xl"
        />
      </Animated.View>

      {isLoginCardVisible ? (
        <AnimatedSlideInViewCard
          key="loginCard"
          className={clsx(['justify-center pt-14'])}
          hasInsertBottom
        >
          <Heading className="text-center text-2xl font-bold">Login</Heading>
          <LoginForm />
        </AnimatedSlideInViewCard>
      ) : (
        <Animated.View
          key="buttonCard"
          entering={FadeInDown.duration(400).springify()}
          className="flex h-[55%] w-full items-center justify-between pb-24"
        >
          <View className="flex w-full flex-col items-center gap-7">
            <Heading className="text-center font-bold text-white" size="2xl">
              Bem-vindo de volta!
            </Heading>
            <Text className="w-[75%] text-center text-gray-400" size="lg">
              Conecte-se e encontre o melhor ponto para carregar seu carro elétrico.
            </Text>
          </View>
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
    </Page.Keyboard>
  );
}
