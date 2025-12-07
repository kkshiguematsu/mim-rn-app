import { UserAvatarInfo } from '@/components/page/user/UserAvatarInfo';
import { DynamicInputProps } from '@/components/shared/DynamicInput';
import { renderDynamicInput } from '@/components/shared/DynamicInput/renderDynamicInput';
import { Page } from '@/components/shared/Page';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { User } from '@/types/user/user.type';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

const user: User = {
  id: '1234567',
  firstName: 'Kassiano',
  lastName: 'Shiguematsu',

  email: 'kassiano.e@hotmail.com',
  password: '123456',
  phone: '+5545998602082',

  avatarUrl: 'url_avatar',
  coverPhotoUrl: 'url_photo',

  birthDate: '17/10/1997',
  gender: 'male',

  location: {
    country: 'Brasil',
    state: 'Paraná',
    city: 'Foz do Iguaçu',
  },
};

const userInputs: DynamicInputProps[] = [
  {
    type: InputTypes.TEXT,
    label: 'Primeiro Nome',
    name: 'firstName',
    placeholder: 'Digite seu primeiro nome',
    defaultValue: user.firstName,
  },
  {
    type: InputTypes.TEXT,
    label: 'Sobrenome',
    name: 'lastName',
    placeholder: 'Digite seu sobrenome',
    defaultValue: user.lastName,
  },
  {
    type: InputTypes.EMAIL,
    label: 'E-mail',
    name: 'email',
    placeholder: 'Digite seu e-mail',
    defaultValue: user.email,
  },
  {
    type: InputTypes.PASSWORD,
    label: 'Senha',
    name: 'password',
    placeholder: 'Digite sua senha',
    defaultValue: user.password,
  },
  {
    type: InputTypes.TEXT,
    label: 'Telefone',
    name: 'phone',
    placeholder: '+55 (45) 99860-2082',
    defaultValue: user.phone,
  },
  {
    type: InputTypes.DATE,
    label: 'Data de Nascimento',
    name: 'birthDate',
    placeholder: 'dd/mm/aaaa',
    defaultValue: user.birthDate,
  },
  {
    type: InputTypes.SELECT,
    label: 'Gênero',
    name: 'gender',
    placeholder: 'Selecione o gênero',
    defaultValue: user.gender,
    selectItems: [
      {
        label: 'Masculino',
        value: 'male',
      },
      {
        label: 'Feminino',
        value: 'female',
      },
      {
        label: 'Outro',
        value: 'Outro',
      },
    ],
  },
  {
    type: InputTypes.TEXT,
    label: 'País',
    name: 'location.country',
    placeholder: 'Brasil',
    defaultValue: user.location?.country,
  },
  {
    type: InputTypes.TEXT,
    label: 'Estado',
    name: 'location.state',
    placeholder: 'Paraná',
    defaultValue: user.location?.state,
  },
  {
    type: InputTypes.TEXT,
    label: 'Cidade',
    name: 'location.city',
    placeholder: 'Foz do Iguaçu',
    defaultValue: user.location?.city,
  },
];

export default function UserIdPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Page needsSafeArea>
      <UserAvatarInfo showInfos={false} />
      <View className="gap-3">{userInputs.map((input) => renderDynamicInput(control, input))}</View>
    </Page>
  );
}
