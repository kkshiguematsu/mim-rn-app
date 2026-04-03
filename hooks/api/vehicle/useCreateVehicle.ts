import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { VehicleFormData } from '@/types/vehicle/vehicle.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createVehicle = async (data: VehicleFormData): Promise<ResponseType> => {
  const response = await api.post<ResponseType>('/vehicles', data);
  return response.data;
};

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToastMessage();

  return useMutation({
    mutationFn: async (data: VehicleFormData) => {
      const response = await createVehicle(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      showToast({
        title: 'Sucesso',
        description: 'Veículo cadastrado',
        action: 'success',
      });
    },
    onError: (error: Error) => {
      showToast({
        title: 'Erro ao cadastrar',
        description: error.message,
        action: 'error',
      });
    },
  });
};
