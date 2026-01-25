import { Icon } from '@/components/ui/icon';
import { MenuItem as MenuItemGS, MenuItemLabel as MenuItemLabelGS } from '@/components/ui/menu';
import clsx from 'clsx';

interface Props {
  label: string;
  icon?: React.ElementType;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  onPress?: () => void;
}

export const MenuItem = ({ label, icon, size = 'md', className, onPress }: Props) => {
  return (
    <MenuItemGS textValue={label} className={clsx(className)} onPress={onPress}>
      {icon && <Icon as={icon} size={size} className="mr-2" />}
      <MenuItemLabelGS size={size}>{label}</MenuItemLabelGS>
    </MenuItemGS>
  );
};
