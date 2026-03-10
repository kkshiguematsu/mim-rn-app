import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import clsx from 'clsx';
import { Search } from 'lucide-react-native';

interface Props {
  value: string;
  placeholder?: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  hasFilter?: React.ReactNode;
  className?: string;
  onChange: (text: string) => void;
}

export const SearchBar = ({
  value,
  placeholder,
  size = 'md',
  hasFilter,
  className,
  onChange,
}: Props) => {
  return (
    <Input size={size} className={clsx(['w-full', className])}>
      <InputSlot className="pl-4">
        <InputIcon as={Search} />
      </InputSlot>
      <InputField
        value={value}
        onChange={(e) => onChange(e.nativeEvent.text)}
        placeholder={placeholder}
      />
      {hasFilter && <InputSlot className="pr-4">{hasFilter}</InputSlot>}
    </Input>
  );
};
