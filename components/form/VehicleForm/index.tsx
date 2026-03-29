import { NewRenderForm } from '@/components/shared/form/RenderForm/NewRenderForm';
import { INITIAL_FORM_DATA, VehicleFormData } from '@/types/vehicle/vehicle.type';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, ButtonText } from '@/components/ui/button';

export const VehicleForm = () => {
  const methods = useForm<VehicleFormData>({
    defaultValues: INITIAL_FORM_DATA,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: VehicleFormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <NewRenderForm inputTypeRender={'native'} />
      <Button size="xl" className="h-14 rounded-2xl" onPress={handleSubmit(onSubmit)}>
        <ButtonText>Cadastrar veículo</ButtonText>
      </Button>
    </FormProvider>
  );
};
