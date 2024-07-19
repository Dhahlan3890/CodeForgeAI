// api.js
import axios from 'axios';

const API_URL = 'http://codeforgeai.onrender.com/api';

export const saveHistory = async (history) => {
  try {
    const formData = new FormData();
    history.forEach((item, index) => {
      formData.append(`history[${index}].result`, item.result);
      if (item.image) {
        formData.append(`history[${index}].image`, item.image);
      }
    });

    const authTokens = localStorage.getItem('authTokens'); 
    const tokens = JSON.parse(authTokens);

        // Access the access token
    const token = tokens.access;

    const response = await axios.post(`${API_URL}/history/`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving history:', error);
  }
};

export const getHistory = async () => {
  try {
    const authTokens = localStorage.getItem('authTokens'); 
    const tokens = JSON.parse(authTokens);

        // Access the access token
    const token = tokens.access;
    const response = await axios.get(`${API_URL}/history/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
  }
};
