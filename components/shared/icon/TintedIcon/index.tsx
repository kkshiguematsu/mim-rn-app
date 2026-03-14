import { Icon } from '@/components/ui/icon';
import clsx from 'clsx';
import { View } from 'react-native';
import { ColorIcons, iconColorStyles, iconContainerColorStyles, SizeIcons } from './styles';

interface Props {
  icon: React.ElementType;
  color?: ColorIcons;
  size?: SizeIcons;
  className?: string;
}

export const TintedIcon = ({ icon, color = 'primary', size = 'md', className }: Props) => {
  return (
    <View className={clsx(iconContainerColorStyles({ color, size }), className)}>
      <Icon as={icon} className={clsx(iconColorStyles({ color, size }))} />
    </View>
  );
};
