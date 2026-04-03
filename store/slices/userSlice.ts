import { storage } from '@/service/storage';
import { StateCreator } from 'zustand';

export interface UserSlice {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  bootstrap: () => Promise<void>;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (token) => {
    await storage.setToken(token);

    set({
      token,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await storage.removeToken();

    set({
      token: null,
      isAuthenticated: false,
    });
  },

  bootstrap: async () => {
    try {
      const token = await storage.getToken();

      if (token) {
        set({
          token,
          isAuthenticated: true,
        });
      } else {
        set({
          token: null,
          isAuthenticated: false,
        });
      }
    } catch {
      set({
        token: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },
});
