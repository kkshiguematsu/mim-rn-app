import { Text } from '@/components/ui/text';

import { DynamicInputProps, InputTypeRender } from '@/components/shared/form/DynamicInput';
import { DynamicInputField } from '@/components/shared/form/DynamicInput/renderDynamicInput';
import { Icon } from '@/components/ui/icon';
import { usePressableScaleAnimation } from '@/hooks/animations/usePressableScaleAnimation';
import { Plus, Trash } from 'lucide-react-native';
import React from 'react';
import { Control, FieldValues, useFieldArray, useFormState } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { FieldGroup } from '.';
import { FieldRow } from './formRow';
export interface RepeatableGroup {
  name: string;
  label?: string;
  fields: DynamicInputProps[];
  rules?: any;
}
export interface RepeatableFieldGroupProps<T extends FieldValues = FieldValues> {
  group: RepeatableGroup;
  control: Control<T>;
  inputTypeRender?: InputTypeRender;
  isDisableForm?: boolean;
}
export const RepeatableFieldGroup = ({
  group,
  control,
  inputTypeRender,
  isDisableForm,
}: RepeatableFieldGroupProps) => {
  const { errors } = useFormState({
    control,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: group.name,
    rules: group.rules,
  });
  const { animatedStyle, pressInScale, pressOutScale } = usePressableScaleAnimation();

  const getArrayErrorMessage = (): string | undefined => {
    const arrayError = errors[group.name];

    if (!arrayError) return undefined;

    if (typeof arrayError === 'object' && 'message' in arrayError) {
      return arrayError.message as string;
    }

    if ('root' in arrayError && arrayError.root && 'message' in arrayError.root) {
      return arrayError.root.message as string;
    }

    return undefined;
  };

  const arrayErrorMessage = getArrayErrorMessage();

  return (
    <>
      <View className="gap-4">
        {fields.map((item, index) => (
          <View key={item.id} className="relative">
            <FieldGroup>
              {group.fields.map((input, fieldIndex) => {
                const fieldName = `${group.name}.${index}.${input.name}`;
                return (
                  <FieldRow
                    key={fieldName}
                    label={input.label ?? ''}
                    icon={input.iconSection}
                    isLast={fieldIndex === group.fields.length - 1}
                  >
                    <DynamicInputField
                      control={control}
                      input={{
                        ...input,
                        name: fieldName,
                        rules: input.rules,
                      }}
                      inputTypeRender={inputTypeRender}
                      isDisabled={isDisableForm}
                    />
                  </FieldRow>
                );
              })}
            </FieldGroup>
            <Pressable
              className="absolute -right-3 -top-3 rounded-full bg-red-500 p-2"
              onPress={() => remove(index)}
            >
              <Icon as={Trash} color="white" size="sm" />
            </Pressable>
          </View>
        ))}
      </View>
      <Pressable
        className=""
        onPressIn={pressInScale}
        onPressOut={pressOutScale}
        onPress={() =>
          append({
            type: null,
            maxPowerKw: null,
          })
        }
      >
        <Animated.View
          style={animatedStyle}
          className="flex flex-row justify-center gap-4 rounded-2xl border border-dashed border-neutral-500 bg-neutral-100/50 p-4"
        >
          <Icon as={Plus} />
        </Animated.View>
        {arrayErrorMessage && (
          <Text size="xs" className="self-end text-red-600">
            {arrayErrorMessage}
          </Text>
        )}
      </Pressable>
    </>
  );
};
