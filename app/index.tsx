import { Text } from '@/components/ui/text';
import React from 'react';

import { LoginForm } from '@/components/form/LoginForm';
import { Page } from '@/components/shared/Page';
import { View } from 'react-native';
export default function Index() {
  return (
    <Page background="primary" align="center">
      <View className="w-full items-center">
        <Text className="text-white text-2xl font-bold">Hello</Text>
      </View>
      <LoginForm />
    </Page>
  );
}
