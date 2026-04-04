import { PaymentCardAddBottomSheet } from '@/components/shared/bottomSheets/payment/PaymentCardAddBottomSheet';
import { PaymentCardViewBottomSheet } from '@/components/shared/bottomSheets/payment/PaymentCardViewBottomSheet';

export enum BottomSheetNames {
  PaymenentCardAddBottomSheet,
  PaymentCardViewBottomSheet,
}

export const BOTTOMSHEET_COMPONENTS = {
  [BottomSheetNames.PaymenentCardAddBottomSheet]: PaymentCardAddBottomSheet,
  [BottomSheetNames.PaymentCardViewBottomSheet]: PaymentCardViewBottomSheet,
};
