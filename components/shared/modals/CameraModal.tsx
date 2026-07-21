import { CameraView } from 'expo-camera';
import { Camera as CameraIcon, RotateCw, SendHorizonal, X } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Image, Modal, Pressable, View } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  addImage: (uri: string) => void;
};

export function CameraModal({ visible, onClose, addImage }: Props) {
  const cameraRef = useRef<CameraView>(null);

  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handleTakePhoto = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 1,
    });

    if (!photo?.uri) return;

    setPhotoUri(photo.uri);
  };

  const handleFlipCamera = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const handleRetake = () => {
    setPhotoUri(null);
  };

  const handleUsePhoto = async () => {
    if (!photoUri) return;

    addImage(photoUri);
    onClose();
    setPhotoUri(null);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-black">
        {!photoUri ? (
          <>
            <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} zoom={0.02} />

            <View className="absolute left-0 right-0 top-0 flex-row items-center justify-between px-6 pt-16">
              <Pressable onPress={onClose}>
                <X size={30} color="#fff" />
              </Pressable>

              <Pressable onPress={handleFlipCamera}>
                <RotateCw size={28} color="#fff" />
              </Pressable>
            </View>

            <View className="absolute bottom-16 left-0 right-0 items-center">
              <Pressable
                onPress={handleTakePhoto}
                className="h-16 w-16 items-center justify-center rounded-full border-4 border-white"
              >
                <CameraIcon size={30} color="#fff" />
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <Image source={{ uri: photoUri }} style={{ flex: 1 }} resizeMode="cover" />

            <View className="absolute left-0 right-0 top-0 flex-row items-center justify-between px-6 pt-16">
              <Pressable onPress={handleRetake}>
                <X size={30} color="#fff" />
              </Pressable>
            </View>

            <View className="absolute bottom-16 left-0 right-0 flex-row items-center justify-around px-6">
              <Pressable
                onPress={handleUsePhoto}
                className="h-16 w-16 items-center justify-center rounded-full bg-primary-600"
              >
                <SendHorizonal size={30} color="#fff" />
              </Pressable>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
}
