import { DynamicInput, DynamicInputProps } from '@/components/shared/form/DynamicInput';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import PagerView from 'react-native-pager-view';

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
    type: InputTypes.TEXT,
    label: 'Confirmar Senha',
    name: 'confirmPassword',
    placeholder: 'Digite a senha',
    rules: { required: 'Confirmação de senha é obrigatória' },
  },
];

const formSteps = [
  ['name', 'cpf', 'phoneNumber'],
  ['email', 'password', 'confirmPassword'],
];

export const RegisterForm = () => {
  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState(0);

  const { navigate } = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const totalPages = formSteps.length;

  const onSubmit = () => {
    // onSubmit(data);
  };

  const nextPage = () => {
    if (page < totalPages - 1) pagerRef.current?.setPage(page + 1);
  };

  return (
    <View className="flex-1">
      <PagerView
        ref={pagerRef}
        initialPage={0}
        scrollEnabled={false}
        overdrag={false}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
        style={{ flex: 1 }}
      >
        {formSteps.map((inputNamesSteps, index) => {
          const currentStepInputs = registerInputs.filter(({ name }) =>
            inputNamesSteps.includes(name)
          );

          return (
            <ScrollView key={`pager-view-${index}`}>
              <View className="w-full gap-7 pt-5">
                {currentStepInputs.map(({ type, label, name, placeholder, rules }, index2) => (
                  <View key={`view-pager-${index2}`} className="flex flex-col gap-2">
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
              </View>
            </ScrollView>
          );
        })}
      </PagerView>
      <View className="mt-5 flex w-full flex-col justify-center gap-3">
        {page < totalPages - 1 ? (
          <Button onPress={nextPage} size="xl">
            <ButtonText>Próximo</ButtonText>
            <ButtonIcon as={ChevronRight} />
          </Button>
        ) : (
          <Button onPress={onSubmit} size="xl">
            <ButtonText>Finalizar</ButtonText>
          </Button>
        )}
        <View className="flex flex-row items-center justify-center gap-2">
          <Text>Já tem uma conta?</Text>
          <Button variant="link" onPress={() => navigate('/')}>
            <ButtonText className="text-blue-500 dark:text-blue-400">Entre</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
};
