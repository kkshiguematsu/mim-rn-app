import { ICardProps } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import clsx from 'clsx';
import { View } from 'react-native';
import { DefaultCard } from '../DefaultCard';
import {
  ColorIcons,
  contentStyle,
  iconColorStyles,
  iconContainerColorStyles,
  titleStyles,
} from './styles';

interface StatusCardProps extends ICardProps {
  title: string;
  content?: string;
  children?: React.ReactNode;
  icon?: React.ElementType;
  color?: ColorIcons;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusCard = (props: StatusCardProps) => {
  const { title, content, children, icon, color, padding, className } = props;

  return (
    <DefaultCard {...props} padding={padding} className={className}>
      <View className="mb-2 flex-row items-center gap-2">
        {icon && (
          <View className={clsx(iconContainerColorStyles({ color }), 'rounded-lg p-2')}>
            <Icon as={icon} className={clsx(iconColorStyles({ color }), 'h-4 w-4')} />
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
