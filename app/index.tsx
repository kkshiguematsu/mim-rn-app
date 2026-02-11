import { LoginForm } from '@/components/form/LoginForm';
import { AnimatedSlideInViewCard } from '@/components/shared/cards/AnimatedViewCard';
import { Page } from '@/components/shared/page';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import React, { useState } from 'react';
import { View } from 'react-native';
import Animated, { BounceIn, Easing, FadeInDown } from 'react-native-reanimated';

export default function Index() {
  const [isLoginCardVisible, seIsLoginCardVisible] = useState(false);

  return (
    <Page.Keyboard
      background="primary"
      alignItems="center"
      justifyContent="end"
      hasHeader={false}
      needsPadding={false}
    >
      <Animated.View
        key="loginLogo"
        entering={BounceIn.duration(800).easing(Easing.ease)}
        className="absolute top-32 flex h-48 justify-center overflow-hidden rounded-2xl"
      >
        <Image source={require('../assets/images/mim-logo-tec.webp')} alt="Logo" size="2xl" />
      </Animated.View>
      {isLoginCardVisible ? (
        <AnimatedSlideInViewCard key="loginCard" className="!pb-24">
          <Heading className="my-10 text-center text-2xl font-bold">Login</Heading>
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
