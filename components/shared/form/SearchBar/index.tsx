import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Search } from 'lucide-react-native';

interface Props {
  value: string;
  placeholder?: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  hasFilter?: React.ReactNode;
  onChange: (text: string) => void;
}

export const SearchBar = ({ value, placeholder, size = 'md', hasFilter, onChange }: Props) => {
  return (
    <Input size={size} className="flex-1 rounded-full">
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
