import { useCameraPermissions } from 'expo-camera';
import { Alert, Linking } from 'react-native';

export const useCameraPermission = () => {
  const [permission, requestPermission] = useCameraPermissions();

  const ensurePermission = async (): Promise<boolean> => {
    if (permission?.granted) return true;

    if (!permission || permission.canAskAgain) {
      const result = await requestPermission();
      return result.granted;
    }

    Alert.alert(
      'Permissão de Câmera',
      'Você precisa habilitar a câmera nas configurações do dispositivo.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Abrir Configurações', onPress: () => Linking.openSettings() },
      ]
    );

    return false;
  };

  return { permission, ensurePermission };
};
