import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your server IP

const fetchSoilMoisture = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/SoilMoisture`);
    return response.data; // Returns the fetched data
  } catch (error) {
    console.error('Error fetching soil moisture:', error.message);
    throw error; // Let the caller handle the error
  }
};

export default {
  fetchSoilMoisture,
};
