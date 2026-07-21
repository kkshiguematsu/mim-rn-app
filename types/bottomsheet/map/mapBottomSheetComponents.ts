import { MapStationDetailsSheet } from '@/components/shared/bottomSheets/map/MapStationDetailsSheet';
import { MapStationRoutingSheet } from '@/components/shared/bottomSheets/map/MapStationRoutingSheet';
import { MapStationSearchSheet } from '@/components/shared/bottomSheets/map/MapStationSearchSheet';
import { MapBottomSheetNames } from './mapBottomSheetNames';

export const MAP_BOTTOMSHEET_COMPONENTS = {
  [MapBottomSheetNames.MapStationSearch]: MapStationSearchSheet,
  [MapBottomSheetNames.MapStationDetails]: MapStationDetailsSheet,
  [MapBottomSheetNames.MapStationRouting]: MapStationRoutingSheet,
};
