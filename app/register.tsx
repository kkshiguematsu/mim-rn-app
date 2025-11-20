import { Page } from '@/components/shared/Page';
import React, { useRef } from 'react';
import PagerView from 'react-native-pager-view';

import { LoginForm } from '@/components/form/LoginForm';
import { Heading } from '@/components/ui/heading';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Index() {
  const pagerRef = useRef<PagerView>(null);

  const goToPage = (index: number) => {
    pagerRef.current?.setPage(index);
  };

  return (
    <Page
      background="primary"
      alignItems="center"
      justifyContent="start"
      needsSafeArea={false}
      needsPadding={false}
    >
      <Animated.View
        entering={FadeInDown.duration(400).springify()}
        className="h-full w-full rounded-3xl bg-gray-200 p-7 pb-32 dark:bg-zinc-800"
      >
        <Heading className="my-10 text-center text-2xl font-bold">Login</Heading>
        <LoginForm />
      </Animated.View>
    </Page>
  );
}
