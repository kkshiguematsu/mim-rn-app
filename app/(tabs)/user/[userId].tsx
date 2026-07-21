import { UserProfileForm } from '@/components/form/userProfileForm';
import { UserAvatarSection } from '@/components/section/UserAvatarSection';
import { AnimatedSlideInViewCard } from '@/components/shared/cards/AnimatedViewCard';

import { Page } from '@/components/layout/page';
import { Icon } from '@/components/ui/icon';
import { usePressableScaleAnimation } from '@/hooks/animations/usePressableScaleAnimation';
import { Pencil } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

export default function UserIdPage() {
  const { animatedStyle, pressInScale, pressOutScale } = usePressableScaleAnimation();

  const [isDisabledForm, setIsDisabledForm] = useState(true);

  const handleEditProfileForm = () => {
    setIsDisabledForm((old) => !old);
  };

  return (
    <Page.Keyboard
      background="primary"
      needsPadding={false}
      hasHeader={false}
      needsBottomTabBar={false}
    >
      <Page.Header
        hasBackButton
        classNameBackButton="text-white"
        title="Perfil"
        classNameTitle="text-white dark:text-black"
        rightAction={
          <Pressable
            onPress={handleEditProfileForm}
            onPressIn={pressInScale}
            onPressOut={pressOutScale}
          >
            <Animated.View
              style={animatedStyle}
              className="flex h-12 w-12 items-center justify-center rounded-full shadow"
            >
              <Icon as={Pencil} size="xl" className="text-white" />
            </Animated.View>
          </Pressable>
        }
      />
      <View className="flex flex-1 justify-between">
        <UserAvatarSection backgroundDark={true} />
        <AnimatedSlideInViewCard hasBottomMenu hasInsertBottom>
          <UserProfileForm isDisabledForm={isDisabledForm} />
        </AnimatedSlideInViewCard>
      </View>
    </Page.Keyboard>
  );
}
