import { Button, ButtonText } from '@/components/ui/button';

import { DynamicInputProps } from '@/components/shared/form/DynamicInput';
import { RenderForm } from '@/components/shared/form/RenderForm';
import { PaymentCardUi } from '@/components/shared/payment/paymentCardUi';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { getCardBrand } from '@/utils/paymentCard';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

export const PaymentCardAddForm = () => {
  const formMethods = useForm({
    defaultValues: {
      cardNumber: '',
      expireDate: '',
      cvv: '',
      nameCard: '',
    },
  } as any);
  const { control, watch, handleSubmit } = formMethods;

  const cardNumber = watch('cardNumber');
  console.log(cardNumber);
  const cardFlag = getCardBrand(cardNumber);

  const mockPaymentCardForm: DynamicInputProps[] = [
    {
      type: InputTypes.NUMBER,
      label: 'Número do cartão',
      name: 'cardNumber',
      placeholder: 'Número do cartão',
      rules: {
        required: 'O número do cartão é obrigatório',
      },
    },
    {
      group: [
        {
          type: InputTypes.NUMBER,
          label: 'Data de validade',
          name: 'expireDate',
          placeholder: 'mm/yyyy',
          rules: {
            required: 'A data de validade é obrigatório',
          },
          className: 'flex-1',
        },
        {
          type: InputTypes.NUMBER,
          label: 'cvv',
          name: 'cvv',
          placeholder: 'Três digitos',
          rules: {
            required: 'O cvv do cartão é obrigatório',
          },
          className: 'flex-1',
        },
      ],
    },
    {
      type: InputTypes.TEXT,
      label: 'Nome da pessoa',
      name: 'nameCard',
      placeholder: 'Nome',
      rules: {
        required: 'O nome do cartão é obrigatório',
      },
    },
  ];

  return (
    <View className="">
      <FormProvider {...formMethods}>
        <View className="flex w-full flex-col items-center justify-center">
          <PaymentCardUi watch={watch} />
        </View>

        <RenderForm inputList={mockPaymentCardForm} isBottomSheetInput={true} />

        <Checkbox size={'lg'} value="checkbox-id" className="my-10">
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>Definir como cartão principal</CheckboxLabel>
        </Checkbox>

        <Button action={'primary'} variant={'solid'} size={'lg'}>
          <ButtonText>Cadastrar</ButtonText>
        </Button>
      </FormProvider>
    </View>
  );
};
