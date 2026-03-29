import { FieldGroup } from '@/components/form/formContainer';
import { FieldRow } from '@/components/form/formContainer/formRow';
import { RenderColorSelector } from '@/components/form/VehicleForm/components/renderColorPicker';
import { RenderConnectionsComponent } from '@/components/form/VehicleForm/components/renderConnectionsComponent';
import { Section } from '@/components/section/Section';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { BatteryCharging, Car, Palette, Tag, Zap } from 'lucide-react-native';
import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { DynamicInputProps, InputTypeRender } from '../DynamicInput';
import { DynamicInputField } from '../DynamicInput/renderDynamicInput';

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

export interface FormSection {
  title?: string;
  fields: DynamicInputProps[];
}
export interface Props {
  inputTypeRender?: InputTypeRender;
  isDisableForm?: boolean;
}

export const NewRenderForm = ({ inputTypeRender, isDisableForm }: Props) => {
  const { control } = useFormContext();

  return (
    <View className="flex w-full gap-4">
      {VEHICLE_FORM_CONFIG.map((section, sectionIndex) => (
        <Section key={sectionIndex} title={section.title ?? ''}>
          <FieldGroup>
            {section.fields.map((input, index) => {
              return (
                <FieldRow
                  key={input.name}
                  label={input.label ?? ''}
                  icon={input.iconSection}
                  isLast={index === section.fields.length - 1}
                >
                  <DynamicInputField
                    control={control}
                    input={input}
                    inputTypeRender={inputTypeRender}
                    isDisabled={isDisableForm}
                  />
                  {/* {renderDynamicInput(control, input, inputTypeRender, isDisableForm)} */}
                </FieldRow>
              );
            })}
          </FieldGroup>
        </Section>
      ))}
    </View>
  );
};
