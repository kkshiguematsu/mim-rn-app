import { DynamicInputProps } from '@/components/shared/form/DynamicInput';
import { renderDynamicInput } from '@/components/shared/form/DynamicInput/renderDynamicInput';
import { Button, ButtonText } from '@/components/ui/button';
import { Link, LinkText } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { useRouter } from 'expo-router';
import { Lock, Mail } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
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
  const { navigate, replace } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data: any) => {
    replace('/(tabs)/map');
  };

  return (
    <View>
      <View className="flex gap-3">
        {loginInputs.map((input) => renderDynamicInput(control, input))}
      </View>

      <View className="my-7 flex w-full items-end">
        <Link href="">
          <LinkText className="font-bold text-blue-500 no-underline">Esqueci minha senha</LinkText>
        </Link>
      </View>

      <View className="flex gap-2">
        <Button size="xl" variant="solid" onPress={() => replace('/(tabs)/map')}>
          <ButtonText className="text-white">Login</ButtonText>
        </Button>
        <View className="flex flex-row items-center justify-center gap-2">
          <Text>Não tem uma conta?</Text>
          <Link href="" onPress={() => navigate('/register')}>
            <LinkText className="font-bold text-blue-500 no-underline">Registre-se</LinkText>
          </Link>
        </View>
      </View>
    </View>
  );
};
