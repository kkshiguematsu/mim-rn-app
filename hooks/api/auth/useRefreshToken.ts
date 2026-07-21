import { api } from '@/service/api';
import { useMutation } from '@tanstack/react-query';

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

const refreshTokenApi = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  const response = await api.post<RefreshTokenResponse>('/auth/refresh-token', refreshToken);
  return response.data;
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshTokenApi,
  });
};
