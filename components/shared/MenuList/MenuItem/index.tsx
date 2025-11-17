import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { TouchableOpacity, View } from 'react-native';

export type MenuItemProps = {
  label: string;
  icon?: React.ElementType;
  content: React.ReactNode;
};

export const MenuItem = ({ label, icon, content }: MenuItemProps) => {
  return (
    <TouchableOpacity className="flex flex-row items-center justify-between px-5 py-4">
      <View className="flex flex-row items-center gap-4">
        {icon && <Icon as={icon} size="xl" />}
        <Heading>{label}</Heading>
      </View>
      {content}
    </TouchableOpacity>
  );
};
