import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

export const getFCMToken = async () => {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
  return token;
};

export const setupNotificationListeners = () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('Notification caused app to open:', remoteMessage.notification);
  });

  messaging().onMessage(async (remoteMessage) => {
    console.log('New notification:', remoteMessage.notification);
  });

  messaging().getInitialNotification().then((remoteMessage) => {
    if (remoteMessage) {
      console.log('Notification caused app to open from quit state:', remoteMessage.notification);
    }
  });
};
