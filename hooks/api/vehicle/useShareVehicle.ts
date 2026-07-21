import { useBottomSheetStore } from '@/hooks/store/useBottomSheetStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { api } from '@/service/api';
import { ShareVehicleFormData } from '@/types/vehicle/vehicle-form.type';
import { useMutation } from '@tanstack/react-query';

interface ResponseType {
  _id: string;
  userId: string;
  vehicleId: string;
  isActive: true;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

const shareVehicle = async (data: ShareVehicleFormData): Promise<ResponseType> => {
  const response = await api.post<ResponseType>(`/vehicles/my/${data.vehicleId}/share`, {
    email: data.email,
  });
  return response.data;
};

export const useShareVehicle = () => {
  const { showToast } = useToastMessage();
  const { disableModal } = useBottomSheetStore();

  return useMutation({
    mutationFn: shareVehicle,
    onSuccess: () => {
      showToast({
        title: 'Sucesso',
        description: 'Veículo compartilhado',
        type: 'success',
      });

      disableModal();
    },
    onError: (error: Error) => {
      showToast({
        title: 'Erro ao compartilhar',
        description: error.message,
        type: 'error',
      });
    },
  });
};
