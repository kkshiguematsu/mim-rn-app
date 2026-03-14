import { ICardProps } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { TintedIcon } from '../../icon/TintedIcon';
import { ColorIcons } from '../../icon/TintedIcon/styles';
import { DefaultCard } from '../DefaultCard';

interface StatusCardProps extends ICardProps {
  title: string;
  content?: string;
  unit?: string;
  children?: React.ReactNode;
  icon?: React.ElementType;
  color?: ColorIcons;
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusCard = (props: StatusCardProps) => {
  const { title, content, unit, children, icon, color, iconSize, padding, className } = props;

  return (
    <DefaultCard {...props} padding={padding} className={className}>
      <View className="mb-2 flex-row items-center gap-2">
        {icon && <TintedIcon icon={icon} color={color} size={iconSize} />}
        <Text size="xs" className="font-medium text-neutral-500 dark:text-neutral-400">
          {title}
        </Text>
      </View>
      {children}
      {content && (
        <Text size="2xl" className="font-bold text-neutral-900 dark:text-neutral-100">
          {content}{' '}
          {unit && (
            <Text size="md" className="font-normal text-neutral-400/90">
              {unit}
            </Text>
          )}
        </Text>
      )}
    </DefaultCard>
  );
};
