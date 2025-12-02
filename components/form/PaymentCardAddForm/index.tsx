import { Button, ButtonText } from '@/components/ui/button';

import { DynamicInputProps, renderInput, renderInputGroup } from '@/components/shared/DynamicInput';
import { PaymentCardUi } from '@/components/shared/payment/paymentCardUi';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { Wifi } from 'lucide-react-native';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
const mockPaymentCardForm: DynamicInputProps[] = [
  {
    type: InputTypes.NUMBER,
    label: 'Número do cartão',
    name: 'cardNumber',
    icon: Wifi,
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

  return (
    <View>
      <FormProvider {...formMethods}>
        <View className="flex w-full flex-col items-center justify-center">
          <PaymentCardUi watch={watch} />
        </View>

        <View className="fl0oex mt-5 w-full gap-3">
          {mockPaymentCardForm.map((input: DynamicInputProps) => (
            <View key={`view-input-${input.label}`}>
              {input.group && input.group?.length > 0
                ? renderInputGroup(control, input.group)
                : renderInput(control, input)}
            </View>
          ))}
        </View>

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
