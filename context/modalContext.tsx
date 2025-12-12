import { BottomSheetContext } from '@/components/ui/bottomsheet';
import { ModalNames } from '@/types/modal/modalsComponents';
import React, { createContext, useContext, useMemo, useState } from 'react';

interface ModalContextType {
  activeModal: ModalNames | null;
  modalData: any;
  enableModal: (name: ModalNames, modalData?: any) => void;
  disableModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalNames | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  const { handleOpen: handleOpenBottomSheet } = useContext(BottomSheetContext);

  const enableModal = (name: ModalNames, modalData: any) => {
    handleOpenBottomSheet();
    setActiveModal(name);
    if (modalData) {
      setModalData(modalData);
    }
  };

  const disableModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  const contextValue = useMemo(
    () => ({
      activeModal,
      modalData,
      enableModal,
      disableModal,
    }),
    [activeModal, modalData]
  );

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) throw new Error('useModals without context');

  return context;
};
