import { DynamicInputProps } from '@/components/shared/form/DynamicInput';
import { RenderForm } from '@/components/shared/form/RenderForm';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { useForgetPassword } from '@/hooks/api/auth/useForgetPassword';
import { ForgetPasswordType } from '@/types/auth/forgetPassword.type';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

const forgetPasswordInputs: DynamicInputProps[] = [
  {
    type: InputTypes.EMAIL,
    label: 'Email',
    name: 'email',
    placeholder: 'Digite o email',
    rules: {
      required: 'O email é obrigatório',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Digite um email válido',
      },
    },
  },
];

export const ForgetPasswordForm = () => {
  const { mutate, isPending } = useForgetPassword();

  const formMethods = useForm<ForgetPasswordType>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = (data: ForgetPasswordType) => {
    mutate(data.email);
  };

  return (
    <View className="flex gap-7">
      <FormProvider {...formMethods}>
        <RenderForm inputList={forgetPasswordInputs} inputTypeRender="bottomSheet" />
        <Button className="h-14 rounded-2xl" onPress={formMethods.handleSubmit(onSubmit)}>
          {isPending && <ButtonSpinner color="white" />}
          <ButtonText>Enviar</ButtonText>
        </Button>
      </FormProvider>
    </View>
  );
};
