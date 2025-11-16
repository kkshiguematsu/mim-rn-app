import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';

interface MenuListProps {
  children: React.ReactNode;
}

export const MenuList = ({ children }: MenuListProps) => {
  return (
    <Box className="overflow-hidden rounded-2xl bg-neutral-100 dark:bg-zinc-700">
      <VStack>{children}</VStack>
    </Box>
  );
};
