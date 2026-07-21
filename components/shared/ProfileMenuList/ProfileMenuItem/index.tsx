import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import clsx from 'clsx';
import { Href } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export type ProfileMenuItemProps = {
  label: string;
  name?: string;
  link?: Href;
  icon?: React.ElementType;
  content?: React.ReactNode;
  forceColor?: any;
  rightButton?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  isLastItem?: boolean;
  action?: () => void;
};

export const ProfileMenuItem = ({
  label,
  name,
  link,
  icon,
  content,
  forceColor,
  disabled,
  className,
  rightButton,
  isLastItem = false,
  action,
}: ProfileMenuItemProps) => {
  return (
    <Pressable
      className={clsx(['overflow-hidden', className])}
      onPress={action}
      disabled={disabled}
    >
      {({ pressed }) => (
        <View
          className={clsx([
            'flex flex-row items-center justify-between border-t border-neutral-400/50 px-9 py-6 dark:border-gray-700',
            pressed ? 'bg-primary-300' : '',
            isLastItem && 'border-b',
          ])}
        >
          <View className="flex flex-row items-center gap-4">
            {icon && (
              <Icon
                as={icon}
                size="xl"
                className={clsx([
                  forceColor ? forceColor : 'text-primary-400',
                  pressed && 'text-white',
                ])}
              />
            )}
            <Heading className={clsx([pressed ? 'text-white' : forceColor ? forceColor : ''])}>
              {label}
            </Heading>
          </View>
          {content ? (
            content
          ) : (
            <Icon
              as={ChevronRight}
              size="xl"
              className={clsx([
                forceColor ? forceColor : 'text-primary-400',
                pressed && 'text-white',
              ])}
            />
          )}
        </View>
      )}
    </Pressable>
  );
};
