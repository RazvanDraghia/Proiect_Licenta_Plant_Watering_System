import React from 'react';
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const SoilMoistureProgress = ({ percentage }) => {
  const getProgressColor = (value) => {
    if (value <= 30) return '#ff4d4d'; // roșu
    if (value <= 60) return '#ffd633'; // galben
    return '#4cd137'; // verde
  };
  const getStatusMessage = (value) => {
    if (value <= 30) return '⚠️ Solul este uscat. Planta are nevoie urgentă de apă!';
    if (value <= 60) return '🌤 Nivel moderat de umiditate. Poți uda planta în curând.';
    return '✅ Solul este bine hidratat. Planta este fericită!';
  };
  return (
    <View style={{ alignItems: 'center', marginVertical: 20, paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Soil Moisture Level</Text>
      <AnimatedCircularProgress
        size={200}
        width={20}
        fill={percentage}
        tintColor={getProgressColor(percentage)}
        backgroundColor="#3d5875"
        rotation={0}
        lineCap="round"
      />
      <Text style={{ fontSize: 16, marginTop: 10 }}>{percentage}%</Text>
      <Text style={{
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
        color: getProgressColor(percentage),
        fontWeight: '500'
      }}>
        {getStatusMessage(percentage)}
      </Text>
    </View>
  );
};
export default SoilMoistureProgress;
