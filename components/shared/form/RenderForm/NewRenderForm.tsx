import { FieldGroup } from '@/components/form/formContainer';
import { FieldRow } from '@/components/form/formContainer/formRow';
import { Section } from '@/components/section/Section';
import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { DynamicInputProps, InputTypeRender } from '../DynamicInput';
import { DynamicInputField } from '../DynamicInput/renderDynamicInput';

export interface FormSection {
  title?: string;
  fields: DynamicInputProps[];
}
export interface Props {
  sections: FormSection[];
  inputTypeRender?: InputTypeRender;
  isDisableForm?: boolean;
}

export const NewRenderForm = ({ sections, inputTypeRender, isDisableForm }: Props) => {
  const { control } = useFormContext();

  return (
    <View className="flex w-full gap-4">
      {sections.map((section, sectionIndex) => (
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
                </FieldRow>
              );
            })}
          </FieldGroup>
        </Section>
      ))}
    </View>
  );
};
