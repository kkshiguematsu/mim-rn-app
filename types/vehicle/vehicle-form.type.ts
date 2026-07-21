export interface CreateVehicleFormData {
  catalogId: string;
  licensePlate: string;
}

export const INITIAL_FORM_DATA: CreateVehicleFormData = {
  catalogId: '',
  licensePlate: '',
};

export interface ShareVehicleFormData {
  vehicleId: string;
  email: string;
}
export const INITIAL_SHARE_FORM_DATA: ShareVehicleFormData = {
  vehicleId: '',
  email: '',
};
