import { UserInfos } from '@/components/page/user/userInfos';
import { UserMenuList } from '@/components/page/user/userMenuList';
import { Page } from '@/components/shared/Page';
import { Divider } from '@/components/ui/divider';

import React from 'react';
export default function UserPage() {
  return (
    <Page needsSafeArea={false}>
      <UserInfos />
      <Divider orientation={'horizontal'} />
      <UserMenuList />
    </Page>
  );
}
