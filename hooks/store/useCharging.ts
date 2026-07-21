import { useAppStore } from '@/store';
import { useShallow } from 'zustand/shallow';

export const useChargingTransactionStore = () =>
  useAppStore(
    useShallow((state) => ({
      activeTransaction: state.activeTransaction,
      lastActiveTransaction: state.lastActiveTransaction,
      isCharging: state.isCharging,
      lastUpdateTime: state.lastUpdateTime,
      startCharging: state.startCharging,
      updateChargingData: state.updateChargingData,
      stopCharging: state.stopCharging,
      clearSession: state.clearSession,
    }))
  );
