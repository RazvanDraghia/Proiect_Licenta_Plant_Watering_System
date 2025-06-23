const SensorData = require('../models/sensorData');

exports.receiveData = (req, res) => {
  const { moistureLevel, timestamp } = req.body;
  const newData = new SensorData({ moistureLevel, timestamp });
  
  newData.save()
    .then(() => res.status(200).json({ message: 'Data saved successfully' }))
    .catch((error) => res.status(500).json({ error: 'Failed to save data' }));
};
