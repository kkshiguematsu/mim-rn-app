import { FormSection, NewRenderForm } from '@/components/shared/form/RenderForm/NewRenderForm';
import { INITIAL_FORM_DATA, VehicleFormData } from '@/types/vehicle/vehicle.type';
import { BatteryCharging, Car, Palette, Tag, Zap } from 'lucide-react-native';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, ButtonText } from '@/components/ui/button';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { RenderColorSelector } from './components/renderColorPicker';
import { RenderConnectionsComponent } from './components/renderConnectionsComponent';

export const VEHICLE_FORM_CONFIG: FormSection[] = [
  {
    title: 'Identificação',
    fields: [
      {
        type: InputTypes.TEXT,
        name: 'brand',
        label: 'Marca',
        placeholder: 'Tesla',
        iconSection: { icon: Car, color: 'blue' },
        rules: {
          required: 'Obrigatório',
        },
      },
      {
        type: InputTypes.TEXT,
        name: 'model',
        label: 'Modelo',
        placeholder: 'Model 3',
        iconSection: { icon: Car, color: 'red' },
        rules: {
          required: 'Obrigatório',
        },
      },
      {
        type: InputTypes.TEXT,
        name: 'plate',
        label: 'Placa',
        placeholder: 'ABC-1D23',
        iconSection: { icon: Tag, color: 'amber' },
        rules: {
          required: 'Obrigatório',
        },
        // transform: (v: string) => v.toUpperCase(),
      },
    ],
  },

  {
    title: 'Especificações',
    fields: [
      {
        type: InputTypes.NUMBER,
        name: 'batteryCapacityKwh',
        label: 'Bateria',
        placeholder: 'kWh',
        iconSection: { icon: BatteryCharging, color: 'green' },
      },
      {
        type: InputTypes.NUMBER,
        name: 'maxPowerKw',
        label: 'Pot. máx.',
        placeholder: 'kW',
        iconSection: { icon: Zap, color: 'yellow' },
      },
    ],
  },

  {
    title: 'Tipo de conector',
    fields: [
      {
        type: InputTypes.SELECTBUTTON,
        name: 'connector',
        label: 'Conector',
        rules: {
          required: 'Selecione um conector',
        },
        renderComponent: RenderConnectionsComponent,
      },
    ],
  },

  {
    title: 'Cor do veículo',
    fields: [
      {
        type: InputTypes.PICKER,
        name: 'color',
        label: 'Cor',
        iconSection: { icon: Palette, color: 'pink' },
        renderComponent: RenderColorSelector,
      },
    ],
  },

  {
    title: 'Apelido (opcional)',
    fields: [
      {
        type: InputTypes.TEXT,
        name: 'nickname',
        label: 'Apelido',
        placeholder: ' Tesla favorito',
        iconSection: { icon: Palette, color: 'pink' },
      },
    ],
  },
];

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
      <NewRenderForm sections={VEHICLE_FORM_CONFIG} inputTypeRender={'native'} />
      <Button size="xl" className="h-14 rounded-2xl" onLongPress={handleSubmit(onSubmit)}>
        <ButtonText>Cadastrar veículo</ButtonText>
      </Button>
    </FormProvider>
  );
};
