const { admin } = require('../config/firebaseConfig');

/**
 * @param {string} title
 * @param {string} body
 * @param {string} [topic]
 * @param {string} [token]
 */
const sendNotification = async (title, body, topic = 'SoilMoistureAlerts', token = null) => {
  try {
    const message = {
      notification: {
        title,
        body,
      },
      ...(token ? { token } : { topic }),
    };

    const response = await admin.messaging().send(message);
    console.log('[NotificationHandler] Notification sent successfully:', response);
  } catch (error) {
    console.error('[NotificationHandler] Error sending notification:', error);
  }
};

module.exports = { sendNotification };
