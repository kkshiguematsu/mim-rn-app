import { ResetPasswordForm } from '@/components/form/auth/ResetPasswordForm';
import { BottomSheetWrapper } from '@/components/layout/bottomSheet/BottomSheetWrapper';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

export const ResetPasswordBottomSheet = () => {
  return (
    <BottomSheetWrapper>
      <View className="flex-1 gap-5 px-4">
        <Heading className="text-center" size="lg">
          Definir nova senha
        </Heading>
        <Text className="text-center">Escolha uma nova senha para sua conta</Text>
        <ResetPasswordForm />
      </View>
    </BottomSheetWrapper>
  );
};
