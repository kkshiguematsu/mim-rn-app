import { ModalNames } from '@/types/modal/modalsComponents';
import React, { createContext, useContext, useMemo, useState } from 'react';

interface ModalContextType {
  activeModal: ModalNames | null;
  enableModal: (name: ModalNames) => void;
  disableModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalNames | null>(null);

  const enableModal = (name: ModalNames) => {
    setActiveModal(name);
  };

  const disableModal = () => {
    setActiveModal(null);
  };

  const contextValue = useMemo(
    () => ({
      activeModal,
      enableModal,
      disableModal,
    }),
    [activeModal]
  );

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) throw new Error('useModals without context');

  return context;
};
