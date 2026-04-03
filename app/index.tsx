import { useUserStore } from '@/hooks/store/useUserStore';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const { bootstrap, isLoading, isAuthenticated } = useUserStore();

  useEffect(() => {
    bootstrap();
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
