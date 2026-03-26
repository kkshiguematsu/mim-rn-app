import { profileMenuLayout } from '@/app/(tabs)/user/_layout';
import { AddPaymentCardButton } from '@/components/shared/buttons/AddPaymentCardButton';
import {
  ProfileMenuItem,
  ProfileMenuItemProps,
} from '@/components/shared/ProfileMenuList/ProfileMenuItem';
import { Box } from '@/components/ui/box';
import { useRouter } from 'expo-router';
import { LogOut } from 'lucide-react-native';

export const profileMenuList: ProfileMenuItemProps[] = [
  profileMenuLayout.personalInfo,
  profileMenuLayout.vehicles,
  {
    ...profileMenuLayout.payments,
    rightButton: <AddPaymentCardButton />,
  },
  profileMenuLayout.support,
  profileMenuLayout.settings,
];

export const UserMenuList = () => {
  const router = useRouter();

  const goTo = (route: ProfileMenuItemProps) => {
    if (!route.link) return;

    if (route.link === '/') {
      router.replace('/');
    }

    router.push(route.link);
  };

  return (
    <Box className="mt-10 flex gap-7">
      <Box className="gap-3">
        {profileMenuList.map((menuItem) => {
          return (
            <ProfileMenuItem key={menuItem.label} {...menuItem} action={() => goTo(menuItem)} />
          );
        })}
      </Box>
      <ProfileMenuItem
        className="mt-5"
        key={'Logout'}
        label="Logout"
        name="logout"
        icon={LogOut}
        action={() => router.replace('/')}
        forceColor="text-red-500"
      />
    </Box>
  );
};
