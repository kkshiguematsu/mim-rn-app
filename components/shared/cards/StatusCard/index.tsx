import { ICardProps } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { TintedIcon } from '../../icon/TintedIcon';
import { ColorIcons } from '../../icon/TintedIcon/styles';
import { DefaultCard } from '../DefaultCard';
import { contentStyle, titleStyles } from './styles';

interface StatusCardProps extends ICardProps {
  title: string;
  content?: string;
  children?: React.ReactNode;
  icon?: React.ElementType;
  color?: ColorIcons;
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusCard = (props: StatusCardProps) => {
  const { title, content, children, icon, color, iconSize, padding, className } = props;

  return (
    <DefaultCard {...props} padding={padding} className={className}>
      <View className="mb-2 flex-row items-center gap-2">
        {icon && <TintedIcon icon={icon} color={color} size={iconSize} />}
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
