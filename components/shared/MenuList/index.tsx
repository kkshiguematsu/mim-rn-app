import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import clsx from 'clsx';

interface MenuListProps {
  children: React.ReactNode;
  className?: string;
}

export const MenuList = ({ children, className }: MenuListProps) => {
  return (
    <Box
      className={clsx(['overflow-hidden rounded-2xl bg-neutral-100 dark:bg-zinc-700', className])}
    >
      <VStack>{children}</VStack>
    </Box>
  );
};
