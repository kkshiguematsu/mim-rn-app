import { Platform } from 'react-native';

export const usePlatform = () => {
  let isAndroid = false;
  let isIos = true;

  if (Platform.OS === 'ios') {
    isAndroid = false;
    isIos = true;
  } else if (Platform.OS === 'android') {
    isAndroid = true;
    isIos = false;
  }

  return {
    isAndroid,
    isIos,
  };
};
