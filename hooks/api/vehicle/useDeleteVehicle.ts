import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

interface DeleteVehicleData {
  vehicleId: string;
  targetUserId: string;
}

const deleteVehicle = async (data: DeleteVehicleData) => {
  const response = await api.delete(`/vehicles/my/${data.vehicleId}`);
  return response.data;
};
export const useDeleteVehicle = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { showToast } = useToastMessage();

  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });

      showToast({
        title: 'Veículo excluído',
        description: 'O veículo foi excluído com sucesso',
        type: 'success',
      });

      router.back();
    },
    onError: (error: any) => {
      showToast({
        title: 'Erro ao excluir veículo',
        description: error?.response?.data?.message || 'Tente novamente mais tarde',
        type: 'error',
      });
    },
  });
};
