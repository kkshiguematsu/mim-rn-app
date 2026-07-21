import { DynamicInputProps } from '@/components/shared/form/DynamicInput/renderInput/types';
import { RenderForm } from '@/components/shared/form/RenderForm';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { useResetPassword } from '@/hooks/api/auth/useResetPassword';
import { ResetPasswordType } from '@/types/auth/resetPassword.type';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

const resetPasswordInputs: DynamicInputProps[] = [
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

export const ResetPasswordForm = () => {
  const { mutate, isPending } = useResetPassword();

  const formMethods = useForm<ResetPasswordType>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = (data: ResetPasswordType) => {
    mutate(data.password);
  };

  return (
    <View className="flex gap-7">
      <FormProvider {...formMethods}>
        <RenderForm inputList={resetPasswordInputs} inputTypeRender="bottomSheet" />
        <Button
          disabled={isPending}
          className="h-14 rounded-2xl"
          onPress={formMethods.handleSubmit(onSubmit)}
        >
          {isPending && <ButtonSpinner color="white" />}
          <ButtonText>Atualizar senha</ButtonText>
        </Button>
      </FormProvider>
    </View>
  );
};
