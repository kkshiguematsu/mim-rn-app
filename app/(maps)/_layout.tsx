import { MapBottomSheetRenderer } from '@/components/layout/bottomSheet/BottomSheetMapRender';
import { BottomSheet } from '@/components/ui/bottomsheet';
import { Stack } from 'expo-router';

export default function MapLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="map" />
      </Stack>
      <BottomSheet>
        <MapBottomSheetRenderer />
      </BottomSheet>
    </>
  );
}
