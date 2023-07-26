// api/proxy.js
const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // Make a request to the public API
    const response = await axios.get('https://test-services.interact.technology');

    // Forward the response data from the public API to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from the public API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from the API' });
  }
};