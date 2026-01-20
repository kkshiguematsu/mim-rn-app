// components/shared/backgrounds/CurvedHeaderBackground.tsx

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

interface CurvedHeaderBackgroundProps {
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
  curveIntensity?: number;
  useGradient?: boolean;
}

// ✅ IMPORTANTE: export como named export
export const CurvedHeaderBackground = ({
  height = 300,
  primaryColor = '#0EA5E9',
  secondaryColor = '#0284C7',
  curveIntensity = 0.15,
  useGradient = true,
}: CurvedHeaderBackgroundProps) => {
  const curveHeight = height * curveIntensity;

  return (
    <View style={[styles.container, { height }]}>
      <Svg
        height={height}
        width="100%"
        viewBox={`0 0 375 ${height}`}
        preserveAspectRatio="none"
        style={StyleSheet.absoluteFillObject}
      >
        {useGradient && (
          <Defs>
            <LinearGradient id="headerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
              <Stop offset="100%" stopColor={secondaryColor} stopOpacity="1" />
            </LinearGradient>
          </Defs>
        )}

        <Path
          d={`
            M 0 0
            L 0 ${height - curveHeight}
            Q 187.5 ${height + curveHeight} 375 ${height - curveHeight}
            L 375 0
            Z
          `}
          fill={useGradient ? 'url(#headerGradient)' : primaryColor}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
});
