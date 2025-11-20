import { DynamicInputProps } from '@/components/shared/DynamicInput';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { View } from 'react-native';

const registerInputs: DynamicInputProps[] = [
  {
    type: InputTypes.TEXT,
    label: 'Nome',
    name: 'name',
    placeholder: 'Digite o nome',
    rules: { required: 'O nome é obrigatório' },
  },
  {
    type: InputTypes.TEXT,
    label: 'CPF',
    name: 'cpf',
    placeholder: 'Digite o cpf',
    rules: { required: 'O cpf é obrigatório' },
  },
  {
    type: InputTypes.TEXT,
    label: 'Telefone',
    name: 'phoneNumber',
    placeholder: 'Digite o número de telefone',
    rules: { required: 'O número de telefone é obrigatório' },
  },
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
  {
    type: InputTypes.PASSWORD,
    label: 'Confirmar Senha',
    name: 'confirmPassword',
    placeholder: 'Digite a senha',
    rules: { required: 'Confirmação de senha é obrigatória' },
  },
];

export const RegisterForm = () => {
  return <View></View>;
};
