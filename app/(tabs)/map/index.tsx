import React from 'react';

import { Page } from '@/components/shared/page';
import { View } from 'react-native';
// import { PROVIDER_GOOGLE } from 'react-native-maps';
export default function MapPage() {
  // const mapProvider = Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined;

  return (
    <Page needsSafeArea={false} needsPadding={false}>
      <View className="flex-1">
        {/* <MapView
          className="h-full w-full"
          provider={mapProvider}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        /> */}
      </View>
    </Page>
  );
}
