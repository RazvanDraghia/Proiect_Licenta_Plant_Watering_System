const express = require('express');
const cors = require('cors');
const { database } = require('./config/firebaseConfig');
const { sendNotification } = require('./utils/notificationHandler');
const app = express();
const port = 3000;
app.use(cors());
let latestSoilMoisture = 0;
const soilMoistureRef = database.ref('SoilMoisture');
soilMoistureRef.on('value', (snapshot) => {
  if (snapshot.exists()) {
    latestSoilMoisture = snapshot.val();
    console.log('Updated SoilMoisture:', latestSoilMoisture);

    if (latestSoilMoisture < 30) {
      sendNotification(
        'Low Soil Moisture Alert!',
        `Soil moisture is critically low at ${latestSoilMoisture}%. Please water your plant!`
      )
        .then(() => console.log('Notification sent successfully.'))
        .catch((error) => console.error('Error sending notification:', error));
    }
  } else {
    console.log('No soil moisture data found in Firebase.');
  }
});
app.get('/SoilMoisture', (req, res) => {
  try {
    res.json({ SoilMoisture: latestSoilMoisture });
  } catch (error) {
    console.error('Error fetching soil moisture data:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
