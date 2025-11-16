import { MenuList } from '@/components/shared/MenuList';
import { Box } from '@/components/ui/box';
import { CarFront, CreditCard, Headset, LogOut, Settings, User } from 'lucide-react-native';
import { UserMenuItem } from '../userMenuItem';

const menuList = [
  {
    label: 'Informações pessoais',
    icon: User,
    link: '',
  },
  {
    label: 'Meus veículos',
    icon: CarFront,
    link: '',
  },
  {
    label: 'Pagamento',
    icon: CreditCard,
    link: '',
  },
  {
    label: 'Suporte',
    icon: Headset,
    link: '',
  },
  {
    label: 'Configurações',
    icon: Settings,
    link: '',
  },
];

const Logout = {
  label: 'Logout',
  icon: LogOut,
  link: '',
};

export const UserMenuList = () => {
  return (
    <Box className="m-7 flex gap-5">
      <MenuList>
        {menuList.map((menuItem) => (
          <UserMenuItem key={menuItem.label} {...menuItem} />
        ))}
      </MenuList>
      <MenuList>
        <UserMenuItem key={Logout.label} {...Logout} forceColor="red" />
      </MenuList>
    </Box>
  );
};
