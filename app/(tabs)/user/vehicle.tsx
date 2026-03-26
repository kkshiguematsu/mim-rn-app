import { Page } from '@/components/layout/page';
import { Heading } from '@/components/ui/heading';

import React from 'react';
import { View } from 'react-native';
export default function VehiclePage() {
  return (
    <Page.Scroll needsPadding={false} hasHeader={false}>
      <Page.Header
        content={
          <View className="mb-4 flex-row items-center justify-between px-7">
            <View>
              <Heading size="3xl" className="text-black dark:text-white">
                Histórico
              </Heading>
            </View>
            {/* <Button>
              <ButtonIcon as={} />
            </Button> */}
          </View>
        }
      />
    </Page.Scroll>
  );
}
