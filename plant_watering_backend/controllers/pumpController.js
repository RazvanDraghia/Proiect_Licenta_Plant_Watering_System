exports.controlPump = (req, res) => {
    const { action } = req.body; // "on" or "off"
    
    // Placeholder for ESP32 integration
    res.status(200).json({ message: `Pump turned ${action}` });
  };
  