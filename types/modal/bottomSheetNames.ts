import { ForgetPasswordBottomSheet } from '@/components/shared/bottomSheets/ForgetPasswordBottomSheet';
import { PaymentCardAddBottomSheet } from '@/components/shared/bottomSheets/payment/PaymentCardAddBottomSheet';
import { PaymentCardViewBottomSheet } from '@/components/shared/bottomSheets/payment/PaymentCardViewBottomSheet';

export enum BottomSheetNames {
  PaymenentCardAddBottomSheet,
  PaymentCardViewBottomSheet,
  ForgetPasswordBottomSheet,
}

export const BOTTOMSHEET_COMPONENTS = {
  [BottomSheetNames.PaymenentCardAddBottomSheet]: PaymentCardAddBottomSheet,
  [BottomSheetNames.PaymentCardViewBottomSheet]: PaymentCardViewBottomSheet,
  [BottomSheetNames.ForgetPasswordBottomSheet]: ForgetPasswordBottomSheet,
};
