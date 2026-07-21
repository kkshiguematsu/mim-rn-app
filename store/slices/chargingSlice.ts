import { Transaction } from '@/types/transaction/transaction.type';
import { StateCreator } from 'zustand';

export interface ChargingTransaction extends Transaction {
  elapsedTime: number;
  energyAdded: number;
  chargeProgress: number;
  batteryLevel: number;
  estimatedTimeRemaining: number;
}

export interface ChargingSlice {
  activeTransaction: ChargingTransaction | null;
  isCharging: boolean;
  lastUpdateTime: number | null;
  lastActiveTransaction: ChargingTransaction | null;

  startCharging: (sessionData: Transaction) => void;
  updateChargingData: (updates: Partial<Transaction>) => void;
  stopCharging: () => void;
  clearSession: () => void;
}

export const createChargingSlice: StateCreator<ChargingSlice, [], [], ChargingSlice> = (
  set,
  get
) => ({
  activeTransaction: null,
  lastActiveTransaction: null,
  isCharging: false,
  lastUpdateTime: null,

  startCharging: (sessionData) => {
    const session: ChargingTransaction = {
      ...sessionData,
      elapsedTime: 0,
      energyAdded: 0,
      chargeProgress: 0,
      batteryLevel: sessionData.currentSoC || 0,
      estimatedTimeRemaining: 0,
    };

    set({
      activeTransaction: session,
      isCharging: true,
      lastUpdateTime: Date.now(),
    });
  },

  updateChargingData: (updates) =>
    set((state) => {
      if (!state.activeTransaction) return state;

      const updatedSession = { ...state.activeTransaction, ...updates } as ChargingTransaction;

      const energyAdded =
        ((updatedSession.meterStop || 0) - (updatedSession.meterStart || 0)) / 1000; // Converter de Wh para kWh

      const chargeProgress = updatedSession.limitKwh
        ? Math.min((energyAdded / updatedSession.limitKwh) * 100, 100)
        : 0;

      // const rawBatteryLevel = updatedSession.currentSoC ?? chargeProgress;
      const rawBatteryLevel = updatedSession.currentSoC ?? 0;
      const batteryLevel = Math.max(0, Math.min(100, rawBatteryLevel));

      const elapsedTime = updatedSession.startedAt
        ? Math.floor((Date.now() - new Date(updatedSession.startedAt).getTime()) / 1000)
        : 0;

      const estimatedTimeRemaining =
        energyAdded > 0 && elapsedTime > 0
          ? Math.ceil(((updatedSession.limitKwh || 0) - energyAdded) * (elapsedTime / energyAdded))
          : 0;

      return {
        activeTransaction: {
          ...updatedSession,
          energyAdded,
          chargeProgress,
          batteryLevel,
          elapsedTime,
          estimatedTimeRemaining,
        },
        lastUpdateTime: Date.now(),
      };
    }),

  stopCharging: () => {
    const lastActiveTransaction = get().activeTransaction;

    set({
      activeTransaction: null,
      isCharging: false, // handle to change which charging page is shown
      lastUpdateTime: null,
      lastActiveTransaction: lastActiveTransaction,
    });
  },

  clearSession: () =>
    set({
      activeTransaction: null,
      isCharging: false,
      lastUpdateTime: null,
      lastActiveTransaction: null,
    }),
});
