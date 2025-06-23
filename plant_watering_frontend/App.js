import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert, Button, View, Text, StyleSheet } from 'react-native';
import EntryScreen from './screens/EntryScreen';
import HomeScreen from './screens/HomeScreen';
import { requestUserPermission, setupNotificationListeners, getFCMToken } from './services/notificationHandler';

const Stack = createStackNavigator();

const App = () => {
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    const initializeNotifications = async () => {
      await requestUserPermission();
      const token = await getFCMToken();
      setFcmToken(token); 
      setupNotificationListeners();
    };

    initializeNotifications();
  }, []);

  const showToken = () => {
    if (fcmToken) {
      Alert.alert('Your FCM Token', fcmToken);
    } else {
      Alert.alert('Token not available', 'Please ensure notifications are enabled.');
    }
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Button title="Show FCM Token" onPress={showToken} />
      </View>
      <Stack.Navigator initialRouteName="Entry" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Entry" component={EntryScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      {fcmToken && <Text style={styles.tokenText}>Token: {fcmToken}</Text>}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  tokenText: {
    fontSize: 12,
    color: 'gray',
    margin: 10,
    textAlign: 'center',
  },
});

export default App;
