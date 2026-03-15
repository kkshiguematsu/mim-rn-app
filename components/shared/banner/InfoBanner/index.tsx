import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

type BannerVariant = 'success' | 'info' | 'warning' | 'error';

interface BannerConfig {
  icon: React.ElementType;
  bg: string;
  iconColor: string;
  textColor: string;
}

const BANNER_CONFIG: Record<BannerVariant, BannerConfig> = {
  success: {
    icon: CheckCircle,
    bg: 'bg-green-500/10 dark:bg-green-800/30',
    iconColor: 'text-green-600 dark:text-green-500',
    textColor: 'text-green-700 dark:text-green-500',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-50 dark:bg-blue-980/13 ',
    iconColor: 'text-blue-600 dark:text-blue-500',
    textColor: 'text-blue-700 dark:text-blue-500',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-50 dark:bg-amber-800/30',
    iconColor: 'text-amber-600 dark:text-amber-500',
    textColor: 'text-amber-700  dark:text-amber-500',
  },
  error: {
    icon: XCircle,
    bg: 'bg-red-50 dark:bg-red-800/30',
    iconColor: 'text-red-600 dark:text-red-500',
    textColor: 'text-red-700 dark:text-red-500',
  },
};

interface InfoBannerProps {
  variant?: BannerVariant;
  text: string | React.ReactNode;
  icon?: React.ElementType;
}

export const InfoBanner = ({ variant = 'info', text, icon }: InfoBannerProps) => {
  const config = BANNER_CONFIG[variant];
  const IconComponent = icon ?? config.icon;

  return (
    <View className={`flex-row items-start gap-2.5 rounded-xl px-3.5 py-3 ${config.bg}`}>
      <Icon
        as={IconComponent}
        size={'md'}
        className={config.iconColor}
        style={{ marginTop: 1, flexShrink: 0 }}
      />
      <Text size="sm" className={`flex-1 leading-relaxed ${config.textColor}`}>
        {text}
      </Text>
    </View>
  );
};
