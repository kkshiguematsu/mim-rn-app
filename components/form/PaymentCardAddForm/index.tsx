import React from 'react';

import { DynamicInputProps, renderInput, renderInputGroup } from '@/components/shared/DynamicInput';
import { Text } from '@/components/ui/text';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

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

export const PaymentCardAddForm = () => {
  const { control, watch, handleSubmit } = useForm();

  const watchCardNumber = watch('cardNumber');
  const watchExpire = watch('expireDate');
  const watchCvv = watch('cvv');
  const watchName = watch('nameCard');

  return (
    <View>
      <View className="flex gap-3">
        <View className="rounded-2xl bg-purple-600 p-5">
          <Text className="text-lg text-white">{watchCardNumber || '0000 0000 0000 0000'}</Text>
          <Text className="text-white">{watchName || 'NOME COMPLETO'}</Text>
          <Text className="text-white">{watchCvv || 'CVV'}</Text>
          <Text className="text-white">{watchExpire || 'MM/AA'}</Text>
        </View>

        {mockPaymentCardForm.map((input: DynamicInputProps) => (
          <View key={`view-input-${input.label}`}>
            {input.group && input.group?.length > 0
              ? renderInputGroup(control, input.group)
              : renderInput(control, input)}
          </View>
        ))}
      </View>
    </View>
  );
};
