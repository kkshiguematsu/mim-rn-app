import { UserProfileForm } from '@/components/form/userProfileForm';
import { UserAvatarInfo } from '@/components/page/user/UserAvatarInfo';
import { AnimatedSlideInViewCard } from '@/components/shared/cards/AnimatedViewCard';

import { Page } from '@/components/shared/page/Page';
import React from 'react';

export default function UserIdPage() {
  return (
    <Page.Scroll needsPadding={false} needsSafeArea background="primary">
      <UserAvatarInfo backgroundDark={true} />
      <AnimatedSlideInViewCard hasBottomMenu className="rounded-b-none">
        <UserProfileForm />
      </AnimatedSlideInViewCard>
    </Page.Scroll>
  );
}
