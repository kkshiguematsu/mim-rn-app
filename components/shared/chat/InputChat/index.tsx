import { Text } from '@/components/ui/text';
import { useFadeInAnimation } from '@/hooks/animations/useFadeInAnimation';
import { usePostMessage } from '@/hooks/api/tickets/usePostMessage';
import { useUploadTicketImage } from '@/hooks/api/tickets/useTicketUploadImage';
import { useTicketStore } from '@/hooks/store/useTicketStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { useCameraPermission } from '@/hooks/utils/useCameraPermission';
import * as ImagePicker from 'expo-image-picker';
import { Camera, FileText, Image as ImageIcon, Plus, SendHorizonal, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Keyboard, Pressable, TextInput, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraModal } from '../../modals/CameraModal';

export const InputChat = () => {
  const [textValue, setTextValue] = useState('');
  const [showExtraOptions, setShowExtraOptions] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [focused, setFocused] = useState(false);

  const insets = useSafeAreaInsets();
  const fadeInAnimation = useFadeInAnimation({});
  const uploadImageMutation = useUploadTicketImage();

  const { ticket } = useTicketStore();
  const { showToast } = useToastMessage();
  const { mutate: postMessage } = usePostMessage();
  const { ensurePermission } = useCameraPermission();

  const handleOpenExtraOptions = () => {
    Keyboard.dismiss();
    setShowExtraOptions(!showExtraOptions);
  };

  const handleFocus = () => {
    setFocused(true);
    setShowExtraOptions(false);
  };

  const handleSelectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 1,
    });

    if (result.canceled) return;

    setImages(result.assets.map((asset) => asset.uri));
    setShowExtraOptions(false);
  };

  const handleRemoveImage = (uri: string) => {
    setImages((prev) => prev.filter((img) => img !== uri));
  };

  const handleTakePhoto = async () => {
    const granted = await ensurePermission();
    if (!granted) return;

    setShowCamera(true);
  };

  const handleSelectFile = () => {};

  const handleAddImage = (uri: string) => {
    setImages((prev) => [...prev, uri]);
  };

  const handleSendMessage = async () => {
    if (!textValue) return;

    let attachmentUrls: string[] = [];

    try {
      if (images && images.length > 0) {
        try {
          const uploadPromises = images.map(async (image) => {
            return uploadImageMutation.mutateAsync({
              uri: image,
              name: `image_${Date.now()}.jpg`,
              type: 'image',
            });
          });

          const uploadResults = await Promise.all(uploadPromises);
          attachmentUrls = uploadResults.map((result) => result.url);
        } catch (uploadError) {
          showToast({
            type: 'error',
            title: 'Erro ao fazer upload das imagens',
          });
          return;
        }
      }

      await postMessage({
        ticketId: ticket!._id,
        payload: {
          message: textValue,
          attachments: attachmentUrls,
          isInternal: false,
        },
      });

      setTextValue('');
      setImages([]);
    } catch {
      showToast({
        type: 'error',
        title: 'Erro ao enviar mensagem',
      });
    }
  };

  return (
    <View className="flex px-4 py-2" style={{ paddingBottom: focused ? 8 : insets.bottom + 8 }}>
      {images.length > 0 && (
        <Animated.View entering={FadeInUp.duration(200)} exiting={FadeOutDown.duration(200)}>
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row gap-2 py-2"
            contentContainerStyle={{ gap: 8 }}
          >
            {images.map((image) => (
              <View key={image} className="relative">
                <Image
                  source={{ uri: image }}
                  className="h-20 w-20 rounded-lg"
                  style={{ resizeMode: 'cover' }}
                />
                <Pressable
                  onPress={() => handleRemoveImage(image)}
                  className="absolute -right-2 -top-2 h-6 w-6 items-center justify-center rounded-full bg-red-500"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                >
                  <X size={14} color="#fff" />
                </Pressable>
              </View>
            ))}
          </Animated.ScrollView>
        </Animated.View>
      )}

      <View className="flex-row items-end gap-2">
        <View className="max-h-32 flex-1 flex-row items-center gap-2 rounded-2xl bg-neutral-100 px-4 py-3 dark:bg-neutral-800">
          <Pressable onPress={handleOpenExtraOptions}>
            {showExtraOptions ? (
              <X size={20} className="text-neutral-500 dark:text-neutral-400" />
            ) : (
              <Plus size={20} className="text-neutral-500 dark:text-neutral-400" />
            )}
          </Pressable>

          <TextInput
            value={textValue}
            onChangeText={setTextValue}
            onFocus={handleFocus}
            onBlur={() => setFocused(false)}
            placeholder="Digite uma mensagem..."
            placeholderTextColor="#9CA3AF"
            multiline
            className="flex-1 text-black dark:text-white"
            style={{
              paddingVertical: 5,
              fontSize: 16,
            }}
          />

          <Pressable onPress={handleTakePhoto}>
            <Camera size={20} className="text-neutral-500 dark:text-neutral-400" />
          </Pressable>
        </View>

        {(textValue || images.length > 0) && (
          <Animated.View entering={fadeInAnimation.duration(200)}>
            <Pressable
              onPress={handleSendMessage}
              className="h-11 w-11 items-center justify-center rounded-full bg-primary-600"
            >
              <SendHorizonal size={20} color="#fff" />
            </Pressable>
          </Animated.View>
        )}
      </View>

      {showExtraOptions && (
        <Animated.View
          entering={FadeInDown.duration(200)}
          exiting={FadeOutDown.duration(200)}
          className="mt-3 flex-row gap-3"
        >
          <Pressable
            onPress={handleSelectPhoto}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800"
          >
            <ImageIcon size={24} className="text-primary-600" />
            <View>
              <Text className="font-medium text-black dark:text-white">Foto</Text>
              <Text className="text-xs text-neutral-500 dark:text-neutral-400">Enviar imagem</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={handleSelectFile}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800"
          >
            <FileText size={24} className="text-primary-600" />
            <View>
              <Text className="font-medium text-black dark:text-white">Arquivo</Text>
              <Text className="text-xs text-neutral-500 dark:text-neutral-400">
                Enviar documento
              </Text>
            </View>
          </Pressable>
        </Animated.View>
      )}

      <CameraModal
        visible={showCamera}
        onClose={() => setShowCamera(false)}
        addImage={handleAddImage}
      />
    </View>
  );
};
