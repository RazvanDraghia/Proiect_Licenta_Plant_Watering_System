import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
const EntryScreen = () => {
  const router = useRouter();
  useEffect(() => {
    // Navigates to the Home screen after 5 seconds
    const timer = setTimeout(() => {
      router.push('/home');
    }, 4000);
    return () => clearTimeout(timer); // Clear timer
  }, [router]);
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/plant-animation.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  animation: {
    width: 300,
    height: 300,
  },
});
export default EntryScreen;