import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { cardStyles, iconContainerStyles, iconStyles } from './styles';

interface MainChargingCardProps {
  title: string;
  content?: string;
  children?: React.ReactNode;
  icon?: React.ElementType;
  color?:
    | 'primary'
    | 'blue'
    | 'green'
    | 'purple'
    | 'orange'
    | 'red'
    | 'yellow'
    | 'pink'
    | 'indigo'
    | 'cyan';
  size?: 'sm' | 'md' | 'lg' | 'full'; // ✅ Variante de tamanho
  variant?: 'default' | 'elevated' | 'outlined'; // ✅ Variante de estilo
  className?: string;
}

export const MainChargingCard = ({
  title,
  content,
  children,
  icon,
  color,
  size = 'md',
  variant = 'default',
  className,
}: MainChargingCardProps) => {
  return (
    <Card className={cardStyles({ size, variant, class: className })}>
      <View className="mb-2 flex-row items-center gap-2">
        {icon && (
          <View className={iconContainerStyles({ color })}>
            <Icon as={icon} className={iconStyles({ color })} />
          </View>
        )}
        <Text className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{title}</Text>
      </View>
      {children && children}
      {content && (
        <Text className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{content}</Text>
      )}
    </Card>
  );
};
