import { ResetPasswordForm } from '@/components/form/auth/ResetPasswordForm';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

export const ResetPasswordBottomSheet = () => {
  return (
    <View className="flex-1 gap-5 px-4">
      <Heading className="text-center" size="xl">
        Definir nova senha
      </Heading>
      <Text className="text-center">Escolha uma nova senha para sua conta</Text>
      <ResetPasswordForm />
    </View>
  );
};
