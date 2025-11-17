import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Button, ButtonText } from '@/components/ui/button';

export default function ChargingPage() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <View className="d-flex w-52 gap-2">
        <Button variant="solid" size="xl" action="negative">
          <ButtonText>Click me</ButtonText>
        </Button>
        <Button variant="solid" size="xl" action="primary">
          <ButtonText>Click me</ButtonText>
        </Button>
        <Button variant="solid" size="xl" action="secondary">
          <ButtonText>Click me</ButtonText>
        </Button>
        <Button variant="solid" size="xl" action="positive">
          <ButtonText>Click me</ButtonText>
        </Button>
        <Button variant="solid" size="xl">
          <ButtonText>Click me</ButtonText>
        </Button>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
