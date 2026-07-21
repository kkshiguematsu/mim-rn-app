import { FieldGroup } from '@/components/form/formContainer';
import { FieldRow } from '@/components/form/formContainer/formRow';
import {
  RepeatableFieldGroup,
  RepeatableGroup,
} from '@/components/form/formContainer/RepeatableFieldGroup';
import { Section } from '@/components/section/Section';
import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { InputTypeRender } from '../DynamicInput';
import { DynamicInputField } from '../DynamicInput/renderDynamicInput';
import { DynamicInputProps } from '../DynamicInput/renderInput/types';

export interface FormSection {
  title?: string;
  fields?: DynamicInputProps[];
  repeatableGroup?: RepeatableGroup;
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
      {sections.map((section, sectionIndex, array) => (
        <Section key={sectionIndex} title={section.title ?? ''}>
          {section.fields && (
            <FieldGroup>
              {section.fields.map((input, index) => {
                return (
                  <FieldRow
                    key={input.name}
                    label={input.label ?? ''}
                    icon={input.iconSection}
                    isLast={index === array.length - 1}
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
          )}

          {section.repeatableGroup && (
            <RepeatableFieldGroup
              group={section.repeatableGroup}
              control={control}
              inputTypeRender={inputTypeRender}
              isDisableForm={isDisableForm}
            />
          )}
        </Section>
      ))}
    </View>
  );
};
