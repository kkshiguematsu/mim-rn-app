import { useAppStore } from '@/store';
import { useShallow } from 'zustand/shallow';

export const useMapBottomSheetStore = () => {
  return useAppStore(
    useShallow((state) => ({
      mapActiveModal: state.mapActiveModal,
      mapModalData: state.mapModalData,
      mapRef: state.mapRef,
      searchText: state.searchText,
      activeRouting: state.activeRouting,
      setMapRef: state.setMapRef,
      setSearchText: state.setSearchText,
      setActiveRouting: state.setActiveRouting,
      enableMapModal: state.enableMapModal,
      disableMapModal: state.disableMapModal,
    }))
  );
};
