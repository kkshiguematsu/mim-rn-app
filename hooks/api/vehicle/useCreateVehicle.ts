import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { CreateVehicleFormData } from '@/types/vehicle/vehicle-form.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

const createVehicle = async (data: CreateVehicleFormData): Promise<ResponseType> => {
  const response = await api.post<ResponseType>('/vehicles/my', data);
  return response.data;
};

export const useCreateVehicle = () => {
  const { back } = useRouter();
  const queryClient = useQueryClient();

  const { showToast } = useToastMessage();

  return useMutation({
    mutationFn: async (data: CreateVehicleFormData) => {
      const response = await createVehicle(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      showToast({
        title: 'Sucesso',
        description: 'Veículo cadastrado',
        type: 'success',
      });

      back();
    },
    onError: (error: Error) => {
      showToast({
        title: 'Erro ao cadastrar',
        description: error.message,
        type: 'error',
      });
    },
  });
};
