import { DynamicInputProps, renderDynamicInput } from '@/components/shared/DynamicInput';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { useRouter } from 'expo-router';
import { Lock, Mail } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';

const loginInputs: DynamicInputProps[] = [
  {
    type: InputTypes.TEXT,
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
  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState(0);

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

      <View className="mt-2 flex w-full items-end">
        <Button variant="link">
          <ButtonText>
            <Text underline>Esqueci minha senha</Text>
          </ButtonText>
        </Button>
      </View>

      <View className="mt-7 flex gap-2">
        <Button size="xl" variant="solid" onPress={() => replace('/(tabs)/map')}>
          <ButtonText className="text-white">Login</ButtonText>
        </Button>
        <View className="flex flex-row items-center justify-center gap-2">
          <Text>Não tem uma conta?</Text>
          <Button variant="link" onPress={() => navigate('/register')}>
            <ButtonText className="text-blue-500 dark:text-blue-400">Registre-se</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
};
