const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Query the database for the latest status data
  res.json({ moistureLevel: 50, pumpStatus: 'off' }); // Placeholder data
});

module.exports = router;
