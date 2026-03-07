import { UserProfileForm } from '@/components/form/userProfileForm';
import { UserAvatarInfo } from '@/components/page/user/UserAvatarInfo';
import { AnimatedSlideInViewCard } from '@/components/shared/cards/AnimatedViewCard';

import { Page } from '@/components/layout/page';
import React from 'react';

export default function UserIdPage() {
  return (
    <Page.Keyboard needsPadding={false} needsSafeArea background="primary">
      <UserAvatarInfo backgroundDark={true} />
      <AnimatedSlideInViewCard hasBottomMenu className="rounded-b-none">
        <UserProfileForm />
      </AnimatedSlideInViewCard>
    </Page.Keyboard>
  );
}
