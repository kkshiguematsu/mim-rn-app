import { LoginForm } from '@/components/form/LoginForm';
import { Page } from '@/components/shared/Page';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
export default function Index() {
  return (
    <Page background="primary" alignItems="center" justifyContent="end">
      {/* <View className="w-full items-center "> */}

      <Image
        source={require('../assets/images/mim-logo-tec.webp')}
        className="rounded-2xl"
        alt="Logo"
        size="xl"
      />

      <View className="w-full bg-white rounded-3xl p-8">
        <Text className=" text-2xl mb-5 font-bold ">Bem vindo a MiM!</Text>
        {/* <Text className="text-center text-xl mb-14 font-bold ">Login</Text> */}
        <LoginForm />
      </View>
    </Page>
  );
}
