import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import { useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

export interface DynamicInputProps {
  type: InputTypes;
  label: string;
  name: string;
  placeholder: string;
  rules: any;
  control?: Control<FieldValues, any, FieldValues>;
}

const sizeInput = 'xl';

export const DynamicInput = ({
  control,
  type,
  label,
  name,
  placeholder,
  rules,
}: DynamicInputProps) => {
  const renderInput = (onBlur: () => void, onChange: (text: string) => void, value: string) => {
    switch (type) {
      case InputTypes.TEXT:
        return (
          <Input size={sizeInput}>
            <InputField
              type="text"
              className="font-[Poppins_400Regular]"
              placeholder={placeholder}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          </Input>
        );

      case InputTypes.PASSWORD:
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        const handleShowPassoword = () => {
          setIsPasswordVisible((old) => !old);
        };

        return (
          <Input size={sizeInput}>
            <InputField
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder={placeholder}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
            <InputSlot className="pr-3" onPress={handleShowPassoword}>
              <InputIcon as={isPasswordVisible ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        );

      default:
        return <></>;
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onBlur, onChange, value } }) => renderInput(onBlur, onChange, value)}
    />
  );
};
