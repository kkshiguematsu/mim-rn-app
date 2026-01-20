import React, { ReactNode, createContext, useContext, useState } from 'react';

interface ChargingSession {
  id: string;
  chargerId: string;
  isCharging: boolean;
  batteryLevel: number;
  currentPower: number;
  time: {
    remaining: number;
    elapsed: number;
  };
  energyAdded: number;
  cost: number;
  location: string;
}

interface ChargingContextType {
  activeSession: ChargingSession | null;
  startCharging: (session: ChargingSession) => void;
  stopCharging: () => void;
  updateSession: (updates: Partial<ChargingSession>) => void;
}

const ChargingContext = createContext<ChargingContextType | undefined>(undefined);

export const ChargingProvider = ({ children }: { children: ReactNode }) => {
  const [activeSession, setActiveSession] = useState<ChargingSession | null>(null);

  const startCharging = (session: ChargingSession) => {
    setActiveSession(session);
  };

  const stopCharging = () => {
    setActiveSession(null);
  };

  const updateSession = (updates: Partial<ChargingSession>) => {
    if (activeSession) {
      setActiveSession({ ...activeSession, ...updates });
    }
  };

  return (
    <ChargingContext.Provider value={{ activeSession, startCharging, stopCharging, updateSession }}>
      {children}
    </ChargingContext.Provider>
  );
};

export const useCharging = () => {
  const context = useContext(ChargingContext);
  if (!context) {
    throw new Error('useCharging must be used within ChargingProvider');
  }
  return context;
};
