import { View } from 'react-native';

const CELL_SIZE = 24;

interface GridTextureProps {
  width: number;
  height: number;
}

export const GridTexture = ({ width, height }: GridTextureProps) => {
  const cols = Math.ceil(width / CELL_SIZE);
  const rows = Math.ceil(height / CELL_SIZE);

  return (
    <View style={{ position: 'absolute', inset: 0 }} pointerEvents="none">
      {Array.from({ length: rows }).map((_, i) => (
        <View
          key={`h-${i}`}
          style={{
            position: 'absolute',
            top: i * CELL_SIZE,
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: 'rgba(255,255,255,0.05)',
          }}
        />
      ))}

      {Array.from({ length: cols }).map((_, i) => (
        <View
          key={`v-${i}`}
          style={{
            position: 'absolute',
            left: i * CELL_SIZE,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: 'rgba(255,255,255,0.03)',
          }}
        />
      ))}
    </View>
  );
};
