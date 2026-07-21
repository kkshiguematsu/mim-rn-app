import { useRefreshToken } from '@/hooks/api/auth/useRefreshToken';
import { useUserStore } from '@/hooks/store/useUserStore';
import { authService } from '@/service/auth';
import { storage } from '@/service/storage';
import { useEffect, useState } from 'react';
import { useGetProfile } from '../user/useGetProfile';

export const useBootstrapAuth = () => {
  const [isReady, setIsReady] = useState(false);

  const { setToken, setUserProfile, bootstrap, logout } = useUserStore();
  const { mutateAsync: refreshTokenMutate } = useRefreshToken();
  const { refetch: fetchProfile } = useGetProfile({ enabled: false });

  useEffect(() => {
    const initApp = async () => {
      try {
        const { accessToken, refreshToken } = await bootstrap();
        if (!accessToken) return;

        if (authService.isTokenExpired(accessToken)) {
          if (!refreshToken) return;
          const { access_token, refresh_token } = await refreshTokenMutate(refreshToken);
          setToken(access_token, refresh_token);
          await storage.setToken(access_token, refresh_token);
          return;
        }

        const { data } = await fetchProfile();

        if (!data) {
          await logout();
          return;
        }

        setUserProfile(data);
      } catch (error) {
        await logout();
        console.error('Failed to fetch user profile:', error);
      } finally {
        setIsReady(true);
      }
    };

    initApp();
  }, []);

  return { isReady };
};
