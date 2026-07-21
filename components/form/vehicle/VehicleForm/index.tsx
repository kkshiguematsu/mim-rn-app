import { DynamicInputProps } from '@/components/shared/form/DynamicInput/renderInput/types';
import { RenderForm } from '@/components/shared/form/RenderForm';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useCreateVehicle } from '@/hooks/api/vehicle/useCreateVehicle';
import { useGetVehicleCatalog } from '@/hooks/api/vehicle/useGetVehicleCatolog';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { CreateVehicleFormData, INITIAL_FORM_DATA } from '@/types/vehicle/vehicle-form.type';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';

export const VehicleForm = () => {
  const { mutate, isPending } = useCreateVehicle();
  const { data, isLoading } = useGetVehicleCatalog();

  const methods = useForm<CreateVehicleFormData>({
    defaultValues: INITIAL_FORM_DATA,
    mode: 'onSubmit',
  });

  const vehicleCatalogOptions = useMemo(() => {
    if (!data) return [];

    return data.items.map((vehicle) => ({
      label: `${vehicle.brand} ${vehicle.model} (${vehicle.year})`,
      value: vehicle._id,
    }));
  }, [data]);

  const VEHICLE_FORM_CONFIG: DynamicInputProps[] = useMemo(() => {
    if (isLoading) return [];

    return [
      {
        type: InputTypes.SELECT,
        label: 'Modelo do veículo',
        name: 'catalogId',
        placeholder: 'Selecione o modelo do veículo',
        selectItems: vehicleCatalogOptions,
        rules: {
          required: 'O modelo do veículo é obrigatório',
        },
      },
      {
        type: InputTypes.TEXT,
        label: 'Placa',
        name: 'licensePlate',
        placeholder: 'Digite a placa do veículo',
        rules: {
          required: 'A placa é obrigatória',
        },
      },
    ];
  }, [isLoading]);

  const { handleSubmit } = methods;

  const onSubmit = (data: CreateVehicleFormData) => {
    mutate(data);
  };

  if (isLoading) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <ButtonSpinner />
        <Text>Carregando veículos...</Text>
      </View>
    );
  }

  return (
    <FormProvider {...methods}>
      <RenderForm inputList={VEHICLE_FORM_CONFIG} />
      <Button size="xl" className="mt-16 h-14 rounded-2xl" onPress={handleSubmit(onSubmit)}>
        {isPending && <ButtonSpinner color="white" />}
        <ButtonText>Cadastrar veículo</ButtonText>
      </Button>
    </FormProvider>
  );
};
