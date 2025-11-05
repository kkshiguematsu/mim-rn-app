import { DynamicInput } from '@/components/shared/DynamicInput';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { InputTypes, LoginInput } from './loginForm.types';

const loginInputs: LoginInput[] = [
  {
    type: InputTypes.TEXT,
    label: 'Login',
    name: 'login',
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <View className="flex-1 gap-5">
      {loginInputs.map(({ type, label, name, placeholder, rules }) => (
        <DynamicInput
          key={label}
          control={control}
          type={type}
          label={label}
          name={name}
          placeholder={placeholder}
          rules={rules}
        />
      ))}
    </View>
  );
};
