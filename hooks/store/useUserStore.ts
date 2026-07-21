import { useAppStore } from '@/store';
import { useShallow } from 'zustand/shallow';

export const useUserStore = () => {
  return useAppStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
      user: state.user,
      setUserProfile: state.setUserProfile,
      setToken: state.setToken,
      login: state.login,
      logout: state.logout,
      bootstrap: state.bootstrap,
    }))
  );
};
