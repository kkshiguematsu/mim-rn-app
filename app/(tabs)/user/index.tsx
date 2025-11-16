import { UserInfos } from '@/components/page/userInfos';
import { Page } from '@/components/shared/Page';
import { Divider } from '@/components/ui/divider';
import { Text } from '@/components/ui/text';

import React from 'react';
export default function UserPage() {
  return (
    <Page needsSafeArea={false}>
      <UserInfos />
      <Divider orientation={'horizontal'} />
      <Text>aa</Text>
    </Page>
  );
}
