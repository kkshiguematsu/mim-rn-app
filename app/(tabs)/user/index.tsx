import { Page } from '@/components/layout/page';
import { UserAvatarInfo } from '@/components/page/user/UserAvatarInfo';
import { UserMenuList } from '@/components/page/user/userMenuList';

import React from 'react';
export default function UserPage() {
  return (
    <Page.Scroll>
      <UserAvatarInfo />
      <UserMenuList />
    </Page.Scroll>
  );
}
