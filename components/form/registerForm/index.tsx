import { DynamicInput, DynamicInputProps } from '@/components/shared/DynamicInput';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
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
  ['name', 'cpf', 'phoneNumber', 'email', 'password', 'confirmPassword'],
];

export const RegisterForm = () => {
  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState(0);

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

  const backPage = () => {
    pagerRef.current?.setPage(page - 1);
  };

  return (
    <PagerView
      ref={pagerRef}
      initialPage={0}
      scrollEnabled={false}
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

            <View className="mt-5 flex w-full flex-col gap-3">
              {page > 0 ? (
                <Button onPress={backPage}>
                  <ButtonIcon as={ChevronLeft} />
                </Button>
              ) : (
                <View />
              )}

              {page < totalPages - 1 ? (
                <Button onPress={nextPage}>
                  <ButtonIcon as={ChevronRight} />
                </Button>
              ) : (
                <Button onPress={onSubmit}>
                  <ButtonText>Finalizar</ButtonText>
                </Button>
              )}
            </View>
          </ScrollView>
        );
      })}
    </PagerView>
  );
};
