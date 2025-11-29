import {
  BottomSheetBackdrop,
  BottomSheetContent,
  BottomSheetDragIndicator,
  BottomSheetPortal,
} from '@/components/ui/bottomsheet';
import { useModal } from '@/context/modalContext';
import { ModalNames } from '@/types/modal/modalsComponents';

import { PaymentCardAddModal } from '../PaymentCardAddModal';

const MODAL_COMPONENTS = {
  [ModalNames.PaymenentModal]: PaymentCardAddModal,
};

export const ModalRenderer = () => {
  const { activeModal } = useModal();

  const ModalComponent =
    activeModal !== null ? (MODAL_COMPONENTS[activeModal] as React.ElementType) : null;

  return (
    <BottomSheetPortal
      snapPoints={['25%', '50%']}
      backdropComponent={BottomSheetBackdrop}
      handleComponent={BottomSheetDragIndicator}
    >
      <BottomSheetContent>{ModalComponent && <ModalComponent />}</BottomSheetContent>
    </BottomSheetPortal>
  );
};
