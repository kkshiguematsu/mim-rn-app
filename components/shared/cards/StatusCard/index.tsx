import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { DefaultCard } from '../DefaultCard';
import { contentStyle, iconContainerStyles, iconStyles, titleStyles } from './styles';

interface StatusCardProps {
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
  size?: 'sm' | 'md' | 'lg' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
}

export const StatusCard = ({
  title,
  content,
  children,
  icon,
  color,
  size,
  padding,
  variant = 'default',
  className,
}: StatusCardProps) => {
  return (
    <DefaultCard size={size} variant={variant} padding={padding} className={className}>
      <View className="mb-2 flex-row items-center gap-2">
        {icon && (
          <View className={iconContainerStyles({ color })}>
            <Icon as={icon} className={iconStyles({ color })} />
          </View>
        )}
        <Text size="xs" className={titleStyles({})}>
          {title}
        </Text>
      </View>
      {children && children}
      {content && (
        <Text size="2xl" className={contentStyle({})}>
          {content}
        </Text>
      )}
    </DefaultCard>
  );
};
