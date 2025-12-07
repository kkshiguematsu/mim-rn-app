import { MenuItem, MenuItemProps } from '@/components/shared/MenuList/MenuItem';
import { AddPaymentCardButton } from '@/components/shared/buttons/AddPaymentCardButton';
import { Box } from '@/components/ui/box';
import { useRouter } from 'expo-router';
import { CarFront, CreditCard, Headset, LogOut, Settings, User } from 'lucide-react-native';
import { UserMenuItemProps } from '../userMenuItem';

export const userMenuList: MenuItemProps[] = [
  {
    label: 'Informações pessoais',
    name: '[userId]',
    icon: User,
    link: '/user/[userId]',
  },
  {
    label: 'Meus veículos',
    name: 'vehicle',
    icon: CarFront,
    link: '/user/vehicle',
  },
  {
    label: 'Pagamento',
    name: 'payments',
    icon: CreditCard,
    link: '/(tabs)/user/payments',
    rightButton: <AddPaymentCardButton />,
  },
  {
    label: 'Suporte',
    name: 'support',
    icon: Headset,
    link: '/(tabs)/user/support',
  },
  {
    label: 'Configurações',
    name: 'settings',
    icon: Settings,
    link: '/user/settings',
  },
];

const Logout: UserMenuItemProps = {
  label: 'Logout',
  name: 'logout',
  icon: LogOut,
  link: '/',
};

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
