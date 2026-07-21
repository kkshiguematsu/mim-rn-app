import { DynamicInputProps } from '@/components/shared/form/DynamicInput/renderInput/types';
import { RenderForm } from '@/components/shared/form/RenderForm';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Link, LinkText } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { useLogin } from '@/hooks/api/auth/useLogin';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { LoginFormType } from '@/types/auth/login.type';
import { BottomSheetNames } from '@/types/bottomsheet/bottomSheetNames';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { useRouter } from 'expo-router';
import { Lock, Mail } from 'lucide-react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

const loginInputs: DynamicInputProps[] = [
  {
    type: InputTypes.EMAIL,
    label: 'Email',
    name: 'email',
    icon: Mail,
    placeholder: 'Digite o email',
    rules: { required: 'O email é obrigatório' },
  },
  {
    type: InputTypes.PASSWORD,
    label: 'Senha',
    name: 'password',
    icon: Lock,
    placeholder: 'Digite a senha',
    rules: { required: 'A senha é obrigatória' },
  },
];

export const LoginForm = () => {
  const formMethods = useForm<LoginFormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const { handleSubmit } = formMethods;
  const { navigate } = useRouter();
  const { mutate, isPending } = useLogin();
  const { enableModal } = useBottomSheetStore();

  const submitForm = (data: LoginFormType) => {
    mutate(data);
  };

  return (
    <View>
      <View className="flex gap-3">
        <FormProvider {...formMethods}>
          <RenderForm inputList={loginInputs} />
        </FormProvider>
      </View>

      <View className="my-7 flex w-full items-end">
        <Link href="" onPress={() => enableModal(BottomSheetNames.ForgetPasswordBottomSheet)}>
          <LinkText className="font-bold text-primary-600 no-underline">
            Esqueci minha senha
          </LinkText>
        </Link>
      </View>

      <View className="flex gap-2">
        <Button size="xl" variant="solid" onPress={handleSubmit(submitForm)}>
          {isPending && <ButtonSpinner color="white" />}
          <ButtonText className="text-white">Login</ButtonText>
        </Button>
        <View className="flex flex-row items-center justify-center gap-2">
          <Text>Não tem uma conta?</Text>
          <Link href="" onPress={() => navigate('/(auth)/register')}>
            <LinkText className="font-bold text-primary-600 no-underline">Registre-se</LinkText>
          </Link>
        </View>
      </View>
    </View>
  );
};
