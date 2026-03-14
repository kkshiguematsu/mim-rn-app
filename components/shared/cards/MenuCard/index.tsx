import clsx from 'clsx';
import { SizeIcons } from '../../icon/TintedIcon/styles';
import { DefaultCard } from '../DefaultCard';
import { MenuItem, MenuItemProps } from './MenuItems';

interface Props {
  rows?: MenuItemProps[];
  className?: string;
  sizeIcon?: SizeIcons;
}

export const MenuCard = ({ rows, sizeIcon = 'md', className }: Props) => {
  return (
    <DefaultCard
      className={clsx('overflow-hidden rounded-2xl', className)}
      padding="none"
      fadeIn="down"
    >
      {rows?.map((props, i) => (
        <MenuItem key={i} {...props} sizeIcon={sizeIcon} />
      ))}
    </DefaultCard>
  );
};
