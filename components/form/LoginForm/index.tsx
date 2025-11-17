import { DynamicInput } from '@/components/shared/DynamicInput';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { InputTypes, LoginInput } from './loginForm.types';

const loginInputs: LoginInput[] = [
  {
    type: InputTypes.TEXT,
    label: 'Email',
    name: 'email',
    placeholder: 'Digite o email',
    rules: { required: 'O email é obrigatório' },
  },
  {
    type: InputTypes.PASSWORD,
    label: 'Senha',
    name: 'password',
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
    replace('/(tabs)/home');
  };

  return (
    <View className="w-full gap-5">
      {loginInputs.map(({ type, label, name, placeholder, rules }) => (
        <View key={`view-${label}`} className="gap-1">
          <Text key={`text-${label}`} size="md" className="ms-2">
            {label}
          </Text>
          <DynamicInput
            key={`input-${label}`}
            control={control}
            type={type}
            label={label}
            name={name}
            placeholder={placeholder}
            rules={rules}
          />
        </View>
      ))}
      <View className="flex w-full items-end pe-3">
        <Button variant="link">
          <ButtonText>
            <Text className="" underline>
              Esqueci minha senha
            </Text>
          </ButtonText>
        </Button>
      </View>

      <Button size="xl" variant="solid" onPress={() => replace('/(tabs)/home')}>
        <ButtonText>Login</ButtonText>
      </Button>
      <Button size="xl" variant="outline">
        <ButtonText>
          <Text className="" size="xl">
            Cadastrar
          </Text>
        </ButtonText>
      </Button>
    </View>
  );
};
