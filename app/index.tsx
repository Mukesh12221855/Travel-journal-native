import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

export default function LandingScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/(tabs)/index.js'); // 👈 route to tabs after animation
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/travel-intro.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width,
    height,
  },
});
