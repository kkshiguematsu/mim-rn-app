import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const PUSH_TOKEN_KEY = 'push_token';

const SECURE_OPTIONS: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
};

export const storage = {
  setToken: async (access_token: string, refresh_token: string) => {
    try {
      const available = await SecureStore.isAvailableAsync();
      if (!available) {
        console.warn('SecureStore not available - tokens will not be persisted securely.');
        return;
      }

      await Promise.all([
        SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access_token, SECURE_OPTIONS),
        SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh_token, SECURE_OPTIONS),
      ]);
    } catch (error) {
      console.error('storage.setToken error', error);
      throw error;
    }
  },

  getTokens: async () => {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        SecureStore.getItemAsync(ACCESS_TOKEN_KEY, SECURE_OPTIONS),
        SecureStore.getItemAsync(REFRESH_TOKEN_KEY, SECURE_OPTIONS),
      ]);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error('storage.getTokens error', error);
      return { accessToken: null, refreshToken: null };
    }
  },

  removeToken: async () => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY, SECURE_OPTIONS),
        SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY, SECURE_OPTIONS),
      ]);
    } catch (error) {
      console.error('storage.removeToken error', error);
    }
  },

  setPushNotificationToken: async (token: string) => {
    try {
      await SecureStore.setItemAsync(PUSH_TOKEN_KEY, token, SECURE_OPTIONS);
    } catch (error) {
      console.error('storage.setPushNotificationToken error', error);
    }
  },

  getPushNotificationToken: async () => {
    try {
      return await SecureStore.getItemAsync(PUSH_TOKEN_KEY, SECURE_OPTIONS);
    } catch (error) {
      console.error('storage.getPushNotificationToken error', error);
      return null;
    }
  },

  removePushNotificationToken: async () => {
    try {
      await SecureStore.deleteItemAsync(PUSH_TOKEN_KEY, SECURE_OPTIONS);
    } catch (error) {
      console.error('storage.removePushNotificationToken error', error);
    }
  },
};
