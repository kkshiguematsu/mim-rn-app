import { Icon } from '@/components/ui/icon';
import clsx from 'clsx';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, PressableProps, View } from 'react-native';

interface Props extends PressableProps {
  className?: string;
  containerStyle?: string;
  onCallback?: () => void;
}

export const HeaderBackButtonIcon = ({
  className,
  containerStyle,
  onCallback,
  ...pressableProps
}: Props) => {
  const router = useRouter();

  return (
    <View>
      <Pressable
        onPress={() => {
          router.back();
          if (onCallback) {
            onCallback();
          }
        }}
        {...pressableProps}
        className={clsx('h-5 w-5 items-center justify-center p-5', containerStyle)}
      >
        <Icon as={ChevronLeft} size="2xl" className={className ?? 'text-black'} />
      </Pressable>
    </View>
  );
};
