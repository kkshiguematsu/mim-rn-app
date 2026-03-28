import { Text } from '@/components/ui/text';
import { CONNECTOR_OPTIONS } from '@/types/vehicle/vehicle.type';
import { useFormContext } from 'react-hook-form';
import { Pressable, View } from 'react-native';

export const RenderConnectionsComponent = () => {
  const { watch, setValue } = useFormContext();

  const connector = watch('connector');

  return (
    <View className="flex-row gap-2">
      {CONNECTOR_OPTIONS.map((type) => {
        const selected = connector === type;

        return (
          <Pressable
            key={type}
            onPress={() => setValue('connector', type)}
            className="flex-1 items-center rounded-xl border py-2.5"
            style={{
              backgroundColor: selected ? '#f0faf4' : '#ffffff',
              borderColor: selected ? '#b8e8cc' : '#e8e8e6',
              borderWidth: selected ? 1.5 : 1,
            }}
          >
            <Text
              className="text-[10.5px] font-semibold"
              style={{ color: selected ? '#1a7a4a' : '#6b6b68' }}
            >
              {type}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
