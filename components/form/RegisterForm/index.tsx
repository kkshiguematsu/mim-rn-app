import React from 'react';

import { config } from '@/app.config';
import { AnimatedSlideInViewCard } from '@/components/shared/cards/AnimatedViewCard';
import { DynamicInputProps } from '@/components/shared/form/DynamicInput';
import { RenderForm } from '@/components/shared/form/RenderForm';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import { useStaggeredEntering } from '@/hooks/animations/useStaggeredEntering';
import { RegisterFormType } from '@/types/auth/register.type';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

const registerInputs: DynamicInputProps[] = [
  {
    type: InputTypes.TEXT,
    label: 'Nome',
    name: 'name',
    placeholder: 'Digite o nome',
    rules: {
      required: 'O nome é obrigatório',
    },
  },
  {
    type: InputTypes.TEXT,
    label: 'Email',
    name: 'email',
    placeholder: 'Digite o email',
    rules: {
      required: 'O email é obrigatório',
    },
  },
  {
    type: InputTypes.PASSWORD,
    label: 'Senha',
    name: 'password',
    placeholder: 'Digite a senha',
    rules: {
      required: 'A senha é obrigatória',
    },
  },
  {
    type: InputTypes.PASSWORD,
    label: 'Confirmar Senha',
    name: 'confirmPassword',
    placeholder: 'Digite a senha',
    rules: {
      required: 'Confirmação de senha é obrigatória',
    },
  },
];

export const RegisterForm = () => {
  const [isSuccessRegister, setIsSuccessRegister] = useState(false);
  const [isSuccessLogin, setIsSuccessLogin] = useState(false);

  const { navigate } = useRouter();
  const fadeInDown = useFadeInAnimation({ direction: 'up', duration: 500 });
  const { getEntering } = useStaggeredEntering({
    type: 'fade',
    direction: 'down',
    delayBetween: 1000,
  });

  const formMethods = useForm<RegisterFormType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      tenantId: config.tenantId,
      roleId: '',
    },
    mode: 'all',
  });

  const { handleSubmit } = formMethods;

  const onSubmit = (data: RegisterFormType) => {};

  return (
    <>
      {isSuccessRegister ? (
        <Animated.View className="mt-32 flex-1 flex-col items-center gap-10">
          <Animated.View entering={getEntering(0)}>
            <View className="h-44 w-44 items-center justify-center rounded-full bg-neutral-100/10 p-10">
              <Icon as={Check} color="white" className="h-full w-full" />
            </View>
          </Animated.View>

          <Animated.View className="w-2/3" entering={getEntering(0)}>
            <Heading size="2xl" className="text-center text-white">
              Cadastro realizado com sucesso!
            </Heading>
          </Animated.View>

          <Animated.View entering={getEntering(1)}>
            <Heading size="md" className="text-center text-white">
              Estamos finalizando seu acesso...
            </Heading>
          </Animated.View>

          <Animated.View entering={getEntering(2)}>
            <Heading size="md" className="text-center text-white">
              Autenticando...
            </Heading>
          </Animated.View>

          <Animated.View entering={getEntering(3)}>
            <Spinner size="large" color="white" />
          </Animated.View>
        </Animated.View>
      ) : (
        <AnimatedSlideInViewCard className="flex-1 bg-white">
          <View className="flex flex-1 justify-between px-7 py-7">
            <View>
              <Heading className="mb-5">Dados do usuário</Heading>
              <FormProvider {...formMethods}>
                <RenderForm inputList={registerInputs} />
              </FormProvider>
            </View>
            <View className="flex flex-col justify-center gap-1">
              <Button onPress={handleSubmit(onSubmit)} size="xl" className="h-14 rounded-2xl">
                <ButtonText>Cadastrar</ButtonText>
              </Button>
              <View className="flex flex-row items-center justify-center gap-1">
                <Text>Já tem uma conta?</Text>
                <Button variant="link" onPress={() => navigate('/')}>
                  <ButtonText className="text-blue-500 dark:text-blue-400">Entre</ButtonText>
                </Button>
              </View>
            </View>
          </View>
        </AnimatedSlideInViewCard>
      )}
      {isSuccessLogin && (
        <Animated.View
          entering={getEntering(4)}
          className="bg-white"
          style={StyleSheet.absoluteFill}
        />
      )}
    </>
  );
};
