import { Page } from '@/components/layout/page';
import { UserAvatarInfo } from '@/components/page/user/UserAvatarInfo';
import { UserMenuList } from '@/components/page/user/userMenuList';
import { Divider } from '@/components/ui/divider';

import React from 'react';
export default function UserPage() {
  return (
    <Page.Scroll>
      <UserAvatarInfo />
      <Divider orientation={'horizontal'} />
      <UserMenuList />
    </Page.Scroll>
  );
}
