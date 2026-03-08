import { Heading } from '@/components/ui/heading';
import { View } from 'react-native';

interface Props {
  title: string;
  children: React.ReactNode;
  onPress?: React.ReactNode;
}

export const Section = ({ title, children, onPress }: Props) => {
  return (
    <View className="mb-2 gap-2">
      <View className="flex flex-row items-center justify-between">
        <Heading size="lg">{title}</Heading>
        {onPress && onPress}
      </View>
      {children}
    </View>
  );
};
