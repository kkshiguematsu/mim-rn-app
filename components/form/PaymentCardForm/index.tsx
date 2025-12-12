import { Button, ButtonText } from '@/components/ui/button';

import { DynamicInputProps } from '@/components/shared/form/DynamicInput';
import { RenderForm } from '@/components/shared/form/RenderForm';
import { PaymentCardUi } from '@/components/shared/payment/paymentCardUi';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { FormControl } from '@/components/ui/form-control';
import { CheckIcon } from '@/components/ui/icon';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { PaymentCardFormInput } from '@/types/form/payment/paymentCardForm.type';
import { PaymentCardType } from '@/types/payment/paymentCard.type';
import { getCardBrand } from '@/utils/paymentCard';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

const mockPaymentCardForm: DynamicInputProps[] = [
  {
    type: InputTypes.NUMBER,
    label: 'Número do cartão',
    name: 'code',
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
        name: 'expiredDate',
        placeholder: 'mm/yyyy',
        rules: {
          required: 'A data de validade é obrigatório',
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
        },
        className: 'flex-1',
      },
    ],
  },
  {
    type: InputTypes.TEXT,
    label: 'Nome da pessoa',
    name: 'userName',
    placeholder: 'Nome',
    rules: {
      required: 'O nome do cartão é obrigatório',
    },
  },
];

type PaymentCardFormProps = {
  paymentCard?: PaymentCardType;
  isDisableForm?: boolean;
};

export const PaymentCardForm = ({ paymentCard, isDisableForm = false }: PaymentCardFormProps) => {
  const formMethods = useForm<PaymentCardFormInput>({
    defaultValues: {
      code: '',
      expiredDate: '',
      cvvCode: '',
      userName: '',
    },
  });
  const { reset, watch, handleSubmit } = formMethods;

  useEffect(() => {
    if (paymentCard) {
      reset({
        code: paymentCard.code,
        expiredDate: paymentCard.expiredDate,
        cvvCode: paymentCard.cvvCode,
        userName: paymentCard.userName,
      });
    }
  }, [paymentCard]);

  const code = watch('code');
  const cardFlag = getCardBrand(code);

  return (
    <FormControl isDisabled={isDisableForm} isReadOnly={false} isRequired={false} className="gap-5">
      <FormProvider {...formMethods}>
        <View className="flex w-full flex-col items-center justify-center">
          <PaymentCardUi />
        </View>

        <RenderForm inputList={mockPaymentCardForm} isBottomSheetInput={true} />

        <Checkbox size={'lg'} value="checkbox-id">
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>Definir como cartão principal</CheckboxLabel>
        </Checkbox>

        <Button action={'primary'} variant={'solid'} size={'lg'} isDisabled={isDisableForm}>
          <ButtonText>{paymentCard ? 'Editar' : 'Cadastrar'}</ButtonText>
        </Button>
      </FormProvider>
    </FormControl>
  );
};
