import { MenuList } from '@/components/shared/MenuList';
import { Box } from '@/components/ui/box';
import { CarFront, CreditCard, Headset, LogOut, Settings, User } from 'lucide-react-native';
import { UserMenuItem, UserMenuItemProps } from '../userMenuItem';

export const userMenuList: UserMenuItemProps[] = [
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
  return (
    <Box className="mx-7 mt-10 flex gap-7">
      <MenuList>
        {userMenuList.map((menuItem) => (
          <UserMenuItem key={menuItem.label} {...menuItem} />
        ))}
      </MenuList>
      <MenuList>
        <UserMenuItem key={Logout.label} {...Logout} forceColor="text-red-500" />
      </MenuList>
    </Box>
  );
};
