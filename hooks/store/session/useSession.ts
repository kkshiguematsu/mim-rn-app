import { useAppStore } from '@/store';

export const useSelectedSession = () => useAppStore((s) => s.selectedSession);

export const useSetSelectedSession = () => useAppStore((s) => s.setSelectedSession);

export const useClearSelectedSession = () => useAppStore((s) => s.clearSelectedSession);
