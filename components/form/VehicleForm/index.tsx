import { RenderColorSelector } from '@/components/form/VehicleForm/components/renderColorPicker';
import { RenderConnectionsComponent } from '@/components/form/VehicleForm/components/renderConectorCharger';
import { FormSection, NewRenderForm } from '@/components/shared/form/RenderForm/NewRenderForm';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { useCreateVehicle } from '@/hooks/api/vehicle/useCreateVehicle';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { INITIAL_FORM_DATA, VehicleFormData } from '@/types/vehicle/vehicle.type';
import { BatteryCharging, Cable, Calendar, Car, Palette, Tag, Zap } from 'lucide-react-native';
import { FormProvider, useForm } from 'react-hook-form';

export const VEHICLE_FORM_CONFIG: FormSection[] = [
  {
    title: 'Identificação',
    fields: [
      {
        type: InputTypes.TEXT,
        name: 'brand',
        label: 'Marca',
        placeholder: 'Tesla',
        iconSection: { icon: Tag, color: 'blue' },
        rules: {
          required: 'Marca é obrigatória',
        },
      },
      {
        type: InputTypes.TEXT,
        name: 'model',
        label: 'Modelo',
        placeholder: 'Model 3',
        iconSection: { icon: Car, color: 'red' },
        rules: {
          required: 'Modelo é obrigatório',
        },
      },
      {
        type: InputTypes.NUMBER,
        name: 'year',
        label: 'Ano',
        placeholder: '2020',
        iconSection: { icon: Calendar, color: 'amber' },
        rules: {
          required: 'Ano é obrigatório',
        },
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
        rules: {
          required: 'Capacidade da bateria é obrigatória',
        },
      },
    ],
  },

  {
    title: 'Tipo de conector',
    repeatableGroup: {
      name: 'connector',
      label: 'Conectores',
      fields: [
        {
          type: InputTypes.SELECTBUTTON,
          name: 'type',
          label: 'Conector',
          iconSection: { icon: Cable, color: 'blue' },
          renderComponent: RenderConnectionsComponent,
          rules: {
            required: 'Tipo de conector é obrigatório',
          },
        },
        {
          type: InputTypes.NUMBER,
          name: 'maxPowerKw',
          label: 'Pot. máx.',
          placeholder: 'kW',
          iconSection: { icon: Zap, color: 'lime' },
          rules: {
            required: 'Potência máxima é obrigatória',
          },
        },
      ],
      rules: {
        validate: (value: any[]) =>
          (value && value.length > 0) || 'Adicione pelo menos um conector',
      },
    },
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
        rules: {
          required: 'Potência máxima é obrigatória',
        },
      },
    ],
  },

  // {
  //   title: 'Apelido (opcional)',
  //   fields: [
  //     {
  //       type: InputTypes.TEXT,
  //       name: 'nickname',
  //       label: 'Apelido',
  //       placeholder: ' Tesla favorito',
  //       iconSection: { icon: Palette, color: 'pink' },
  //     },
  //   ],
  // },
];

export const VehicleForm = () => {
  const { mutate, isPending } = useCreateVehicle();
  const methods = useForm<VehicleFormData>({
    defaultValues: INITIAL_FORM_DATA,
    mode: 'all',
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: VehicleFormData) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <NewRenderForm sections={VEHICLE_FORM_CONFIG} inputTypeRender={'native'} />
      <Button size="xl" className="h-14 rounded-2xl" onPress={handleSubmit(onSubmit)}>
        {isPending && <ButtonSpinner color="white" />}
        <ButtonText>Cadastrar veículo</ButtonText>
      </Button>
    </FormProvider>
  );
};
