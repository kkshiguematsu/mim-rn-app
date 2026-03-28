import { VEHICLE_COLORS } from '@/types/vehicle/vehicle.type';
import { useFormContext } from 'react-hook-form';
import { Pressable, ScrollView } from 'react-native';

export const RenderColorSelector = () => {
  const { watch, setValue } = useFormContext();

  const color = watch('color');

  return (
    <ScrollView horizontal contentContainerClassName="flex-row flex-wrap gap-3" className="flex-1">
      {VEHICLE_COLORS.map((c) => {
        const selected = color === c.id;
        const isWhite = c.id === 'white';

        return (
          <Pressable
            key={c.id}
            onPress={() => setValue('color', c.id)}
            className="h-7 w-7 rounded-full"
            style={{
              backgroundColor: c.hex,
              borderWidth: selected ? 2 : isWhite ? 1.5 : 0,
              borderColor: selected ? '#1a7a4a' : '#e8e8e6',
              shadowColor: selected ? '#1a7a4a' : 'transparent',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: selected ? 0.35 : 0,
              shadowRadius: selected ? 4 : 0,
            }}
          />
        );
      })}
    </ScrollView>
  );
};
