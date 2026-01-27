import { Icon } from '@/components/ui/icon';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export const HeaderBackButtonIcon = () => {
  const router = useRouter();

  return (
    <View className="w-9 items-center justify-center">
      <Pressable onPress={() => router.back()}>
        <Icon as={ChevronLeft} size="2xl" />
      </Pressable>
    </View>
  );
};
