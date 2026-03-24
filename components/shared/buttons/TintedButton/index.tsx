import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Pressable } from 'react-native';
import { ButtonColor, buttonContainerStyles, buttonIconStyles, buttonTextStyles } from './styles';

interface Props {
  label: string;
  color?: ButtonColor;
  icon?: React.ElementType;
  onPress?: () => void;
  className?: string;
}

export const TintedButton = ({ label, color = 'neutral', icon, onPress, className }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className={buttonContainerStyles({ color, class: className })}
      style={({ pressed }) => pressed && { opacity: 0.7 }}
    >
      {icon && <Icon as={icon} className={buttonIconStyles({ color })} />}
      <Text className={buttonTextStyles({ color })}>{label}</Text>
    </Pressable>
  );
};
