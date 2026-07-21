import { MapActions } from '@/components/layout/map/MapActions';
import { Page } from '@/components/layout/page';
import { useGoogleRouteDirections } from '@/hooks/api/map/useGoogleRouteDirections';
import { useMapCoordinates } from '@/hooks/maps/useMapCoordinates';
import { useMapEdgePadding } from '@/hooks/maps/useMapEdgePadding';
import { useMapFit } from '@/hooks/maps/useMapFit';
import { useMapBottomSheetStore } from '@/hooks/store/useMapBottomSheetStore';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapPage() {
  const mapRef = useRef<MapView | null>(null);

  const { mapActiveModal, activeRouting, setMapRef } = useMapBottomSheetStore();
  const { origin, destination, initialRegion, selectedCharger } = useMapCoordinates();
  const { data: route } = useGoogleRouteDirections(origin, destination);

  const edgePadding = useMapEdgePadding(mapActiveModal);

  useMapFit(mapRef, origin, destination, edgePadding, activeRouting);

  useEffect(() => {
    setMapRef(mapRef.current);
  }, [mapRef.current, setMapRef]);

  useEffect(() => {
    if (origin && mapRef.current && !activeRouting) {
      mapRef.current.animateToRegion(
        {
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  }, [origin]);

  return (
    <Page needsSafeArea={false} needsPadding={false} needsBottomTabBar={false}>
      <MapView
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
        }}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsTraffic
        showsUserLocation
        showsMyLocationButton={false}
      >
        {destination && (
          <Marker
            coordinate={destination}
            title={selectedCharger?.name}
            description={`${selectedCharger?.address?.street}, ${selectedCharger?.address?.number}`}
          />
        )}

        {route && route.coordinates.length > 0 && (
          <Polyline
            coordinates={route.coordinates}
            strokeWidth={4}
            strokeColor="#4285F4"
            lineCap="round"
            lineJoin="round"
          />
        )}
      </MapView>

      <MapActions route={route} destination={destination} />
    </Page>
  );
}
