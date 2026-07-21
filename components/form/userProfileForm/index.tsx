import { DynamicInputProps } from '@/components/shared/form/DynamicInput/renderInput/types';
import { RenderForm } from '@/components/shared/form/RenderForm';
import { Button, ButtonText } from '@/components/ui/button';
import { UpdateProfilePayload, usePatchProfile } from '@/hooks/api/user/usePatchProfile';
import { useUserStore } from '@/hooks/store/useUserStore';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { FormProvider, useForm } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';

const userInputs: DynamicInputProps[] = [
  {
    type: InputTypes.TEXT,
    label: 'Nome',
    name: 'name',
    placeholder: 'Nome',
    rules: {
      required: 'O nome é obrigatório',
    },
  },
  {
    type: InputTypes.EMAIL,
    label: 'E-mail',
    name: 'email',
    placeholder: 'Digite seu e-mail',
    rules: {
      required: 'O e-mail é obrigatório',
    },
  },
  {
    type: InputTypes.NUMBER,
    label: 'CPF',
    name: 'taxId',
    placeholder: 'Digite o CPF',
    mask: 'cpf',
    rules: {
      required: 'O CPF é obrigatório',
    },
  },
  {
    type: InputTypes.NUMBER,
    label: 'Telefone',
    name: 'phone',
    placeholder: '(12) 34567-8901',
    mask: 'phone',
    rules: {
      required: 'O telefone é obrigatório',
    },
  },
  // {
  //   group: [
  //     {
  //       type: InputTypes.DATE,
  //       label: 'Data de Nascimento',
  //       name: 'birthDate',
  //       placeholder: 'dd/mm/aaaa',
  //       className: 'flex-1',
  //     },
  //     {
  //       type: InputTypes.SELECT,
  //       label: 'Gênero',
  //       name: 'gender',
  //       placeholder: 'Selecione o gênero',
  //       className: 'flex-1',
  //       selectItems: [
  //         {
  //           label: 'Masculino',
  //           value: 'male',
  //         },
  //         {
  //           label: 'Feminino',
  //           value: 'female',
  //         },
  //         {
  //           label: 'Outro',
  //           value: 'Outro',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   type: InputTypes.TEXT,
  //   label: 'País',
  //   name: 'location.country',
  //   placeholder: 'Brasil',
  // },
  // {
  //   type: InputTypes.TEXT,
  //   label: 'Estado',
  //   name: 'location.state',
  //   placeholder: 'Paraná',
  // },
  // {
  //   type: InputTypes.TEXT,
  //   label: 'Cidade',
  //   name: 'location.city',
  //   placeholder: 'Foz do Iguaçu',
  // },
];

interface Props {
  isDisabledForm: boolean;
}

export const UserProfileForm = ({ isDisabledForm }: Props) => {
  const { user } = useUserStore();
  const { mutate: patchProfile, isPending } = usePatchProfile();

  const formMethods = useForm<UpdateProfilePayload>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      taxId: user?.taxId,
      phone: user?.phone,
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = (data: UpdateProfilePayload) => {
    patchProfile(data);
  };

  return (
    <FormProvider {...formMethods}>
      <RenderForm inputList={userInputs} isDisableForm={isDisabledForm} />
      <Button className="mt-5" isDisabled={isDisabledForm} size="xl">
        {isPending && <ActivityIndicator size={'small'} />}
        <ButtonText onPress={handleSubmit(onSubmit)}>Salvar</ButtonText>
      </Button>
    </FormProvider>
  );
};
