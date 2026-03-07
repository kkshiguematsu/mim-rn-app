import { View } from 'react-native';

/**
 * ArcsBackground
 * Decorative circular arcs for hero section background.
 * Parent must have `overflow-hidden` and `relative` (position: relative).
 */
export const ArcsBackground = () => {
  return (
    <>
      {/* Arc 1 — largest, outermost ring */}
      <View
        style={{
          width: 300,
          height: 300,
          top: -160,
          right: -80,
          borderRadius: 150,
          borderWidth: 1,
          //   borderColor: 'bg',
        }}
        className="absolute"
      />

      {/* Arc 2 — mid ring */}
      <View
        style={{
          width: 220,
          height: 220,
          top: -100,
          right: -20,
          borderRadius: 110,
          borderWidth: 1,
          //   borderColor: 'bg',
        }}
        className="absolute"
      />

      {/* Arc 3 — small radial glow (no border, just a soft blob) */}
      <View
        style={{
          width: 80,
          height: 80,
          top: 32,
          right: 24,
          borderRadius: 40,
          //   backgroundColor: 'bg',
          // soft edges via shadow on iOS
          shadowColor: 'rgba(26,122,74,1)',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.15,
          shadowRadius: 24,
        }}
        className="absolute"
      />
    </>
  );
};
