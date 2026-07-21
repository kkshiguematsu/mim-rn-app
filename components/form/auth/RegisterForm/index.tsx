import React from 'react';

import { AnimatedSlideInViewCard } from '@/components/shared/cards/AnimatedViewCard';
import { DynamicInputProps } from '@/components/shared/form/DynamicInput/renderInput/types';
import { RenderForm } from '@/components/shared/form/RenderForm';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { config } from '@/constants/config';
import { useStaggeredEntering } from '@/hooks/animations/useStaggeredEntering';
import { useLogin } from '@/hooks/api/auth/useLogin';
import { useRegister } from '@/hooks/api/auth/useRegister';
import { RegisterFormType } from '@/types/auth/register.type';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
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
    type: InputTypes.NUMBER,
    label: 'CPF',
    name: 'taxId',
    placeholder: 'Digite o CPF',
    mask: 'cpf',
    rules: {
      required: 'O CPF é obrigatório',
    },
  },
  {
    type: InputTypes.NUMBER,
    label: 'Telefone',
    name: 'phone',
    placeholder: '(12) 34567-8901',
    mask: 'phone',
    rules: {
      required: 'O telefone é obrigatório',
    },
  },
  {
    type: InputTypes.EMAIL,
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
      minLength: {
        value: 6,
        message: 'A senha deve ter no mínimo 6 caracteres',
      },
    },
  },
  {
    type: InputTypes.PASSWORD,
    label: 'Confirmar Senha',
    name: 'confirmPassword',
    placeholder: 'Digite a senha',
    rules: {
      required: 'Confirmação de senha é obrigatória',
      validate: (value: string, formValues: any) => {
        return value === formValues.password || 'As senhas não coincidem';
      },
    },
  },
];

export const RegisterForm = () => {
  const { navigate } = useRouter();
  const { mutate: registerMutate, isPending, isSuccess: isSuccessRegister } = useRegister();
  const { mutate: loginMutate, isPending: isLoginPending, isSuccess: isSuccessLogin } = useLogin();
  const { getEntering } = useStaggeredEntering({
    type: 'fade',
    direction: 'down',
    delayBetween: 1000,
  });

  const formMethods = useForm<RegisterFormType>({
    defaultValues: {
      name: '',
      taxId: '',
      phone: '',
      email: '',
      password: '',
      tenantId: config.tenantId,
      roleId: config.roleId,
    },
    mode: 'all',
  });

  const { handleSubmit } = formMethods;

  const onSubmit = (data: RegisterFormType) => {
    const registerPayload = {
      name: data.name,
      taxId: data.taxId,
      phone: data.phone,
      email: data.email,
      password: data.password,
      tenantId: config.tenantId,
      roleId: config.roleId,
    };

    registerMutate(registerPayload, {
      onSuccess: () => {
        const loginPayload = {
          email: data.email,
          password: data.password,
        };

        loginMutate(loginPayload, {
          onSuccess: () => {
            setTimeout(() => {
              navigate('/home');
            }, 5000);
          },
        });
      },
    });
  };

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
                {isPending && <ButtonSpinner color="white" />}
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
