import { ForgetPasswordForm } from '@/components/form/auth/ForgetPasswordForm';
import { BottomSheetWrapper } from '@/components/layout/bottomSheet/BottomSheetWrapper';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

export const ForgetPasswordBottomSheet = () => {
  return (
    <BottomSheetWrapper>
      <View className="flex-1 gap-5 px-4">
        <Heading className="text-center" size="lg">
          Esqueceu sua senha?
        </Heading>
        <Text className="text-center">
          Digite seu e-mail abaixo e enviaremos um link para redefinir sua senha
        </Text>
        <ForgetPasswordForm />
      </View>
    </BottomSheetWrapper>
  );
};
