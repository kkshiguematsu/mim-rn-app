import { DynamicInputProps } from '@/components/shared/form/DynamicInput';
import { RenderForm } from '@/components/shared/form/RenderForm';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form-control';
import { Icon } from '@/components/ui/icon';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { User } from '@/types/user/user.type';
import { formatDateInput } from '@/utils/formatDate';
import { useNavigation } from 'expo-router';
import { Edit } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Pressable } from 'react-native';

const user: User = {
  id: '1234567',
  firstName: 'Kassiano',
  lastName: 'Shiguematsu',

  email: 'kassiano.e@hotmail.com',
  password: '123456',
  phone: '+5545998602082',

  avatarUrl: 'url_avatar',
  coverPhotoUrl: 'url_photo',

  birthDate: 17101997,
  gender: 'male',

  location: {
    country: 'Brasil',
    state: 'Paraná',
    city: 'Foz do Iguaçu',
  },
};

const userInputs: DynamicInputProps[] = [
  {
    title: 'Informações Pessoais',
  },
  {
    type: InputTypes.TEXT,
    label: 'Nome',
    name: 'firstName',
    placeholder: 'Nome',
    className: 'flex-1',
  },
  {
    type: InputTypes.TEXT,
    label: 'Sobrenome',
    name: 'lastName',
    placeholder: 'Sobrenome',
    className: 'flex-1',
  },
  // {
  //   type: InputTypes.EMAIL,
  //   label: 'E-mail',
  //   name: 'email',
  //   placeholder: 'Digite seu e-mail',
  // },
  // {
  //   type: InputTypes.PASSWORD,
  //   label: 'Senha',
  //   name: 'password',
  //   placeholder: 'Digite sua senha',
  // },
  {
    type: InputTypes.TEXT,
    label: 'Telefone',
    name: 'phone',
    placeholder: '+55 (45) 99860-2082',
  },
  {
    group: [
      {
        type: InputTypes.DATE,
        label: 'Data de Nascimento',
        name: 'birthDate',
        placeholder: 'dd/mm/aaaa',
        className: 'flex-1',
      },
      {
        type: InputTypes.SELECT,
        label: 'Gênero',
        name: 'gender',
        placeholder: 'Selecione o gênero',
        className: 'flex-1',
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
    ],
  },
  {
    title: 'Localização',
    className: '!mt-12',
  },
  {
    type: InputTypes.TEXT,
    label: 'País',
    name: 'location.country',
    placeholder: 'Brasil',
  },
  {
    type: InputTypes.TEXT,
    label: 'Estado',
    name: 'location.state',
    placeholder: 'Paraná',
  },
  {
    type: InputTypes.TEXT,
    label: 'Cidade',
    name: 'location.city',
    placeholder: 'Foz do Iguaçu',
  },
];

export const UserProfileForm = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  const navigation = useNavigation();
  const formMethods = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,

      email: user.email,
      password: user.password,
      phone: user.phone,

      avatarUrl: 'url_avatar',
      coverPhotoUrl: 'url_photo',

      birthDate: formatDateInput(user.birthDate?.toString() ?? ''),
      gender: user.gender?.toString(),

      location: {
        country: user.location?.country,
        state: user.location?.state,
        city: user.location?.city,
      },
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const toggleEditProfile = () => {
    setIsDisabled((old) => !old);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable className="ml-1" onPress={toggleEditProfile}>
          <Icon as={Edit} size="2xl" />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <FormControl
      // isInvalid={isInvalid}
      isDisabled={isDisabled}
      isReadOnly={false}
      isRequired={false}
      className="gap-5"
    >
      <FormProvider {...formMethods}>
        <RenderForm inputList={userInputs} />
        <Button className="mt-5" isDisabled={isDisabled}>
          <ButtonText>Salvar</ButtonText>
        </Button>
      </FormProvider>
    </FormControl>
  );
};
