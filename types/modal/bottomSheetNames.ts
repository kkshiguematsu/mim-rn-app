import { ForgetPasswordBottomSheet } from '@/components/shared/bottomSheets/auth/ForgetPasswordBottomSheet';
import { ResetPasswordBottomSheet } from '@/components/shared/bottomSheets/auth/ResetPasswordBottomSheet';
import { PaymentCardAddBottomSheet } from '@/components/shared/bottomSheets/payment/PaymentCardAddBottomSheet';
import { PaymentCardViewBottomSheet } from '@/components/shared/bottomSheets/payment/PaymentCardViewBottomSheet';

export enum BottomSheetNames {
  PaymenentCardAddBottomSheet,
  PaymentCardViewBottomSheet,
  ForgetPasswordBottomSheet,
  ResetPasswordBottomSheet,
}

export const BOTTOMSHEET_COMPONENTS = {
  [BottomSheetNames.PaymenentCardAddBottomSheet]: PaymentCardAddBottomSheet,
  [BottomSheetNames.PaymentCardViewBottomSheet]: PaymentCardViewBottomSheet,
  [BottomSheetNames.ForgetPasswordBottomSheet]: ForgetPasswordBottomSheet,
  [BottomSheetNames.ResetPasswordBottomSheet]: ResetPasswordBottomSheet,
};
