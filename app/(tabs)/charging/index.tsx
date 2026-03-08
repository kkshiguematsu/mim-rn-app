import { Page } from '@/components/layout/page';
import ChargingMonitorScreen from '@/components/screen/charging/ChargingMonitorScreen';
import { InitiateScanScreen } from '@/components/screen/charging/InitiateScanScreen';
import { QrCodeScannerModal } from '@/components/shared/modals/QrCodeScannerModal';
import { Text } from '@/components/ui/text';
import { useCharging } from '@/context/ChargingContext';
import { useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Alert } from 'react-native';

export default function ChargingPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const { activeSession, startCharging } = useCharging();

  const handleStartScan = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();

      if (!result.granted) {
        Alert.alert(
          'Permissão Necessária',
          'Precisamos acessar sua câmera para escanear o QR Code do carregador.',
          [{ text: 'OK' }]
        );
        return;
      }
    }

    setIsScannerVisible(true);
  };

  const handleQrCodeScanned = (data: string) => {
    setIsScannerVisible(false);

    Alert.alert(
      'Carregador Identificado',
      `Deseja iniciar o carregamento?\n\nID: ${data.substring(0, 20)}...`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Iniciar',
          onPress: () => {
            setScannedData(data);
            setIsScannerVisible(false);
            startCharging({
              id: 'session-123',
              stationName: 'Estação Central',
              chargerId: data,
              batteryLevel: 45,
              isCharging: true,
              currentPower: 7.4,
              time: {
                remaining: 1800,
                elapsed: 200,
              },
              energyAdded: 10,
              cost: 12.5,
              location: 'Shopping Iguatemi',
            });
          },
        },
      ]
    );
  };

  if (!permission) {
    return (
      <Page needsPadding needsSafeArea alignItems="center" justifyContent="center">
        <Text>Carregando...</Text>
      </Page>
    );
  }

  if (activeSession) return <ChargingMonitorScreen />;

  return (
    <>
      <InitiateScanScreen handleStartScan={handleStartScan} />

      <QrCodeScannerModal
        isVisible={isScannerVisible}
        onClose={() => setIsScannerVisible(false)}
        onQrCodeScanned={handleQrCodeScanned}
      />
    </>
  );
}
