import { InputTypes, LoginInput } from '@/components/form/LoginForm/loginForm.types';
import { Input, InputField } from '@/components/ui/input';
import { Control, Controller, FieldValues } from 'react-hook-form';

export interface DynamicInputProps extends LoginInput {
  control: Control<FieldValues, any, FieldValues>;
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
        return (
          <Input size={sizeInput}>
            <InputField
              className=""
              type="password"
              placeholder={placeholder}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
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
