import { profileMenuLayout } from '@/app/(tabs)/user/_layout';
import {
  ProfileMenuItem,
  ProfileMenuItemProps,
} from '@/components/shared/ProfileMenuList/ProfileMenuItem';
import { Box } from '@/components/ui/box';
import { useLogout } from '@/hooks/api/auth/useLogout';
import { useRouter } from 'expo-router';
import { LogOut } from 'lucide-react-native';

export const profileMenuList: ProfileMenuItemProps[] = [
  profileMenuLayout.personalInfo,
  profileMenuLayout.vehicles,
  profileMenuLayout.payments,
  profileMenuLayout.support,
  profileMenuLayout.settings,
];

export const UserMenuList = () => {
  const router = useRouter();
  const { mutate: logoutMutate } = useLogout();

  const goTo = (route: ProfileMenuItemProps) => {
    if (!route.link) return;

    router.push(route.link);
  };

  const handleLogout = () => {
    logoutMutate();
  };

  return (
    <Box className="">
      {profileMenuList.map((menuItem) => {
        return <ProfileMenuItem key={menuItem.label} {...menuItem} action={() => goTo(menuItem)} />;
      })}
      <ProfileMenuItem
        key={'Logout'}
        label="Logout"
        name="logout"
        icon={LogOut}
        action={handleLogout}
        forceColor="text-red-500"
        isLastItem
      />
    </Box>
  );
};
