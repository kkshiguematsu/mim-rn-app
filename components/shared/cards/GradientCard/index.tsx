import { Icon } from '@/components/ui/icon';
import { LinearGradient } from '@/components/ui/linear-gradient';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/context/themeContext';
import React from 'react';
import { View } from 'react-native';
import { getGradientColors, getGradientColorsWithOpacity, gradientVariants } from './styles';
import { GradientCardProps } from './types';

export const GradientCard = ({ session, icon, gradient }: GradientCardProps) => {
  const { isDark } = useTheme();

  return (
    <LinearGradient
      colors={getGradientColorsWithOpacity(gradient.color, isDark)}
      start={gradient.start}
      end={gradient.end}
      className={gradientVariants({ variant: gradient.color })}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <LinearGradient
            colors={getGradientColors(gradient.color)}
            start={icon?.gradient.start}
            end={icon?.gradient.end}
            className="h-14 w-14 items-center justify-center rounded-2xl"
          >
            <Icon as={icon?.element} color="white" size={'2xl'} />
          </LinearGradient>
          <View>
            <Text className="mb-1 text-sm text-white">Valor total</Text>
            <Text className="text-4xl font-bold text-white">
              {session.price.token} {session.price.value.toFixed(2)}
            </Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="mb-1 text-xs text-white">Por kWh</Text>
          <Text className="font-semibold text-white">
            {session.price.token} {(session.price.value / session.kwh).toFixed(2)}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};
