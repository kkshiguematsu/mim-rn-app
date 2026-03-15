import React, { useState } from 'react';
import { View } from 'react-native';
import { TabItem } from './TabNavigationItem';

interface Props<T extends string> {
  tabs: readonly T[];
  defaultTab?: T;
  onTabChange?: (tab: T) => void;
}

export const TabNavigation = <T extends string>({ tabs, defaultTab, onTabChange }: Props<T>) => {
  const [active, setActive] = useState<T>(defaultTab ?? tabs[0]);

  const handlePress = (tab: T) => {
    setActive(tab);
    onTabChange?.(tab);
  };

  return (
    <View className="flex-row rounded-[9px] bg-neutral-200/80 p-0.5 dark:bg-neutral-700">
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <TabItem key={tab} label={tab} isActive={isActive} onPress={() => handlePress(tab)} />
        );
      })}
    </View>
  );
};
