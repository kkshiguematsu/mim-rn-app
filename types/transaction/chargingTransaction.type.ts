export interface StartChargingTransactionPayload {
  tenantId: string;
  chargerId: string;
  userId: string;
  connectorId: number;
  vehicleId?: string;
  vehiclePlate?: string;
  limitKwh?: number;
  skipPayment: boolean;
}
