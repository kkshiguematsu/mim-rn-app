/**
 * Calcula energia consumida em kWh a partir dos valores do medidor
 */
export function calculateEnergyConsumed(
  meterStop: number | null | undefined,
  meterStart: number
): number {
  if (!meterStop) return 0;
  return (meterStop - meterStart) / 1000;
}

/**
 * Calcula percentual de bateria com base na capacidade do veículo
 */
export function calculateBatteryPercentage(meterValue: number, batteryCapacityKwh: number): number {
  return parseFloat((meterValue / batteryCapacityKwh).toFixed(0));
}

/**
 * Determina a cor do indicador de bateria
 */
export function getBatteryIndicatorColor(currentSoC: number | undefined): 'green' | 'blue' {
  return currentSoC === 100 ? 'green' : 'blue';
}

/**
 * Busca o conector específico de um carregador
 */
export function findConnector(
  connectors: Array<{ _id: string; maxPowerKw: number }>,
  connectorId: string
) {
  return connectors.find((c) => c._id === connectorId);
}

/**
 * Busca veículo do usuário pela placa
 */
export function findVehicleByPlate<T extends { licensePlate: string }>(
  vehicles: T[] | undefined,
  licensePlate: string | undefined
): T | undefined {
  return vehicles?.find((v) => v.licensePlate === licensePlate);
}

/**
 * Calcula a duração entre duas datas em milissegundos
 * Se endDate for undefined, usa a data atual (sessão ativa)
 */
export const calculateDuration = (startedAt: string, stoppedAt?: string | null): number => {
  const start = new Date(startedAt).getTime();
  const end = stoppedAt ? new Date(stoppedAt).getTime() : Date.now();
  return end - start; // ms
};
