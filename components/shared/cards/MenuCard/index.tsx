import clsx from 'clsx';
import React from 'react';
import { SizeIcons } from '../../icon/TintedIcon/styles';
import { DefaultCard } from '../DefaultCard';
import { MenuItem, MenuItemProps } from './MenuItems';

interface Props {
  rows?: MenuItemProps[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  sizeIcon?: SizeIcons;
  children?: React.ReactNode;
}

export const MenuCard = ({ rows, size, sizeIcon = 'md', className, children }: Props) => {
  return (
    <DefaultCard
      className={clsx('overflow-hidden rounded-2xl', className)}
      padding="none"
      fadeIn="down"
    >
      {rows?.map((props, i) => (
        <MenuItem key={i} {...props} size={size} sizeIcon={sizeIcon} />
      ))}

      {children}
    </DefaultCard>
  );
};
