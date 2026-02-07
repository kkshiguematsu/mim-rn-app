import { UserAvatarInfo } from '@/components/page/user/UserAvatarInfo';
import { UserMenuList } from '@/components/page/user/userMenuList';
import { Page } from '@/components/shared/page/Page';
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
