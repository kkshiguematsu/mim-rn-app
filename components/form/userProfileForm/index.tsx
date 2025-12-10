import { DynamicInputProps } from '@/components/shared/DynamicInput';
import { renderDynamicInput } from '@/components/shared/DynamicInput/renderDynamicInput';
import { renderInputGroup } from '@/components/shared/DynamicInput/renderInputGroup';
import { renderTitle } from '@/components/shared/DynamicInput/renderTitle';
import { AnimatedSlideInViewCard } from '@/components/shared/cards/AnimatedViewCard';
import { FormControl } from '@/components/ui/form-control';
import { Icon } from '@/components/ui/icon';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { User } from '@/types/user/user.type';
import { useNavigation } from 'expo-router';
import { Edit } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';


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
    defaultValue: user.firstName,
    className: 'flex-1',
  },
  {
    type: InputTypes.TEXT,
    label: 'Sobrenome',
    name: 'lastName',
    placeholder: 'Sobrenome',
    defaultValue: user.lastName,
    className: 'flex-1',
  },
  // {
  //   type: InputTypes.EMAIL,
  //   label: 'E-mail',
  //   name: 'email',
  //   placeholder: 'Digite seu e-mail',
  //   defaultValue: user.email,
  // },
  // {
  //   type: InputTypes.PASSWORD,
  //   label: 'Senha',
  //   name: 'password',
  //   placeholder: 'Digite sua senha',
  //   defaultValue: user.password,
  // },
  {
    type: InputTypes.TEXT,
    label: 'Telefone',
    name: 'phone',
    placeholder: '+55 (45) 99860-2082',
    defaultValue: user.phone,
  },
  {
    group: [
      {
        type: InputTypes.DATE,
        label: 'Data de Nascimento',
        name: 'birthDate',
        placeholder: 'dd/mm/aaaa',
        defaultValue: user.birthDate?.toString(),
        className: 'flex-1',
      },
      {
        type: InputTypes.SELECT,
        label: 'Gênero',
        name: 'gender',
        placeholder: 'Selecione o gênero',
        defaultValue: user.gender,
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

export const UserProfileForm = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleEditProfile = () => {
    setIsDisabled((old) => !old)
  }
  
    
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable className='ml-1' onPress={toggleEditProfile}>
          <Icon as={Edit} size="2xl" />;
        </Pressable>
      ),
    });
  }, [navigation]);
    
  return (
    <AnimatedSlideInViewCard className="rounded-b-none">
      <FormControl
        // isInvalid={isInvalid}
        isDisabled={isDisabled}
        isReadOnly={false}
        isRequired={false}
        className='gap-5 '
      >

      {userInputs.map((input) => (
        <View key={`view-row-${Math.random()}`}>
          {input.title
            ? renderTitle(input.title, input.className)
            : input.group && input.group?.length > 0
              ? renderInputGroup(control, input.group)
              : renderDynamicInput(control, input)}
        </View>
      ))}
      </FormControl>
    </AnimatedSlideInViewCard>
  );
};
