import { Button, ButtonText } from '@/components/ui/button';

import { DynamicInputProps } from '@/components/shared/form/DynamicInput/renderInput/types';
import { RenderForm } from '@/components/shared/form/RenderForm';
import { PaymentCardUi } from '@/components/shared/payment/paymentCardUi';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import {
  PaymentCardFormPayload,
  useCreatePaymentCard,
} from '@/hooks/api/payment/useCreatePaymentCard';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { PaymentFormData } from '@/types/form/payment/paymentCardForm.type';
import { UserPaymentCard } from '@/types/payment/userPaymentCard.type';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

const paymentForm: DynamicInputProps[] = [
  {
    type: InputTypes.NUMBER,
    label: 'Número do cartão',
    name: 'code',
    mask: 'creditCard',
    placeholder: 'Número do cartão',
    rules: {
      required: 'O número do cartão é obrigatório',
    },
  },
  {
    name: 'group',
    group: [
      {
        type: InputTypes.NUMBER,
        label: 'Data de validade',
        name: 'expiredDate',
        placeholder: 'mm/yy',
        mask: 'expireDate',
        rules: {
          required: 'A data de validade é obrigatório',
          maxLength: {
            value: 5,
            message: 'A data de validade deve conter 4 caracteres',
          },
        },
        className: 'flex-1',
      },
      {
        type: InputTypes.NUMBER,
        label: 'cvv',
        name: 'cvvCode',
        placeholder: 'Três digitos',
        rules: {
          required: 'O cvv do cartão é obrigatório',
          maxLength: {
            value: 3,
            message: 'O cvv deve conter 3 caracteres',
          },
        },
        className: 'flex-1',
      },
    ],
  },
  {
    type: InputTypes.TEXT,
    label: 'Nome da pessoa',
    name: 'holderName',
    placeholder: 'Nome',
    rules: {
      required: 'O nome do cartão é obrigatório',
    },
  },
];

type PaymentCardFormProps = {
  paymentCard?: UserPaymentCard;
  isDisableForm?: boolean;
};

export const PaymentForm = ({ paymentCard, isDisableForm = false }: PaymentCardFormProps) => {
  const formMethods = useForm<PaymentFormData>({
    defaultValues: {
      code: '',
      expiredDate: '',
      cvvCode: '',
      holderName: '',
    },
  });

  const { reset, handleSubmit } = formMethods;
  const { mutate, isPending } = useCreatePaymentCard();

  const onSubmit = (data: PaymentFormData) => {
    const payload: PaymentCardFormPayload = {
      number: data.code.replace(/\s/g, ''),
      expiryMonth: data.expiredDate.split('/')[0],
      expiryYear: `20${data.expiredDate.split('/')[1]}`,
      cvv: data.cvvCode,
      holderName: data.holderName,
    };

    mutate(payload);
  };

  return (
    <FormProvider {...formMethods}>
      <View className="flex gap-4">
        <View className="flex w-full flex-col items-center justify-center">
          <PaymentCardUi />
        </View>

        <RenderForm
          inputList={paymentForm}
          isDisableForm={isDisableForm}
          inputTypeRender={'bottomSheet'}
        />

        <Checkbox size={'lg'} value="checkbox-id">
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>Definir como cartão principal</CheckboxLabel>
        </Checkbox>

        <Button
          action={'primary'}
          variant={'solid'}
          size={'lg'}
          isDisabled={isDisableForm || isPending}
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText>{paymentCard ? 'Editar' : 'Cadastrar'}</ButtonText>
        </Button>
      </View>
    </FormProvider>
  );
};
