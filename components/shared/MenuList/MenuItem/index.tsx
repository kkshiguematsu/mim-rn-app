import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import clsx from 'clsx';
import { Href } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export type MenuItemProps = {
  label: string;
  name?: string;
  link?: Href;
  icon?: React.ElementType;
  content?: React.ReactNode;
  forceColor?: any;
  rightButton?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  action?: () => void;
};

export const MenuItem = ({
  label,
  name,
  link,
  icon,
  content,
  forceColor,
  disabled,
  className,
  rightButton,
  action,
}: MenuItemProps) => {
  return (
    <Pressable
      className={clsx(['overflow-hidden rounded-2xl bg-neutral-100 dark:bg-zinc-700', className])}
      onPress={action}
      disabled={disabled}
    >
      {({ pressed }) => (
        <View
          className={clsx([
            'flex flex-row items-center justify-between px-5 py-4',
            pressed ? 'bg-primary-500' : '',
          ])}
        >
          <View className="flex flex-row items-center gap-4">
            {icon && (
              <Icon
                as={icon}
                size="xl"
                className={clsx([forceColor ? forceColor : 'text-primary-400'])}
              />
            )}
            <Heading className={clsx([pressed ? 'text-white' : '', forceColor ? forceColor : ''])}>
              {label}
            </Heading>
          </View>
          {content ? (
            content
          ) : (
            <Icon
              as={ChevronRight}
              size="xl"
              className={clsx([forceColor ? forceColor : 'text-primary-400'])}
            />
          )}
        </View>
      )}
    </Pressable>
  );
};
