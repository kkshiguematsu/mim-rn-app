import { useAppStore } from '@/store';
import { useShallow } from 'zustand/shallow';

export const useUserStore = () => {
  return useAppStore(
    useShallow((state) => ({
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
      login: state.login,
      logout: state.logout,
      bootstrap: state.bootstrap,
    }))
  );
};
