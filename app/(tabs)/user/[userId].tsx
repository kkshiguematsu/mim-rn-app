import { UserProfileForm } from '@/components/form/userProfileForm';
import { UserAvatarInfo } from '@/components/page/user/UserAvatarInfo';
import { AnimatedSlideInViewCard } from '@/components/shared/cards/AnimatedViewCard';

import { Page } from '@/components/layout/page';
import { Icon } from '@/components/ui/icon';
import { usePressableScaleAnimation } from '@/hooks/animations/usePressableScaleAnimation';
import { Edit } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

export default function UserIdPage() {
  const { animatedStyle, pressInScale, pressOutScale } = usePressableScaleAnimation();

  const [isDisabledForm, setIsDisabledForm] = useState(true);

  const handleEditProfileForm = () => {
    setIsDisabledForm((old) => !old);
  };

  return (
    <Page.Keyboard needsPadding={false} hasHeader={false} background="primary">
      <Page.Header
        hasBackButton
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
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow"
            >
              <Icon as={Edit} size="xl" className="text-black" />
            </Animated.View>
          </Pressable>
        }
      />
      <UserAvatarInfo backgroundDark={true} />
      <AnimatedSlideInViewCard hasBottomMenu hasInsertBottom>
        <UserProfileForm isDisabledForm={isDisabledForm} />
      </AnimatedSlideInViewCard>
    </Page.Keyboard>
  );
}
