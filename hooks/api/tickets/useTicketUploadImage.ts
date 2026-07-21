import { api } from '@/service/api';
import { useMutation } from '@tanstack/react-query';

export interface UploadTicketImageResponse {
  url: string;
}

type UploadTicketImageParams = {
  uri: string;
  name: string;
  type: 'image' | 'video' | 'livePhoto' | 'pairedVideo' | null | undefined;
};

const uploadTicketImageApi = async ({
  uri,
  name,
  type,
}: UploadTicketImageParams): Promise<UploadTicketImageResponse> => {
  const formData = new FormData();

  formData.append('file', {
    uri,
    name,
    type,
  } as any);

  const response = await api.post<UploadTicketImageResponse>('/tickets/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useUploadTicketImage = () => {
  return useMutation({
    mutationFn: uploadTicketImageApi,
  });
};
