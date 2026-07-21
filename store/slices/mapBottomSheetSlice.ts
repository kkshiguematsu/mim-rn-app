import { MapBottomSheetNames } from '@/types/bottomsheet/map/mapBottomSheetNames';
import MapView from 'react-native-maps';
import { StateCreator } from 'zustand';

export interface MapBottomSheetSlice {
  mapActiveModal: MapBottomSheetNames | null;
  mapModalData: any;

  mapRef: MapView | null;
  searchText: string;
  activeRouting: boolean;

  setMapRef: (ref: MapView | null) => void;
  setSearchText: (text: string) => void;
  setActiveRouting: (active: boolean) => void;

  enableMapModal: (modal: MapBottomSheetNames, data?: any) => void;
  disableMapModal: () => void;
}

export const createMapBottomSheetSlice: StateCreator<MapBottomSheetSlice> = (set) => ({
  searchText: '',
  mapActiveModal: null,
  mapModalData: null,

  mapRef: null,
  activeRouting: false,

  setActiveRouting: (active: boolean) => {
    set({ activeRouting: active });
  },

  setMapRef: (ref: MapView | null) => {
    set({ mapRef: ref });
  },

  setSearchText: (text: string) => {
    set({ searchText: text });
  },

  enableMapModal: (modal: MapBottomSheetNames, data?: any) => {
    set({
      mapActiveModal: modal,
      mapModalData: data || null,
    });
  },

  disableMapModal: () => {
    set({
      searchText: '',
      mapActiveModal: null,
      mapModalData: null,
    });
  },
});
