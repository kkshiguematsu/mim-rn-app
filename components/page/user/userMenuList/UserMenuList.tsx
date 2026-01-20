import { userMenuList } from '@/app/(tabs)/user/_layout';
import { MenuItem } from '@/components/shared/MenuList/MenuItem';
import { Box } from '@/components/ui/box';
import { useRouter } from 'expo-router';

export const UserMenuList = () => {
  const router = useRouter();

  return (
    <Box className="mt-10 flex gap-7">
      <Box className="gap-3">
        {userMenuList.map((menuItem) => {
          const goTo = () => {
            if (!menuItem.link) return;

            if (menuItem.link === '/') {
              router.replace('/');
            }

            router.navigate(menuItem.link);
          };

          return <MenuItem key={menuItem.label} {...menuItem} action={goTo} />;
        })}
      </Box>
      <MenuItem
        className="mt-5"
        key={Logout.label}
        {...Logout}
        action={() => router.replace('/')}
        forceColor="text-red-500"
      />
    </Box>
  );
};
