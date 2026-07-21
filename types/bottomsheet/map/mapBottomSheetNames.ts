export enum MapBottomSheetNames {
  MapStationSearch,
  MapStationDetails,
  MapStationRouting,
}

export const MAP_BOTTOMSHEET_CONFIG = {
  [MapBottomSheetNames.MapStationSearch]: {
    snapPoints: ['20%', '50%'],
    dynamic: false,
  },
  [MapBottomSheetNames.MapStationDetails]: {
    snapPoints: [],
    dynamic: true,
  },
  [MapBottomSheetNames.MapStationRouting]: {
    snapPoints: [],
    dynamic: true,
  },
};
