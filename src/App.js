import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the proxy server (serverless function)
    axios.get('/api/rest/refdata/countries')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>API Data:</h2>
      <ul>
        {data.map(item => (
          <li key={item.isoCode}>{item.isoCode}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiData