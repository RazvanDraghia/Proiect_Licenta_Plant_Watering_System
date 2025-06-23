import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';
import SoilMoistureProgress from '../../components/SoilMoistureProgress.js';
import WateringButton from '../../components/WateringButton.js';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const backgroundImage = require('../../assets/images/HomeScreen_background.jpg');

const HomeScreen = () => {
  const [moistureLevel, setMoistureLevel] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.152:3000/SoilMoisture');
        setMoistureLevel(response.data.SoilMoisture || 0);
        setError(null);
      } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.error('Error fetching soil moisture:', errorMessage);
        setError('Failed to fetch soil moisture data.');
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.menuButton} onPress={() => console.log('Menu pressed')}>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.appTitle}>Watering Plant</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <SoilMoistureProgress percentage={moistureLevel} />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <WateringButton onWater={() => console.log('Watering plant triggered')} />
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 140,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  menuButton: { width: 40, justifyContent: 'center', alignItems: 'center' },
  placeholder: { width: 30 },
  appTitle: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#000' },
  container: { flex: 0.6, justifyContent: 'space-between', alignItems: 'center', padding:20 },
  progressContainer: { flex: 0.8, justifyContent: 'center', alignItems: 'center' },
  buttonContainer: { marginBottom: 20 },
  errorText: { color: 'red', fontSize: 18 },
});

export default HomeScreen;
