import { User } from '@/types/user/user.type';

import { storage } from '@/service/storage';
import { StateCreator } from 'zustand';
import { VehicleSlice } from './vehicleSlice';

export interface UserSlice {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setToken: (accessToken: string, refreshToken: string) => void;
  setUserProfile: (user: User) => void;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  bootstrap: () => Promise<{
    accessToken: string | null;
    refreshToken: string | null;
  }>;
}

export const createUserSlice: StateCreator<UserSlice & VehicleSlice, [], [], UserSlice> = (
  set
) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setToken: (accessToken: string, refreshToken: string) => {
    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  setUserProfile: (user: User) => {
    set({ user });

    // const activeVehicle = user.vehicles.find((v) => v.isActive);
    // if (activeVehicle) set({ activeVehicle });
  },

  login: async (accessToken: string, refreshToken: string) => {
    await storage.setToken(accessToken, refreshToken);
    set({ accessToken, refreshToken, isAuthenticated: true });
  },

  logout: async () => {
    await storage.removeToken();
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  bootstrap: async () => {
    const { accessToken, refreshToken } = await storage.getTokens();

    if (accessToken !== null && refreshToken !== null) {
      set({ accessToken, refreshToken, isAuthenticated: true, isLoading: false });
      return { accessToken, refreshToken };
    }

    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    });

    return {
      accessToken: null,
      refreshToken: null,
    };
  },
});
