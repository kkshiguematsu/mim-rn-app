import { View } from 'react-native';

const GLOW_COLOR_400 = 'rgb(6, 102, 147)';

export const ArcsBackground = () => {
  return (
    <>
      <View
        className="absolute -right-10 -top-4 h-52 w-52 rounded-full bg-primary-400"
        style={{
          opacity: 0.5,
          shadowColor: GLOW_COLOR_400,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 40,
          elevation: 0,
        }}
      />
    </>
  );
};
