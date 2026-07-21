import ChargingMonitorScreen from '@/components/screen/charging/ChargingMonitorScreen';
import { InitiateScanScreen } from '@/components/screen/charging/InitiateScanScreen';
import { ChargingCompletedModal } from '@/components/shared/modals/ChargingCompletedModal';
import { QrCodeScannerModal } from '@/components/shared/modals/QrCodeScannerModal';
import { useChargingTransactionStore } from '@/hooks/store/useCharging';
import { useCameraPermission } from '@/hooks/utils/useCameraPermission';
import { useState } from 'react';

export default function ChargingPage() {
  const [isScannerVisible, setIsScannerVisible] = useState(false);

  const { ensurePermission } = useCameraPermission();
  const { isCharging } = useChargingTransactionStore();

  const handleStartScan = async () => {
    const granted = await ensurePermission();
    if (!granted) return;

    setIsScannerVisible(true);
  };

  return (
    <>
      {isCharging ? (
        <ChargingMonitorScreen />
      ) : (
        <InitiateScanScreen handleStartScan={handleStartScan} />
      )}

      <ChargingCompletedModal />

      <QrCodeScannerModal isVisible={isScannerVisible} onClose={() => setIsScannerVisible(false)} />
    </>
  );
}
