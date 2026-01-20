import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export const useBottomMenuHeight = () => {
  let height = 0;
  try {
    height = useBottomTabBarHeight();
  } catch {
    height = 0;
  }
  return height;
};
