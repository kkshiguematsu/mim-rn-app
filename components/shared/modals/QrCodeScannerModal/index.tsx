// components/modals/QrCodeScannerModal.tsx
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CameraView } from 'expo-camera';
import { ScanLine, X } from 'lucide-react-native';
import { useRef } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

interface QrCodeScannerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onQrCodeScanned: (data: string) => void;
  title?: string;
  description?: string;
}

export const QrCodeScannerModal = ({
  isVisible,
  onClose,
  onQrCodeScanned,
  title = 'Aponte para o QR Code',
  description = 'Posicione o QR Code do carregador dentro do quadrado',
}: QrCodeScannerModalProps) => {
  const isProcessing = useRef(false);

  const handleBarCodeScanned = ({ data }: { type: string; data: string }) => {
    if (isProcessing.current) return;

    isProcessing.current = true;
    onQrCodeScanned(data);

    setTimeout(() => {
      isProcessing.current = false;
    }, 1000);
  };

  const handleClose = () => {
    isProcessing.current = false;
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
    >
      <View style={StyleSheet.absoluteFillObject} className="bg-black">
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />

        <View style={StyleSheet.absoluteFillObject} className="bg-black/40">
          <View className="absolute left-0 right-0 top-0 z-10 px-4 pt-12">
            <View className="flex-row items-center justify-end">
              <Pressable onPress={handleClose} className="rounded-full bg-black/60 p-2">
                <Icon as={X} className="h-6 w-6 text-white" />
              </Pressable>
            </View>
          </View>

          <View className="flex-1 items-center justify-center">
            <View className="relative h-64 w-64">
              <View className="h-full w-full rounded-2xl border-2 border-white">
                <View className="absolute inset-0 items-center justify-center">
                  <Icon as={ScanLine} className="h-12 w-12 text-white opacity-70" />
                </View>
              </View>
            </View>

            <View className="mt-8 px-8">
              <Text className="text-center text-lg font-semibold text-white">{title}</Text>
              <Text className="mt-2 text-center text-sm text-white/80">{description}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
