import { DefaultCard } from '@/components/shared/cards/DefaultCard';
import { DynamicInputProps } from '@/components/shared/form/DynamicInput/renderInput/types';
import { RenderForm } from '@/components/shared/form/RenderForm';
import { TintedIcon } from '@/components/shared/icon/TintedIcon';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useCreateTicket } from '@/hooks/api/tickets/useCreateTicket';
import { useUploadTicketImage } from '@/hooks/api/tickets/useTicketUploadImage';
import { useUserStore } from '@/hooks/store/useUserStore';
import { useToastMessage } from '@/hooks/toast/useToastMessage';
import { InputTypes } from '@/types/form/dynamicInput/dynamicInput.type';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { ImageIcon, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';

export interface TicketFormData {
  tenantId: string;
  subject: string;
  // priority?: TicketPriority;
  description: string;
  attachments?: any[];
}

export const TICKET_FORM_CONFIG: DynamicInputProps[] = [
  {
    type: InputTypes.TEXT,
    name: 'subject',
    label: 'Assunto',
    placeholder: 'Problema no Carregador',
    rules: {
      required: 'Assunto é obrigatório',
    },
  },
  // {
  //   type: InputTypes.SELECT,
  //   name: 'priority',
  //   label: 'Prioridade',
  //   selectItems: [
  //     { label: 'Baixa (Dúvidas gerais)', value: 'LOW' },
  //     { label: 'Média (Falhas que impedem recarga)', value: 'MEDIUM' },
  //     { label: 'Alta (Equipamento inoperante)', value: 'HIGH' },
  //     { label: 'Urgente (Risco de segurança)', value: 'URGENT' },
  //   ],
  // },
  {
    type: InputTypes.TEXTAREA,
    name: 'description',
    label: 'Descrição',
    placeholder: 'Descreva o que está acontecendo...',
    rules: {
      required: 'Descrição é obrigatória',
    },
  },
];

export const TicketForm = () => {
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { user } = useUserStore();
  const { showToast } = useToastMessage();
  const uploadImageMutation = useUploadTicketImage();
  const createTicketMutation = useCreateTicket();

  const methods = useForm<TicketFormData>({
    defaultValues: {
      tenantId: user?.tenantId._id,
      subject: '',
      // priority: 'MEDIUM',
      description: '',
      attachments: [],
    },
    mode: 'onSubmit',
  });

  const { handleSubmit, reset } = methods;

  const handleFormSubmit = async (data: TicketFormData) => {
    try {
      setIsSubmitting(true);

      let attachmentUrls: string[] = [];

      if (images && images.length > 0) {
        try {
          const uploadPromises = images.map(async (image) => {
            const fileName = image.fileName ?? `image_${Date.now()}.jpg`;
            const fileType = image.type ?? 'image';

            return uploadImageMutation.mutateAsync({
              uri: image.uri,
              name: fileName,
              type: fileType,
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

      await createTicketMutation.mutateAsync({
        ...data,
        attachments: attachmentUrls,
      });

      methods.reset();
      setImages(null);
      router.back();
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    router.back();
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 1,
    });

    if (result.canceled) return;

    setImages(result.assets);
  };

  const removeImage = (uri: string) => {
    setImages((prev) => {
      if (!prev || prev.length === 0) return null;

      const filteredImages = prev.filter((image) => image.uri !== uri);

      return filteredImages;
    });
  };

  return (
    <View className="px-7 pt-4">
      <Heading size="md">Detalhes da Solicitação</Heading>
      <Text size="sm" className="text-typography-600">
        Preencha os dados com o máximo de detalhes possível
      </Text>

      <View className="mt-4">
        <FormProvider {...methods}>
          <RenderForm inputList={TICKET_FORM_CONFIG} />

          <View className="mt-2">
            <Text className="mb-1 font-medium">Arquivos</Text>

            <Button size="sm" onPress={handlePickImage} variant="outline" className="w-52">
              <ButtonText>Escolher arquivo</ButtonText>
            </Button>

            {!!images && (
              <View className="mt-2 gap-2">
                {images.map((image) => (
                  <DefaultCard
                    key={image.uri}
                    className="flex flex-row items-center gap-2"
                    padding="sm"
                  >
                    <TintedIcon icon={ImageIcon} color="blue" />

                    <Text className="flex-1" numberOfLines={1}>
                      {image.fileName}
                    </Text>

                    <Pressable onPress={() => removeImage(image.uri)}>
                      <Icon as={X} className="mx-1" />
                    </Pressable>
                  </DefaultCard>
                ))}
              </View>
            )}
          </View>

          <View className="mt-6 flex gap-3">
            <Button
              size="lg"
              className="h-14 rounded-2xl"
              onPress={handleSubmit(handleFormSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting && <ButtonSpinner color="white" />}
              <ButtonText>Abrir Chamado</ButtonText>
            </Button>

            <Button size="lg" variant="link" className="h-14 rounded-2xl" onPress={handleCancel}>
              <ButtonText className="text-typography-600">Cancelar</ButtonText>
            </Button>
          </View>
        </FormProvider>
      </View>
    </View>
  );
};
