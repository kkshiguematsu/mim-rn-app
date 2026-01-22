import { userMenuList } from '@/app/(tabs)/user/_layout';
import { MenuItem, MenuItemProps } from '@/components/shared/MenuList/MenuItem';
import { Box } from '@/components/ui/box';
import { useRouter } from 'expo-router';

export const UserMenuList = () => {
  const router = useRouter();

  const goTo = (route: MenuItemProps) => {
    if (!route.link) return;

    if (route.link === '/') {
      router.replace('/');
    }

    router.navigate(route.link);
  };

  return (
    <Box className="mt-10 flex gap-7">
      <Box className="gap-3">
        {userMenuList.map((menuItem) => {
          return <MenuItem key={menuItem.label} {...menuItem} action={() => goTo(menuItem)} />;
        })}
      </Box>
      <MenuItem
        className="mt-5"
        key={'logut'}
        label={'Logout'}
        action={() => router.replace('/')}
        forceColor="text-red-500"
      />
    </Box>
  );
};
