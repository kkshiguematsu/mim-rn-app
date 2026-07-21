import { Page } from '@/components/layout/page';
import { UserAvatarSection } from '@/components/section/UserAvatarSection';
import { UserMenuList } from '@/components/shared/list/UserMenuList';

import React from 'react';
export default function UserPage() {
  return (
    <Page.Scroll hasHeader={false} needsPadding={false}>
      <Page.Header title="Perfil" classNameTitle="px-7" />
      <UserAvatarSection />
      <UserMenuList />
    </Page.Scroll>
  );
}
