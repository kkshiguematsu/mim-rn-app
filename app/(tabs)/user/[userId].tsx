import { UserProfileForm } from '@/components/form/userProfileForm';
import { UserAvatarInfo } from '@/components/page/user/UserAvatarInfo';

import { Page } from '@/components/shared/Page';
import React from 'react';

export default function UserIdPage() {
  return (
    <Page needsPadding={false} needsSafeArea background="primary">
      <UserAvatarInfo backgroundDark={true} />
      <UserProfileForm />
    </Page>
  );
}
