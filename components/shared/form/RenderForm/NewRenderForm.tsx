import { FieldGroup } from '@/components/form/formContainer';
import { FieldRow } from '@/components/form/formContainer/formRow';
import { Section } from '@/components/section/Section';
import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { DynamicInputProps, InputTypeRender } from '../DynamicInput';
import { renderDynamicInput } from '../DynamicInput/renderDynamicInput';
import { renderInputGroup } from '../DynamicInput/renderInput/renderInputGroup';

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
              const isLast = index === section.fields.length - 1;

              return (
                <FieldRow
                  key={input.name}
                  label={input.label ?? ''}
                  icon={input.iconSection}
                  isLast={isLast}
                >
                  {input.group && input.group.length > 0
                    ? renderInputGroup(control, input.group, inputTypeRender, isDisableForm)
                    : renderDynamicInput(control, input, inputTypeRender, isDisableForm)}
                </FieldRow>
              );
            })}
          </FieldGroup>
        </Section>
      ))}
    </View>
  );
};
