import { DynamicInputProps } from '@/components/shared/form/DynamicInput/renderInput/types';
import { RenderForm } from '@/components/shared/form/RenderForm';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { useShareVehicle } from '@/hooks/api/vehicle/useShareVehicle';
import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { ShareVehicleFormData } from '@/types/vehicle/vehicle-form.type';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

const shareVehicleInputs: DynamicInputProps[] = [
  {
    type: InputTypes.EMAIL,
    label: 'Email',
    name: 'email',
    placeholder: 'Digite o email',
    rules: {
      required: 'O email é obrigatório',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Digite um email válido',
      },
    },
  },
];

export const ShareVehicleForm = () => {
  const { mutate, isPending } = useShareVehicle();
  const { modalData } = useBottomSheetStore();

  const formMethods = useForm<ShareVehicleFormData>({
    defaultValues: {
      email: '',
      vehicleId: modalData?.vehicleId || '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = (data: ShareVehicleFormData) => {
    mutate(data);
  };

  return (
    <View className="flex gap-7">
      <FormProvider {...formMethods}>
        <RenderForm inputList={shareVehicleInputs} inputTypeRender="bottomSheet" />
        <Button className="h-14 rounded-2xl" onPress={formMethods.handleSubmit(onSubmit)}>
          {isPending && <ButtonSpinner color="white" />}
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      </FormProvider>
    </View>
  );
};
