import { ForgetPasswordBottomSheet } from '@/components/shared/bottomSheets/auth/ForgetPasswordBottomSheet';
import { ResetPasswordBottomSheet } from '@/components/shared/bottomSheets/auth/ResetPasswordBottomSheet';
import { PaymentCardAddBottomSheet } from '@/components/shared/bottomSheets/payment/PaymentCardAddBottomSheet';
import { PaymentCardDeleteBottomSheet } from '@/components/shared/bottomSheets/payment/PaymentCardDeleteBottomSheet';
import { PaymentCardSetDefaultBottomSheet } from '@/components/shared/bottomSheets/payment/PaymentCardSetDefaultBottomSheet';
import { TransactionPaymentMethodBottomSheet } from '@/components/shared/bottomSheets/transaction/TransactionPaymentMethodBottomSheet';
import { DeleteVehicleBottomSheet } from '@/components/shared/bottomSheets/vehicle/DeleteVehicleBottomSheet';
import { ShareVehicleBottomSheet } from '@/components/shared/bottomSheets/vehicle/ShareVehicleBottomSheet';

export enum BottomSheetNames {
  PaymenentCardAddBottomSheet,
  PaymentCardDeleteBottomSheet,
  PaymentCardSetDefaultBottomSheet,

  TransactionPaymentMethodBottomSheet,

  ForgetPasswordBottomSheet,
  ResetPasswordBottomSheet,

  DeleteVehicleBottomSheet,
  ShareVehicleBottomSheet,
}

const DYNAMIC_CONFIG = { snapPoints: [], dynamic: true };

export const BOTTOMSHEET_CONFIG = {
  [BottomSheetNames.TransactionPaymentMethodBottomSheet]: {
    snapPoints: ['75%'],
    dynamic: false,
  },
  [BottomSheetNames.PaymenentCardAddBottomSheet]: DYNAMIC_CONFIG,
  [BottomSheetNames.PaymentCardDeleteBottomSheet]: DYNAMIC_CONFIG,
  [BottomSheetNames.PaymentCardSetDefaultBottomSheet]: DYNAMIC_CONFIG,
  [BottomSheetNames.ForgetPasswordBottomSheet]: DYNAMIC_CONFIG,
  [BottomSheetNames.ResetPasswordBottomSheet]: DYNAMIC_CONFIG,
  [BottomSheetNames.DeleteVehicleBottomSheet]: DYNAMIC_CONFIG,
  [BottomSheetNames.ShareVehicleBottomSheet]: DYNAMIC_CONFIG,
};

export const BOTTOMSHEET_COMPONENTS = {
  [BottomSheetNames.PaymenentCardAddBottomSheet]: PaymentCardAddBottomSheet,
  [BottomSheetNames.PaymentCardDeleteBottomSheet]: PaymentCardDeleteBottomSheet,
  [BottomSheetNames.PaymentCardSetDefaultBottomSheet]: PaymentCardSetDefaultBottomSheet,

  [BottomSheetNames.TransactionPaymentMethodBottomSheet]: TransactionPaymentMethodBottomSheet,

  [BottomSheetNames.ForgetPasswordBottomSheet]: ForgetPasswordBottomSheet,
  [BottomSheetNames.ResetPasswordBottomSheet]: ResetPasswordBottomSheet,

  [BottomSheetNames.DeleteVehicleBottomSheet]: DeleteVehicleBottomSheet,
  [BottomSheetNames.ShareVehicleBottomSheet]: ShareVehicleBottomSheet,
};
